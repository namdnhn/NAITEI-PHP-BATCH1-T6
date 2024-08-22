import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import Axios from '../../../constants/Axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get('/statistics', {
                    params: {
                        start_date: '2024-01-01', 
                        end_date: '2024-12-31'  
                    }
                });
                const data = response.data;

                setChartData({
                    labels: data.labels, // Dates
                    datasets: [
                        {
                            label: 'Sales',
                            data: data.sales, // Sales data
                            backgroundColor: 'rgba(75,192,192,0.6)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Orders',
                            data: data.orders, // Orders data
                            backgroundColor: 'rgba(153,102,255,0.6)',
                            borderColor: 'rgba(153,102,255,1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Users',
                            data: data.users, // Users data
                            backgroundColor: 'rgba(255,159,64,0.6)',
                            borderColor: 'rgba(255,159,64,1)',
                            borderWidth: 1,
                        }
                    ],
                });
            } catch (error) {
                console.error('Error fetching chart data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-20 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Sales, Orders, and Users Chart</h2>
            <div className="relative">
                {chartData.labels ? (
                    <Line
                        data={chartData}
                        className="w-full h-full"
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        color: 'rgb(75, 85, 99)', 
                                    },
                                },
                            },
                        }}
                    />
                ) : (
                    <p className="text-gray-500">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Chart;
