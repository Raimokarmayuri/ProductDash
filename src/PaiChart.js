// PieChart.js
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const PieChart = ({ month }) => {
  const [pieData, setPieData] = useState({});
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pie-chart', {
          params: { month }
        });
        console.log(response)
        const labels = response.data.map((category) => category.name);
        const data = response.data.map((category) => category.count);

        setPieData({
          labels,
          datasets: [
            {
              data,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching pie chart data', error);
      }
    };

    fetchPieChartData();
  }, [month]);

  return <Pie data={pieData} />;
};

export default PieChart;
