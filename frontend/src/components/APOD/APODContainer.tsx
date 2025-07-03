import React from 'react';
import { useAPODContainer } from '../../hooks/useAPODContainer';
import APODCard from './APODCard';
import APODHeader from './APODHeader';
import ErrorMessage from '../Common/ErrorMessage';

const APODContainer: React.FC = () => {
  const {
    selectedDate,
    setSelectedDate,
    showDatePicker,
    setShowDatePicker,
    apodData,
    error,
    navigateDate,
    formatDate,
  } = useAPODContainer();

  if (error) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-space font-bold mb-4 bg-gradient-to-r from-nasa-blue to-cosmic-purple bg-clip-text text-transparent">
            Astronomy Picture of the Day
          </h1>
          <ErrorMessage message={error.message} backend />
        </div>
      </div>
    );
  }

  if (!apodData) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <APODHeader
        title="Astronomy Picture of the Day"
        date={selectedDate}
        onDateChange={setSelectedDate}
        onNavigateDate={navigateDate}
        showDatePicker={showDatePicker}
        onToggleDatePicker={() => setShowDatePicker(!showDatePicker)}
        formatDate={formatDate}
      />

      <APODCard apodData={apodData} formatDate={formatDate} />
    </div>
  );
};

export default APODContainer; 