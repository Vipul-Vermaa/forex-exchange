export const calculateDateRange = (period) => {
    const today = new Date();
    let fromDate = new Date();

    // Check the period and adjust the fromDate accordingly
    if (period === '1M') {
        fromDate.setMonth(today.getMonth() - 1); // Subtract 1 month
    } else if (period === '3M') {
        fromDate.setMonth(today.getMonth() - 3); // Subtract 3 months
    } else if (period === '6M') {
        fromDate.setMonth(today.getMonth() - 6); // Subtract 6 months
    } else if (period === '1Y') {
        fromDate.setFullYear(today.getFullYear() - 1); // Subtract 1 year
    } else {
        throw new Error("Invalid period. Supported values: '1M', '3M', '6M', '1Y'.");
    }

    return { fromDate, toDate: today };
};
