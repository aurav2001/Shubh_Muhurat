import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// --- CONFIGURATION ---
const SITE_URL = process.env.VITE_SITE_URL || 'https://www.shubhmhurat.com';
const API_URL = process.env.VITE_API_URL || 'https://api.shubhmuhurat.biz/api';

if (!process.env.VITE_SITE_URL) {
  console.warn('⚠️  Warning: VITE_SITE_URL is not defined in .env. Using default:', SITE_URL);
}

const OUT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'public');
const SITEMAP_PATH = path.join(OUT_DIR, 'sitemap.xml');

// Static Routes from App.jsx
const STATIC_ROUTES = [
  '/',
  '/about',
  '/membership',
  '/success-stories',
  '/blogs',
  '/contact',
  '/login',
  '/register'
];

// Helper to wrap XML
const generateXml = (urls) => {
  const urlTags = urls.map(url => `
  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlTags}
</urlset>`;
};

const generateSitemap = async () => {
  console.log('🚀 Starting Sitemap Generation...');
  console.log(`Using Site URL: ${SITE_URL}`);
  console.log(`Using API URL: ${API_URL}`);

  const urls = [...STATIC_ROUTES.map(route => `${SITE_URL}${route}`)];

  try {
    // 1. Fetch Blogs
    console.log('Fetching Blogs...');
    const blogsRes = await axios.get(`${API_URL}/blogs`);
    const blogs = Array.isArray(blogsRes.data) ? blogsRes.data : [];

    blogs.forEach(blog => {
      if (blog.id || blog._id) {
        urls.push(`${SITE_URL}/blogs/${blog.id || blog._id}`);
      }
    });
    console.log(`✅ Added ${blogs.length} Blog pages.`);

    // 2. Fetch Communities
    console.log('Fetching Communities...');
    const communitiesRes = await axios.get(`${API_URL}/communities`);
    const communities = Array.isArray(communitiesRes.data) ? communitiesRes.data : [];

    communities.forEach(community => {
      if (community.name) {
        // Assuming the route is /community/:name and name is URL-safe or needs encoding
        urls.push(`${SITE_URL}/community/${encodeURIComponent(community.name)}`);
      }
    });
    console.log(`✅ Added ${communities.length} Community pages.`);

    // 3. Generate XML
    const sitemapXml = generateXml(urls);

    // 4. Write to file
    fs.writeFileSync(SITEMAP_PATH, sitemapXml);
    console.log(`🎉 Sitemap generated successfully at: ${SITEMAP_PATH}`);
    console.log(`Total URLs: ${urls.length}`);

  } catch (error) {
    console.warn('⚠️  Warning: Could not fetch dynamic content for sitemap (Backend might be down). Generating static sitemap only.');
    console.error('Error details:', error.message);

    // Fallback: Generate sitemap with just static routes
    const sitemapXml = generateXml(urls);
    fs.writeFileSync(SITEMAP_PATH, sitemapXml);
    console.log(`🎉 Static Sitemap generated successfully at: ${SITEMAP_PATH}`);

    // Do NOT exit with error, allow build to continue
    process.exit(0);
  }
};

generateSitemap();
