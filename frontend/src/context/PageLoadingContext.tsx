import React, { createContext, useState, useContext } from 'react';

interface PageLoadingContextType {
    loading: boolean;
    setLoadingState: (state: boolean) => void;
}

const PageLoadingContext = createContext<PageLoadingContextType | undefined>(undefined);

export const PageLoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const setLoadingState = (state: boolean) => {
        setLoading(state);
    }

    return (
        <PageLoadingContext.Provider value={{ loading, setLoadingState }}>
            {children}
        </PageLoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(PageLoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within an PageLoadingProvider');
    }
    return context;
};
