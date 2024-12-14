import './dashboardLayout.css';

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CircleGauge, Clapperboard, BookOpenText,CircleArrowLeft, CircleArrowRight } from 'lucide-react';

interface DashboardLayoutProps {
    children: React.ReactElement;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div className={`dashboard-layout ${sidebarOpen? "" : "sidebar-closed"}`}>
            {/* Sidebar Menu */}
            <nav className="sidebar">
                <ul>
                    <li><NavLink
                        onClick={closeSidebar}
                        className={({ isActive }) => isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"}
                        to="/dashboard">
                        <CircleGauge /> <span>Dashboard</span>
                    </NavLink></li>
                    <li><NavLink
                        onClick={closeSidebar}
                        className={({ isActive }) => isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"}
                        to="/movies">
                        <Clapperboard /> <span>Movies</span>
                    </NavLink></li>
                    <li><NavLink
                        onClick={closeSidebar}
                        className={({ isActive }) => isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"}
                        to="/bookings">
                        <BookOpenText /> <span>My Bookings</span>
                    </NavLink></li>
                </ul>
                <span className='sidebar-toggle' onClick={toggleSidebar}>
                    {sidebarOpen? <CircleArrowLeft /> : <CircleArrowRight />}
                </span>
            </nav>

            {/* Page Content */}
            <main className="page-content">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
