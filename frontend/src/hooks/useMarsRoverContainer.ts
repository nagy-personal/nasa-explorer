import React, { useState, useCallback, useMemo, useRef } from 'react';
import { useLoading } from '../context/LoadingContext';
import { useAsync, useLocalStorage } from '.';
import { fetchRovers, fetchPhotos } from '../services/marsRoverService';

export function useMarsRoverContainer() {
  const [selectedRover, setSelectedRover] = useState<string>('curiosity');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const { setIsLoading, setLoadingMessage } = useLoading();
  const [lastRover, setLastRover] = useLocalStorage('mars-rover-last', selectedRover);
  
  // Refs to track what has been loaded to prevent infinite loops
  const roversLoadedRef = useRef(false);
  const lastPhotoRequestRef = useRef<string>('');
  const initialDateSetRef = useRef(false);

  const { data: rovers, loading: roversLoading, error: roversError, execute: loadRovers } = useAsync(
    () => fetchRovers(),
    {
      cacheKey: 'mars-rovers',
      cacheTime: 60 * 60 * 1000,
      immediate: false,
    }
  );

  const { data: photos, loading: photosLoading, error: photosError, execute: loadPhotos } = useAsync(
    (rover: string, date: string, camera: string) => fetchPhotos(rover, date, camera),
    {
      cacheKey: `mars-photos-${selectedRover}-${selectedDate}-${selectedCamera}`,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const roversList = useMemo(() => rovers || [], [rovers]);
  const photosList = photos || [];

  // Load rovers on mount (only once)
  React.useEffect(() => {
    if (!roversLoadedRef.current) {
      setIsLoading(true);
      setLoadingMessage('Loading Mars rovers...');
      loadRovers();
      roversLoadedRef.current = true;
    }
  }, [loadRovers, setIsLoading, setLoadingMessage]);

  // Set initial date when rovers are loaded and rover is selected
  React.useEffect(() => {
    if (roversList.length > 0 && selectedRover) {
      const roverInfo = roversList.find(r => r.name.toLowerCase() === selectedRover);
      if (roverInfo) {
        // Set to max_date when rover changes or when no date is selected
        if (!selectedDate || !initialDateSetRef.current) {
          setSelectedDate(roverInfo.max_date);
          initialDateSetRef.current = true;
        }
      }
    }
  }, [roversList, selectedRover, selectedDate]);

  // Reset date when rover changes
  React.useEffect(() => {
    if (roversList.length > 0 && selectedRover) {
      const roverInfo = roversList.find(r => r.name.toLowerCase() === selectedRover);
      if (roverInfo) {
        setSelectedDate(roverInfo.max_date);
      }
    }
  }, [selectedRover, roversList]);

  // Load photos when criteria change
  React.useEffect(() => {
    const photoRequestKey = `${selectedRover}-${selectedDate}-${selectedCamera}`;
    if (selectedRover && selectedDate && photoRequestKey !== lastPhotoRequestRef.current) {
      setIsLoading(true);
      setLoadingMessage('Fetching Mars photos...');
      loadPhotos(selectedRover, selectedDate, selectedCamera);
      lastPhotoRequestRef.current = photoRequestKey;
    }
  }, [selectedRover, selectedDate, selectedCamera, loadPhotos, setIsLoading, setLoadingMessage]);

  // Update loading state
  React.useEffect(() => {
    setIsLoading(roversLoading || photosLoading);
  }, [roversLoading, photosLoading, setIsLoading]);

  // Restore last selected rover on mount
  React.useEffect(() => {
    if (lastRover && lastRover !== selectedRover) {
      setSelectedRover(lastRover);
    }
    // eslint-disable-next-line
  }, []);

  // Persist selectedRover to localStorage
  React.useEffect(() => {
    setLastRover(selectedRover);
    // eslint-disable-next-line
  }, [selectedRover]);

  const getRoverInfo = useCallback(() => {
    return roversList.find(rover => rover.name.toLowerCase() === selectedRover);
  }, [roversList, selectedRover]);

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  return {
    selectedRover,
    setSelectedRover,
    selectedDate,
    setSelectedDate,
    selectedCamera,
    setSelectedCamera,
    viewMode,
    setViewMode,
    showFilters,
    setShowFilters,
    roversList,
    photosList,
    roversError,
    photosError,
    getRoverInfo,
    formatDate,
  };
} 