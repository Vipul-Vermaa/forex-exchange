import express from 'express';
import { forexScrapper, getForexData } from '../controllers/yahooScrapper.js';

const router = express.Router();

router.route('/forex').post(forexScrapper);
router.route('/forex-data').post(getForexData);

/**
 * @swagger
 * /api/forex-data:
 *   post:
 *     summary: Query forex data
 *     description: Get historical forex data based on the given query parameters.
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *         required: true
 *         description: From currency code (e.g., GBP, AED)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *         required: true
 *         description: To currency code (e.g., INR)
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *         required: true
 *         description: Time period for the forex data (e.g., 1M, 3M)
 *     responses:
 *       200:
 *         description: Forex data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                   open:
 *                     type: string
 *                   high:
 *                     type: string
 *                   low:
 *                     type: string
 *                   close:
 *                     type: string
 *                   adjClose:
 *                     type: string
 *                   volume:
 *                     type: string
 *       500:
 *         description: Internal Server Error
 */
export default router;