import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


interface RevenueGeneratedProps {
    data: {
        date: string;
        revenue: number;
    }[];
}

const RevenueGenerated: React.FC<RevenueGeneratedProps> = ({ data }) => {
    // Prepare the data for the chart
    const chartData = {
        labels: data.map((item) => item.date), // X-axis: Date
        datasets: [
            {
                label: 'Revenue Generated', // Line label
                data: data.map((item) => item.revenue), // Y-axis: Tickets count
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.4,
            },
        ],
    };

    // Chart options
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
            },
            legend: {
                display: false,
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Revenue',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="chart-container">
            <div className="chart-title">Revenue per day</div>
            <div className="chart">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default RevenueGenerated;
