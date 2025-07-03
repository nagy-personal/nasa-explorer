import React, { useState, useCallback, useRef } from 'react';
import { useLoading } from '../context/LoadingContext';
import { useAsync, useLocalStorage } from '.';
import { fetchAPOD } from '../services/apodService';

export function useAPODContainer() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { setIsLoading, setLoadingMessage } = useLoading();
  const [lastViewedDate, setLastViewedDate] = useLocalStorage('apod-last-date', selectedDate);
  const lastLoadedDateRef = useRef<string>('');

  const { data: apodData, loading, error, execute: loadAPOD } = useAsync(
    (date: string) => fetchAPOD(date),
    {
      cacheKey: `apod-${selectedDate}`,
      cacheTime: 30 * 60 * 1000,
    }
  );

  // Effects
  // Load data when date changes
  React.useEffect(() => {
    if (selectedDate && selectedDate !== lastLoadedDateRef.current) {
      setIsLoading(true);
      setLoadingMessage('Fetching astronomy picture...');
      loadAPOD(selectedDate);
      setLastViewedDate(selectedDate);
      lastLoadedDateRef.current = selectedDate;
    }
  }, [selectedDate, loadAPOD, setIsLoading, setLoadingMessage, setLastViewedDate]);

  // Update loading state
  React.useEffect(() => {
    setIsLoading(loading);
  }, [loading, setIsLoading]);

  // Restore last viewed date on mount
  React.useEffect(() => {
    if (lastViewedDate && lastViewedDate !== selectedDate) {
      setSelectedDate(lastViewedDate);
    }
    // eslint-disable-next-line
  }, []);

  // Handlers
  const navigateDate = useCallback((direction: 'prev' | 'next') => {
    const currentDate = new Date(selectedDate);
    if (direction === 'prev') {
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    const today = new Date();
    if (currentDate <= today) {
      setSelectedDate(currentDate.toISOString().split('T')[0]);
    }
  }, [selectedDate, setSelectedDate]);

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  return {
    selectedDate,
    setSelectedDate,
    showDatePicker,
    setShowDatePicker,
    apodData,
    loading,
    error,
    navigateDate,
    formatDate,
  };
} 