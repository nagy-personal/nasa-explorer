import React from 'react';
import { useMarsRoverContainer } from '../../hooks/useMarsRoverContainer';
import MarsRoverHeader from './MarsRoverHeader';
import RoverSelector from './RoverSelector';
import RoverFilters from './RoverFilters';
import RoverInfo from './RoverInfo';
import PhotoGallery from './PhotoGallery';
import ErrorMessage from '../Common/ErrorMessage';

const MarsRoverContainer: React.FC = () => {
  const {
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
  } = useMarsRoverContainer();

  if (roversError || photosError) {
    const error = roversError || photosError;
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <MarsRoverHeader
          title="Mars Rover Photos"
          subtitle="Explore the Red Planet through the eyes of NASA's Mars rovers"
        />
        <ErrorMessage message={error?.message || ''} backend />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <MarsRoverHeader
        title="Mars Rover Photos"
        subtitle="Explore the Red Planet through the eyes of NASA's Mars rovers"
      />

      <RoverSelector
        rovers={roversList}
        selectedRover={selectedRover}
        onRoverSelect={setSelectedRover}
        roverNames={['curiosity', 'opportunity', 'spirit', 'perseverance']}
      />

      <RoverFilters
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        selectedCamera={selectedCamera}
        onCameraChange={setSelectedCamera}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        rover={getRoverInfo()}
      />

      {getRoverInfo() && (
        <RoverInfo
          rover={getRoverInfo()!}
          formatDate={formatDate}
        />
      )}

      <PhotoGallery
        photos={photosList}
        viewMode={viewMode}
        selectedDate={selectedDate}
        onClearFilters={() => {
          setSelectedDate('');
          setSelectedCamera('');
        }}
        formatDate={formatDate}
      />
    </div>
  );
};

export default MarsRoverContainer; 