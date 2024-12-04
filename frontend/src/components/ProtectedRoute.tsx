import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLoading } from '../context/PageLoadingContext';

interface ProtectedRouteProps {
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuth();
    const { loading } = useLoading();

    if (!loading && !user) {
        // Redirect to login page if the user is not authenticated
        return <Navigate to="/login" replace />;
    }

    // Render the child component if authenticated
    return children;
};

export default ProtectedRoute;