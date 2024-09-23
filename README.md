# Forex Data Scraper and API

This project scrapes historical exchange data from Yahoo Finance and stores it in an SQLite in-memory database. The data can then be queried using RESTful API endpoints. The project also includes a CRON job to periodically sync the data with the Yahoo Finance website.

## Features
- Scrape historical forex data from Yahoo Finance.
- Store forex data in an in-memory SQLite database.
- Query forex data using REST APIs.
- Automated CRON job to keep the forex data up-to-date.
- Swagger documentation for easy API reference.

## Technologies Used
- **Node.js**
- **Express.js**
- **SQLite** (in-memory database)
- **Puppeteer** (for web scraping)
- **node-cron** (for scheduling the scraping job)
- **Swagger** (for API documentation)

## Prerequisites
Make sure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Vipul-Vermaa/forex-data-scraper-api.git
cd backend
```
### 2. Install Dependencies
Install all the project dependencies using npm:
```bash
npm install
```

### 3. Configure the Environment Variables
You may need to create a .env file to store environment-specific variables like port, scraping intervals, etc. Example:
```bash
PORT=your_port
```
### 4. Run the Application
To start the application locally, run the following command:
```bash
npm start
```
The application will start on your localhost

### 5. Access API Documentation
Swagger documentation is available at:
```bash
http://your_localhost/api-docs
```

## CRON Job
The application has a CRON job set up to automatically scrape and update forex data periodically. It scrapes data for the following currency pairs and periods:
- GBP - INR (1W, 1M, 3M, 6M, 1Y)
- INR (1W, 1M, 3M, 6M, 1Y)

## Development
### Running in Development Mode
To run the application in development mode with live reloading (using nodemon):
```bash
npm run dev
```