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

const AppRoutes = () => {
    const { loading } = useLoading();

    return (
        <>
            {loading && <PageLoader />}
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>} />
                    <Route path="/signup" element={
                        <PublicRoute>
                            <Signup />
                        </PublicRoute>} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>} />
                    <Route path="/purchase-ticket" element={
                        <ProtectedRoute>
                            <PurchaseTicket />
                        </ProtectedRoute>} />
                </Routes>
            </Router>
        </>
    );
};

export default AppRoutes;
