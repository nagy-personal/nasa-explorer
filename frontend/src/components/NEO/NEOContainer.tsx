import React from 'react';
import { useNEOContainer } from '../../hooks/useNEOContainer';
import NEOHeader from './NEOHeader';
import NEOFilters from './NEOFilters';
import NEOStats from './NEOStats';
import NEOCharts from './NEOCharts';
import NEOList from './NEOList';
import ErrorMessage from '../Common/ErrorMessage';

const NEOContainer: React.FC = () => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    showFilters,
    setShowFilters,
    error,
    getAllAsteroids,
    getHazardousAsteroids,
    formatDistance,
    formatDate,
  } = useNEOContainer();

  if (error) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <NEOHeader
          title="Near Earth Objects"
          subtitle="Track asteroids and comets that come close to Earth"
        />
        <ErrorMessage message={error.message} backend />
      </div>
    );
  }

  const asteroids = getAllAsteroids();
  const hazardousAsteroids = getHazardousAsteroids();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <NEOHeader
        title="Near Earth Objects"
        subtitle="Track asteroids and comets that come close to Earth"
      />

      <NEOFilters
        startDate={startDate}
        onStartDateChange={setStartDate}
        endDate={endDate}
        onEndDateChange={setEndDate}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      <NEOStats
        asteroids={asteroids}
        hazardousAsteroids={hazardousAsteroids}
      />

      <NEOCharts asteroids={asteroids} />

      <NEOList
        asteroids={asteroids}
        formatDistance={formatDistance}
        formatDate={formatDate}
      />
    </div>
  );
};

export default NEOContainer; 