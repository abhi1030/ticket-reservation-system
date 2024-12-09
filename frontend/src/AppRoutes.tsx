import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import BookTicket from './pages/BookTicket';
import PublicRoute from './components/PublicRoute';
import { useLoading } from './context/PageLoadingContext';
import PageLoader from './components/loaders/PageLoader';
import DashboardLayout from './components/Layouts/DashboardLayout';
import Movies from './pages/Movies';
import EditMovie from './pages/EditMovie';
import CreateMovie from './pages/CreateMovie';
import Bookings from './pages/Bookings';
import SingleBooking from './pages/SingleBooking';

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
                    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                    <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
                    
                    {/* Protected Routes with Dashboard Layout */}
                    <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
                    <Route path="/movies" element={<ProtectedRoute><DashboardLayout><Movies /></DashboardLayout></ProtectedRoute>} />
                    <Route path="/movies/create" element={<ProtectedRoute><DashboardLayout><CreateMovie /></DashboardLayout></ProtectedRoute>} />
                    <Route path="/movies/:movieId" element={<ProtectedRoute><DashboardLayout><EditMovie /></DashboardLayout></ProtectedRoute>} />
                    <Route path="/book-ticket/:movieId" element={<ProtectedRoute><DashboardLayout><BookTicket /></DashboardLayout></ProtectedRoute>} />
                    <Route path="/bookings" element={<ProtectedRoute><DashboardLayout><Bookings /></DashboardLayout></ProtectedRoute>} />
                    <Route path="/bookings/:bookingId" element={<ProtectedRoute><DashboardLayout><SingleBooking /></DashboardLayout></ProtectedRoute>} />
                </Routes>
            </Router>
        </>
    );
};

export default AppRoutes;
