import React from 'react';
import { LinearProgress } from '@mui/material';
import { useLoadingContext } from '../contexts/LoadingContext';

const LoadingIndicator = () => {
    const { isLoading } = useLoadingContext();

    return (
        isLoading && <LinearProgress className="loadingBar" sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }} />
    );
};

export default LoadingIndicator;
