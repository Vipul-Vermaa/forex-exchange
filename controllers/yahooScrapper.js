import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from "../utils/errorHandler.js";
import puppeteer from 'puppeteer';
import { convertToUnixTimestamp } from '../utils/helper.js';
import { insertData } from '../database/scrapperDatabase.js';
import { calculateDateRange } from '../utils/dataRange.js';
import { connectDB } from '../config/Database.js';


export const forexScrapper = catchAsyncError(async (req, res, next) => {
    const { baseCurrency, targetCurrency, fromDate, toDate } = req.body;

    if (!baseCurrency || !targetCurrency || !fromDate || !toDate) {
        return next(new ErrorHandler('Enter all fields', 400))
    }

    const fromUnix = convertToUnixTimestamp(fromDate);
    const toUnix = convertToUnixTimestamp(toDate);

    const quote = `${baseCurrency}${targetCurrency}=X`;
    const encodedQuote = encodeURIComponent(quote);
    const url = `https://finance.yahoo.com/quote/${encodedQuote}/history/?period1=${fromUnix}&period2=${toUnix}`;

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        const historicalData = await page.evaluate(() => {
            const rows = document.querySelectorAll('table tbody tr');
            const result = [];
            rows.forEach(row => {
                const columns = row.querySelectorAll('td');
                if (columns.length > 0) {
                    const date = columns[0].innerText;
                    const open = columns[1].innerText;
                    const high = columns[2].innerText;
                    const low = columns[3].innerText;
                    const close = columns[4].innerText;
                    const adjClose = columns[5].innerText;
                    const volume = columns[6].innerText;
                    result.push({ date, open, high, low, close, adjClose, volume });
                }
            });
            return result;
        })
        await browser.close()
        await insertData(historicalData);
        res.status(200).json({ message: 'Data scraped and inserted successfully' });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error', error
        });
    };
});


export const getForexData = catchAsyncError(async (req, res, next) => {
    const { from, to, period } = req.body;
    if (!from || !to || !period) return next(new ErrorHandler('Enter all fields', 400))

    try {
        const { fromDate, toDate } = calculateDateRange(period);

        const fromUnix = convertToUnixTimestamp(fromDate);
        const toUnix = convertToUnixTimestamp(toDate);

        const db = connectDB();
        db.all(
            `SELECT * FROM exchange_data WHERE fromCurrency = ? AND toCurrency = ? AND date BETWEEN ? AND ?`,
            [from, to, fromUnix, toUnix],
            (err, rows) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Error retrieving data', err
                    });
                }
                if (rows.length === 0) {
                    return res.status(404).json({
                        message: 'No data found for the given period'
                    });
                }
                return res.status(200).json({
                    message: 'Forex data retrieved', data: rows
                });
            }
        );
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});