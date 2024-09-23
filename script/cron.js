import cron from 'node-cron';
import { forexScrapper } from '../controllers/yahooScrapper.js'


const pairs = [
    { base: 'GBP', target: 'INR' },
    { base: 'AED', target: 'INR' }
];

const periods = [
    { period: '1W', fromDate: Date.now() - (7 * 24 * 60 * 60 * 1000), toDate: Date.now() },
    { period: '1M', fromDate: Date.now() - (30 * 24 * 60 * 60 * 1000), toDate: Date.now() },
    { period: '3M', fromDate: Date.now() - (3 * 30 * 24 * 60 * 60 * 1000), toDate: Date.now() },
    { period: '6M', fromDate: Date.now() - (6 * 30 * 24 * 60 * 60 * 1000), toDate: Date.now() },
    { period: '1Y', fromDate: Date.now() - (365 * 24 * 60 * 60 * 1000), toDate: Date.now() }
];

const scrapeDataForPairs = async () => {
    for (const pair of pairs) {
        for (const period of periods) {
            try {
                console.log(`Scraping data for ${pair.base}-${pair.target} for period: ${period.period}`);
                await forexScrapper(pair.base, pair.target, period.fromDate, period.toDate);
            } catch (error) {
                console.error(`Failed to scrape data for ${pair.base}-${pair.target}:`, error);
            }
        }
    }
};

export const scheduleForexScraping = () => {
    // Run the scraper every hour
    cron.schedule('0 * * * *', async () => {
        console.log("Starting hourly scheduled data scraping...");
        await scrapeDataForPairs();
    });

    // Run the scraper at midnight on the first day of every week (Sunday)
    cron.schedule('0 0 * * 0', async () => {
        console.log("Starting weekly scheduled data scraping...");
        await scrapeDataForPairs();
    });
};

