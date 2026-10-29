const { execSync } = require('child_process');
const fs = require('fs');
const dotenv = require('dotenv');

const envConfig = dotenv.parse(fs.readFileSync('.env'));

console.log('Uploading environment variables to Vercel...');

for (const k in envConfig) {
    // Skip PORT as Vercel handles it automatically
    if (k === 'PORT') continue;

    const v = envConfig[k];
    console.log(`Setting ${k}...`);

    // First attempt to remove it in case it already exists
    try {
        execSync(`npx vercel env rm ${k} production preview development -y`, { stdio: 'ignore' });
    } catch (e) {
        // Ignore errors if it didn't exist
    }

    // Now add it, piping the value exactly without newlines
    try {
        execSync(`npx vercel env add ${k} production preview development`, { input: v, stdio: ['pipe', 'inherit', 'inherit'] });
        console.log(`✅ Successfully added ${k}`);
    } catch (e) {
        console.error(`❌ Failed to upload ${k}:`, e.message);
    }
}
console.log('Finished uploading environment variables. Running a new deployment...');
try {
    execSync('npx vercel --prod --yes', { stdio: 'inherit' });
} catch (e) {
    console.error('Failed to trigger redeploy:', e.message);
}
