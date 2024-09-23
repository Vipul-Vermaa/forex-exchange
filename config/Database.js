import sqlite3 from 'sqlite3';

export const connectDB = async () => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('./forex.db', async (err) => {
            if (err) {
                console.error('Error connecting to the database:', err);
                reject(err)
            } else {
                console.log('Connected to database');
                resolve(db)
            }
        });
    })
};


