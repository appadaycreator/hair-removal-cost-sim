import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:8000/', { waitUntil: 'networkidle' });
await page.goto('http://localhost:8000/hair-removal-cost-sim/', { waitUntil: 'networkidle' });

// Wait for main content to load
await page.waitForTimeout(1000);

// Take screenshot of initial page
await page.screenshot({ path: '/tmp/hair-removal-1-initial.png', fullPage: true });

// Simulate scroll through page
await page.evaluate(() => window.scrollBy(0, 500));
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/hair-removal-2-scrolled.png', fullPage: true });

// Get page content for analysis
const pageContent = await page.content();

// Check for main UI elements
const partButtons = await page.locator('[class*="part-btn"]').count();
const resultSection = await page.locator('[id*="result"]').count();
const inputFields = await page.locator('input, select').count();

await browser.close();
