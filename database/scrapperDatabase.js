import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import { connectDB } from '../config/Database.js';

export const createDatabase = catchAsyncError(async (req, res, next) => {
  const db = await connectDB();

  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS exchange_data (
        date TEXT,
        open REAL,
        high REAL,
        low REAL,
        close REAL,
        volume INTEGER
      );
    `, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
        return
      }
      console.log('Table created successfully');
    });
  });
  db.close();
});


export const insertData = catchAsyncError(async (historicalData) => {
  const db = await connectDB();

  db.serialize(() => {
    db.run("BEGIN TRANSACTION");
    const query = db.prepare(`
        INSERT INTO exchange_data (date, open, high, low, close, volume)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

    historicalData.forEach((data) => {
      query.run(
        data.date,
        data.open,
        data.high,
        data.low,
        data.close,
        data.volume,
        (err) => {
          if (err) {
            console.error('Error inserting data:', err.message);
            db.run('ROLLBACK');
            return false;
          }
        }
      );
    });

    query.finalize((err) => {
      if (err) {
        console.error('Error finalizing insert:', err.message);
        db.run('ROLLBACK');
        return false;
      }

      db.run('COMMIT');
      console.log('Data inserted successfully');
    });

    db.close();
  });
});