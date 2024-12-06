import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PurchaseTicket from './pages/PurchaseTicket';
import PublicRoute from './components/PublicRoute';
import { useLoading } from './context/PageLoadingContext';
import PageLoader from './components/loaders/PageLoader';
import DashboardLayout from './components/Layouts/DashboardLayout';
import Movies from './pages/Movies';
import EditMovie from './pages/EditMovie';
import CreateMovie from './pages/CreateMovie';
import Tickets from './pages/Tickets';

const AppRoutes = () => {
    const { loading } = useLoading();

    return (
        <>
            {loading && <PageLoader />}
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />

                    {/* Public Routes */}
                    <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
                    <Route path="/" element={<PublicRoute><Signup /></PublicRoute>} />
                    
                    {/* Protected Routes with Dashboard Layout */}
                    <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
                    <Route path="/movies" element={<ProtectedRoute><DashboardLayout><Movies /></DashboardLayout></ProtectedRoute>} />
                    <Route path="/movies/create" element={<ProtectedRoute><DashboardLayout><CreateMovie /></DashboardLayout></ProtectedRoute>} />
                    <Route path="/movies/:movieId" element={<ProtectedRoute><DashboardLayout><EditMovie /></DashboardLayout></ProtectedRoute>} />
                    <Route path="/tickets" element={<ProtectedRoute><DashboardLayout><Tickets /></DashboardLayout></ProtectedRoute>} />
                    <Route path="/purchase-ticket" element={<ProtectedRoute><DashboardLayout><PurchaseTicket /></DashboardLayout></ProtectedRoute>} />
                </Routes>
            </Router>
        </>
    );
};

export default AppRoutes;
