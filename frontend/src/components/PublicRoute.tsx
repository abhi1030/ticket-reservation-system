import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLoading } from '../context/PageLoadingContext';

const PublicRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { user } = useAuth();
    const { loading } = useLoading();

    if (!loading && user) {
        // Redirect authenticated users to the dashboard
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PublicRoute;
