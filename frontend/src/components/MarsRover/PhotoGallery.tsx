import React from 'react';
import { Calendar, Camera, ExternalLink } from 'lucide-react';
import { Photo } from '../../types/marsRover';
import { Button, Card, ImageWithFallback } from '../UI';
import PhotoCard from './PhotoCard';

interface PhotoGalleryProps {
  photos: Photo[];
  viewMode: 'grid' | 'list';
  selectedDate: string;
  onClearFilters: () => void;
  formatDate: (dateString: string) => string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  viewMode,
  selectedDate,
  onClearFilters,
  formatDate,
}) => {
  if (!selectedDate) {
    return (
      <Card>
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400 text-lg">
            Please select an <span className="text-nasa-blue font-bold">Earth date</span> to view photos from the selected rover.
          </p>
        </div>
      </Card>
    );
  }

  if (photos.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <Camera className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400 text-lg">
            No photos found for the selected criteria. Try adjusting your filters.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          Photos ({photos.length})
        </h2>
        <Button
          variant="ghost"
          onClick={onClearFilters}
          className="text-nasa-blue hover:text-nasa-red transition-colors"
        >
          Clear Filters
        </Button>
      </div>

      <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'space-y-4'}>
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} viewMode={viewMode}>
            <div className={viewMode === 'grid'
              ? 'w-full h-full flex items-center justify-center'
              : 'flex-shrink-0'}>
              <ImageWithFallback
                src={photo.img_src}
                alt={`Mars photo ${photo.id}`}
                className={viewMode === 'grid'
                  ? 'w-full h-full object-cover rounded-lg'
                  : 'w-24 h-24 object-cover rounded-lg'}
                lazy={true}
              />
            </div>
            {viewMode === 'list' && (
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Sol {photo.sol}</span>
                  <div className="flex space-x-2">
                    <a
                      href={photo.img_src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-nasa-blue hover:text-nasa-red transition-colors"
                      title="View full size"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div className="text-sm text-gray-300 mb-1">
                  <span className="font-semibold">Camera:</span> {photo.camera.full_name}
                </div>
                <div className="text-sm text-gray-400">
                  <span className="font-semibold">Date:</span> {formatDate(photo.earth_date)}
                </div>
              </div>
            )}
          </PhotoCard>
        ))}
      </div>
    </Card>
  );
};

export default PhotoGallery; 