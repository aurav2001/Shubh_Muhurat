import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import dotenv from 'dotenv';

// Load env vars if needed
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');
const PORT = 4173; // Default Vite preview port
const BASE_URL = `http://localhost:${PORT}`;

// Helper to start the server
const startServer = () => {
    return new Promise((resolve, reject) => {
        const server = spawn('npm', ['run', 'preview', '--', '--port', PORT], {
            stdio: 'pipe',
            shell: true
        });

        server.stderr.on('data', (data) => {
            console.error(`Server Error: ${data}`);
        });

        server.stdout.on('data', (data) => {
            console.log(`Server Output: ${data}`);
            if (data.toString().includes('Local:') || data.toString().includes('localhost')) {
                resolve(server);
            }
        });

        server.on('error', (err) => {
            reject(err);
        });
    });
};

const parseSitemap = () => {
    if (!fs.existsSync(SITEMAP_PATH)) {
        throw new Error(`Sitemap not found at ${SITEMAP_PATH}`);
    }
    const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8');
    const matches = xml.match(/<loc>(.*?)<\/loc>/g);
    if (!matches) return [];

    return matches.map(tag => {
        const url = tag.replace(/<\/?loc>/g, '');
        // Convert absolute URL to relative path
        // e.g., https://www.shubhmhurat.com/about -> /about
        try {
            const urlObj = new URL(url);
            return urlObj.pathname;
        } catch (e) {
            console.warn(`Skipping invalid URL in sitemap: ${url}`);
            return null;
        }
    }).filter(Boolean);
};

const prerender = async () => {
    console.log('🚀 Starting Pre-rendering...');

    let server;
    let browser;

    try {
        console.log('Starting local server...');
        server = await startServer();
        console.log('Server started!');

        console.log('Launching Puppeteer...');
        const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
        const launchOptions = {
            headless: "new"
        };
        if (fs.existsSync(chromePath)) {
            launchOptions.executablePath = chromePath;
            console.log(`Using system Chrome at: ${chromePath}`);
        } else {
            console.log('Using default Puppeteer Chrome');
        }
        browser = await puppeteer.launch(launchOptions);
        const page = await browser.newPage();

        const routes = parseSitemap();
        console.log(`Found ${routes.length} routes to pre-render.`);

        for (const route of routes) {
            const url = `${BASE_URL}${route}`;
            // Handle file path:
            // / -> dist/index.html (already exists, but we might want to overwrite or skip)
            // /about -> dist/about/index.html

            const relativePath = route === '/' ? 'index.html' : `${route.substring(1)}/index.html`;
            const outPath = path.join(DIST_DIR, relativePath);
            const outDir = path.dirname(outPath);

            if (!fs.existsSync(outDir)) {
                fs.mkdirSync(outDir, { recursive: true });
            }

            console.log(`Pre-rendering: ${route}...`);
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

            const html = await page.content();
            fs.writeFileSync(outPath, html);
            console.log(`✅ Saved to ${relativePath}`);
        }

        console.log('🎉 Pre-rendering complete!');

    } catch (error) {
        console.error('❌ Error during pre-rendering:', error);
        process.exit(1);
    } finally {
        if (browser) await browser.close();
        if (server) {
            // Windows kill might need taskkill
            if (process.platform === 'win32') {
                spawn('taskkill', ['/pid', server.pid, '/f', '/t']);
            } else {
                server.kill();
            }
        }
    }
};

prerender();
