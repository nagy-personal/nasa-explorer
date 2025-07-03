import React, { useState, useCallback, useRef } from 'react';
import { useLoading } from '../context/LoadingContext';
import { useAsync, useLocalStorage } from '.';
import { fetchNEO } from '../services/neoService';
import { Asteroid } from '../types/neo';

export function useNEOContainer() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [showFilters, setShowFilters] = useState(false);
  const { setIsLoading, setLoadingMessage } = useLoading();
  const [lastDateRange, setLastDateRange] = useLocalStorage('neo-last-date-range', { startDate, endDate });
  const lastLoadedDateRangeRef = useRef<string>('');

  const { data: neoData, loading, error, execute: loadNEOData } = useAsync(
    (start: string, end: string) => fetchNEO(start, end),
    {
      cacheKey: `neo-${startDate}-${endDate}`,
      cacheTime: 30 * 60 * 1000,
    }
  );

  React.useEffect(() => {
    const dateRangeKey = `${startDate}-${endDate}`;
    if (startDate && endDate && dateRangeKey !== lastLoadedDateRangeRef.current) {
      setIsLoading(true);
      setLoadingMessage('Fetching near-Earth objects data...');
      loadNEOData(startDate, endDate);
      setLastDateRange({ startDate, endDate });
      lastLoadedDateRangeRef.current = dateRangeKey;
    }
  }, [startDate, endDate, loadNEOData, setIsLoading, setLoadingMessage, setLastDateRange]);

  React.useEffect(() => {
    setIsLoading(loading);
  }, [loading, setIsLoading]);

  React.useEffect(() => {
    if ((lastDateRange.startDate !== startDate) || (lastDateRange.endDate !== endDate)) {
      setStartDate(lastDateRange.startDate);
      setEndDate(lastDateRange.endDate);
    }
    // eslint-disable-next-line
  }, []);

  const getAllAsteroids = useCallback((): Asteroid[] => {
    if (!neoData?.near_earth_objects) return [];
    return Object.values(neoData.near_earth_objects).flat();
  }, [neoData]);

  const getHazardousAsteroids = useCallback((): Asteroid[] => {
    return getAllAsteroids().filter(asteroid => asteroid.is_potentially_hazardous_asteroid);
  }, [getAllAsteroids]);

  const formatDistance = useCallback((distance: string) => {
    const num = parseFloat(distance);
    if (num >= 1) {
      return `${num.toFixed(2)} AU`;
    } else {
      return `${(num * 149597870.7).toLocaleString()} km`;
    }
  }, []);

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }, []);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    showFilters,
    setShowFilters,
    loading,
    error,
    getAllAsteroids,
    getHazardousAsteroids,
    formatDistance,
    formatDate,
  };
} 