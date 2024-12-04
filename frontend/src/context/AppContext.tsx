import React from 'react';
import { AuthProvider } from './AuthContext';
import { PageLoadingProvider } from './PageLoadingContext';

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <PageLoadingProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </PageLoadingProvider>
    );
};
