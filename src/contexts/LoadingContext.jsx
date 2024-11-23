import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const useLoadingContext = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () => {
        setIsLoading(true);
    };

    const stopLoading = () => {
        setIsLoading(false);
    };

    return (
        <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};
