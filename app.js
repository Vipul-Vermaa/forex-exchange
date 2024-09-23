import express from 'express';
import { config } from 'dotenv';
import ErrorMiddleware from './middlewares/Error.js';
import bodyParser from 'body-parser';
import { scheduleForexScraping } from './script/cron.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from "./utils/swagger.js";

config({
  path: '../backend/config.env'
});

const app = express();
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

scheduleForexScraping();

import forex from './routes/forexRoutes.js';

app.use('/api/v1', forex);

export default app;

app.get("/", (req, res) =>
  res.send(
    `<h1> click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  )
);

app.use(ErrorMiddleware)
