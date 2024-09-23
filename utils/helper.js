export const convertToUnixTimestamp = (date) => {
    return Math.floor(new Date(date).getTime() / 1000)
}

// export const yahooFinanceURL=(baseCurrency,targetCurrency,fromDate,toDate)=>{
//     const quote=`${baseCurrency}${targetCurrency}=X`;
//     const encodedQuote=encodeURIComponent(quote)
//     return `https://finance.yahoo.com/quote/${encodedQuote}/history/?period1=${fromDate}&period2=${toDate}`
// }



