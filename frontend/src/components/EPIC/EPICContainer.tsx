import React from 'react';
import { useEPICContainer } from '../../hooks/useEPICContainer';
import { Card } from '../UI';
import EPICHeader from './EPICHeader';
import EPICDateNavigation from './EPICDateNavigation';
import EPICImageDisplay from './EPICImageDisplay';
import ErrorMessage from '../Common/ErrorMessage';

const EPICContainer: React.FC = () => {
  const {
    selectedDate,
    setSelectedDate,
    currentImageIndex,
    images,
    error,
    navigateDate,
    navigateImage,
    formatDate,
    formatTime,
    getImageUrl,
  } = useEPICContainer();

  if (error) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <EPICHeader
          title="EPIC Earth Images"
          subtitle="View stunning images of Earth from NASA's EPIC camera aboard the DSCOVR satellite"
        />
        <Card>
          <ErrorMessage message={error.message} backend />
        </Card>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <EPICHeader
          title="EPIC Earth Images"
          subtitle="View stunning images of Earth from NASA's EPIC camera aboard the DSCOVR satellite"
        />

        <EPICDateNavigation
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onNavigateDate={navigateDate}
          formatDate={formatDate}
          imageCount={images.length}
        />

        <Card>
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No images available for the selected date. Try selecting a different date.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <EPICHeader
        title="EPIC Earth Images"
        subtitle="View stunning images of Earth from NASA's EPIC camera aboard the DSCOVR satellite"
      />

      <EPICDateNavigation
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onNavigateDate={navigateDate}
        formatDate={formatDate}
        imageCount={images.length}
      />

      <EPICImageDisplay
        key={`${selectedDate}-${currentImageIndex}`}
        images={images}
        currentImageIndex={currentImageIndex}
        onNavigateImage={navigateImage}
        formatTime={formatTime}
        getImageUrl={getImageUrl}
      />
    </div>
  );
};

export default EPICContainer; 