import './performance.css';

import { useState, useEffect } from 'react';
import RevenueGenerated from "../RevenueGenerated";
import TicketsPurchased from "../TicketsPurchased";
import { getPerformanceData, SalesPerformance } from "../../../hooks/booking";
import LoadingSpinner from '../../loaders/LoadingSpinner';

const Performance = () => {
    const [performanceData, setPerformanceData] = useState<SalesPerformance>();

    useEffect(() => {
        getPerformanceData()
            .then(data => {
                setPerformanceData(data);
            })
    }, []);
    return (
        <div className="performance-container">
            <div className="performance-header">Sales Performance</div>
            <div className="performance-stat-container">
                <div className="performance-stat">
                    <div className="performance-stat-title">Total Tickets Sold</div>
                    <div className="performance-stat-ticket">
                        {performanceData ? performanceData.total_tickets : <LoadingSpinner />}
                    </div>
                </div>
                <div className="performance-stat">
                    <div className="performance-stat-title">Total Revenue</div>
                    <div className="performance-stat-revenue">
                        {performanceData ? performanceData.total_revenue : <LoadingSpinner />}
                    </div>
                </div>
                <div className="performance-stat">
                    <div className="performance-stat-title">Total Tickets Sold This Week</div>
                    <div className="performance-stat-ticket">
                        {performanceData ? performanceData.tickets_this_week : <LoadingSpinner />}
                    </div>
                </div>
                <div className="performance-stat">
                    <div className="performance-stat-title">Total Revenue This Week</div>
                    <div className="performance-stat-revenue">
                        {performanceData ? performanceData.revenue_this_week : <LoadingSpinner />}
                    </div>
                </div>
            </div>
            <div className="chart-group">
                {performanceData ? (
                    <>
                        <TicketsPurchased data={performanceData.tickets_last_7days} />
                        <RevenueGenerated data={performanceData.revenue_last_7days} />
                    </>
                ) : <>
                    <div className="chart-loader"><LoadingSpinner /></div>
                    <div className="chart-loader"><LoadingSpinner /></div>
                </>}
            </div>
        </div>
    )
};

export default Performance;