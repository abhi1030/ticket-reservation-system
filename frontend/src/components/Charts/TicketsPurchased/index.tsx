import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);


interface TicketsPurchasedProps {
    data: {
        date: string;
        tickets: number;
    }[];
}

const TicketsPurchased: React.FC<TicketsPurchasedProps> = ({ data }) => {
    // Prepare the data for the chart
    const chartData = {
        labels: data.map((item) => item.date), // X-axis: Date
        datasets: [
            {
                label: 'Tickets Purchased',
                data: data.map((item) => item.tickets),
                backgroundColor: 'rgba(75, 192, 192, 0.5)', // Bar color
                borderColor: 'rgba(75, 192, 192, 1)', // Bar border color
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const chartOptions = {
        responsive: true,
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
                    text: 'Tickets Purchased',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="chart-container">
            <div className="chart-title">Tickets Sold per day</div>
            <div className="chart">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default TicketsPurchased;
