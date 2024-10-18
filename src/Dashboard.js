import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionsStatistics = ({ month }) => {
    const [statistics, setStatistics] = useState({
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0,
    });

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const fetchStatistics = async (selectedMonth) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/statistics?month=${selectedMonth}`);
            console.log("Statistics Response:", response.data); // Log the response data
            setStatistics(response.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };
    
    useEffect(() => {
        fetchStatistics(month); // Fetch statistics using the selected month
    }, [month]);

    return (
        <div>
            <h1>Transactions Statistics</h1>
            <div className="statistics-box">
                <h2>Statistics for {monthNames[month - 1]}</h2>
                <p>Total Sale Amount: ${statistics.totalSaleAmount.toFixed(2)}</p>
                <p>Total Sold Items: {statistics.totalSoldItems}</p>
                <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
            </div>
            
        </div>
    );
};

export default TransactionsStatistics;
