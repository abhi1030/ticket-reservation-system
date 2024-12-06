import './dashboardLayout.css';

import { NavLink } from 'react-router-dom';

interface DashboardLayoutProps {
    children: React.ReactElement;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({children}) => {
    return (
        <div className="dashboard-layout">
            {/* Sidebar Menu */}
            <nav className="sidebar"><ul>
                <li><NavLink
                    className={({ isActive }) => isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"}
                    to="/dashboard">
                    Home
                </NavLink></li>
                <li><NavLink
                    className={({ isActive }) => isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"}
                    to="/movies">
                    Movies
                </NavLink></li>
                <li><NavLink
                    className={({ isActive }) => isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"}
                    to="/tickets">
                    Tickets
                </NavLink></li>
            </ul></nav>

            {/* Page Content */}
            <main className="page-content">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
