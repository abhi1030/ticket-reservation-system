import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { user , loading } = useAuth();

    if (!loading && user) {
        // Redirect authenticated users to the dashboard
        return <Navigate to="/dashboard" replace />;
    }

    if (loading) return <div>Loading...</div>;
    else {
        // Render the child component if authenticated
        return children;
    }
};

export default PublicRoute;
