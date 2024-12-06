import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();

    if (!loading && !user) {
        // Redirect to login page if the user is not authenticated
        return <Navigate to="/login" replace />;
    }
    if (loading) return <div>Loading...</div>;
    else {
        // Render the child component if authenticated
        return children;
    }
};

export default ProtectedRoute;