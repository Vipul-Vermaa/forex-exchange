import app from "./app.js";
import { connectDB } from './config/Database.js';
import { createDatabase } from "./database/scrapperDatabase.js";

connectDB()
createDatabase()

app.listen(process.env.PORT, () => {
    console.log(`server is working on port ${process.env.PORT} `)
});