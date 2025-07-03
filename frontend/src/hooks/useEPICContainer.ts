import React, { useState, useCallback, useRef } from 'react';
import { useLoading } from '../context/LoadingContext';
import { useAsync, useLocalStorage } from '.';
import { fetchEPIC } from '../services/epicService';
import { EPICImage } from '../types/epic';

export function useEPICContainer() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { setIsLoading, setLoadingMessage } = useLoading();
  const [lastViewedDate, setLastViewedDate] = useLocalStorage('epic-last-date', selectedDate);
  const lastLoadedDateRef = useRef<string>('');

  const { data: epicImages, loading, error, execute: loadEPICData } = useAsync(
    (date: string) => fetchEPIC(date),
    {
      cacheKey: `epic-${selectedDate}`,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const images = epicImages || [];

  // Effects
  React.useEffect(() => {
    if (selectedDate && selectedDate !== lastLoadedDateRef.current) {
      setIsLoading(true);
      setLoadingMessage('Fetching Earth images from DSCOVR satellite...');
      loadEPICData(selectedDate);
      setLastViewedDate(selectedDate);
      setCurrentImageIndex(0);
      lastLoadedDateRef.current = selectedDate;
    }
  }, [selectedDate, loadEPICData, setIsLoading, setLoadingMessage, setLastViewedDate]);

  React.useEffect(() => {
    setIsLoading(loading);
  }, [loading, setIsLoading]);

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

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else if (direction === 'next' && currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  }, [currentImageIndex, images.length, setCurrentImageIndex]);

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  const formatTime = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  }, []);

  const getImageUrl = useCallback((image: EPICImage) => {
    const date = new Date(image.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${image.image}.png`;
  }, []);

  return {
    selectedDate,
    setSelectedDate,
    currentImageIndex,
    setCurrentImageIndex,
    images,
    loading,
    error,
    navigateDate,
    navigateImage,
    formatDate,
    formatTime,
    getImageUrl,
  };
} 