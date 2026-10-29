const { execSync } = require('child_process');
const fs = require('fs');
const dotenv = require('dotenv');

const envConfig = dotenv.parse(fs.readFileSync('.env'));

console.log('Uploading environment variables to Vercel (Production Only)...');

for (const k in envConfig) {
    if (k === 'PORT') continue;

    const v = envConfig[k];
    console.log(`Setting ${k}...`);

    try {
        execSync(`npx vercel env rm ${k} production -y`, { stdio: 'ignore' });
    } catch (e) { }

    try {
        // Run specifically for production environment
        execSync(`npx vercel env add ${k} production`, { input: v, stdio: ['pipe', 'inherit', 'inherit'] });
        console.log(`✅ Successfully added ${k}`);
    } catch (e) {
        console.error(`❌ Failed to upload ${k}:`, e.message);
    }
}
try {
    console.log('Finished uploading environment variables. Triggering production deploy...');
    execSync('npx vercel --prod --yes', { stdio: 'inherit' });
} catch (e) {
    console.error('Redeploy failed', e);
}
