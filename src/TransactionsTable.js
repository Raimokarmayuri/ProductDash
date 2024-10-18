import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionsStatistics from './Dashboard'; // Ensure this path is correct
import TransactionsBarChart from './BarChart'; // Ensure this path is correct
import './style.css';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [month, setMonth] = useState(2); // March is the default (index 2)
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [perPage] = useState(10);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products', {
                params: {
                    month: month + 1, // Adjust month for 1-based index
                    search,
                    page: currentPage,
                    perPage,
                },
            });
            setTransactions(response.data.data);
            setTotalRecords(response.data.totalRecords);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [month, search, currentPage]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handleMonthChange = (e) => {
        setMonth(Number(e.target.value)); // Set the selected month
        setCurrentPage(1); // Reset to first page on month change
    };

    const handleNextPage = () => {
        if ((currentPage * perPage) < totalRecords) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <h1>Transactions</h1>
            <div>
                <label htmlFor="month-select">Month:</label>
                <select id="month-select" value={month} onChange={handleMonthChange}>
                    {monthNames.map((name, index) => (
                        <option key={index} value={index}>{name}</option>
                    ))}
                </select>

                <label htmlFor="search-box">Search:</label>
                <input
                    id="search-box"
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search by title, description or price"
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Date of Sale</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.price}</td>
                            <td>{transaction.dateOfSale}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={handleNextPage} disabled={(currentPage * perPage) >= totalRecords}>Next</button>
            </div>

            {/* Transaction Statistics Component */}
            <TransactionsStatistics month={month + 1} /> {/* Pass month as 1-based index */}

            {/* Transactions Bar Chart Component */}
            <TransactionsBarChart selectedMonth={month + 1} /> {/* Pass month as 1-based index */}
        </div>
    );
};

export default Transactions;
