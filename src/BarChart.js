import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register all necessary components
Chart.register(...registerables);

const TransactionsBarChart = ({ selectedMonth }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    const fetchChartData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/bar-chart?month=${selectedMonth}`);
            const data = await response.json();
            console.log("Bar Chart Data:", data); // Log the data for debugging

            // Check if priceRanges exist in the data
            if (data.priceRanges) {
                const labels = Object.keys(data.priceRanges);
                const values = Object.values(data.priceRanges);

                setChartData({
                    labels: labels,
                    datasets: [{
                        label: 'Number of Items',
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    }],
                });
            } else {
                console.error('No price ranges found in the response');
                setChartData({
                    labels: [],
                    datasets: [],
                });
            }
        } catch (error) {
            console.error('Error fetching bar chart data:', error);
        }
    };

    useEffect(() => {
        fetchChartData();
    }, [selectedMonth]);

    return (
        <div className="bar-chart">
        <h2 className="chart-title">Transactions Bar Chart for Month: {selectedMonth}</h2>
        <Bar data={chartData} options={{
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        }} />
        </div>
    );
};

export default TransactionsBarChart;
