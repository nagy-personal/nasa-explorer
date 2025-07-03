import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, ExternalLink, Globe } from 'lucide-react';
import { EPICImage } from '../../types/epic';
import { Button, ImageWithFallback } from '../UI';

interface EPICImageDisplayProps {
  images: EPICImage[];
  currentImageIndex: number;
  onNavigateImage: (direction: 'prev' | 'next') => void;
  formatTime: (dateString: string) => string;
  getImageUrl: (image: EPICImage) => string;
}

const EPICImageDisplay: React.FC<EPICImageDisplayProps> = ({
  images,
  currentImageIndex,
  onNavigateImage,
  formatTime,
  getImageUrl,
}) => {
  const currentImage = images[currentImageIndex];
  const [imageLoading, setImageLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
  };

  return (
    <div className="card">
      <div className="relative">
        {/* Loading Placeholder */}
        {imageLoading && (
          <div className="w-full h-96 bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
              <Globe className="w-8 h-8 mx-auto mb-2 text-blue-300" />
              <p className="text-lg font-semibold mb-1">Loading Earth Image</p>
              <p className="text-sm text-blue-200">Capturing the beauty of our planet...</p>
            </div>
          </div>
        )}

        <ImageWithFallback
          src={getImageUrl(currentImage)}
          alt={`EPIC Earth image ${currentImage.image}`}
          className={`w-full h-auto rounded-lg shadow-2xl transition-opacity duration-500 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          lazy={false}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {/* Navigation Overlay */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigateImage('prev')}
            disabled={currentImageIndex === 0}
            className="p-3 rounded-full hover:scale-110 transition-transform"
            icon={ChevronLeft}
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigateImage('next')}
            disabled={currentImageIndex === images.length - 1}
            className="p-3 rounded-full hover:scale-110 transition-transform"
            icon={ChevronRight}
          />
        </div>

        {/* Image Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold mb-1">
                Image {currentImageIndex + 1} of {images.length}
              </h3>
              <p className="text-gray-300 text-sm">
                Captured at {formatTime(currentImage.date)}
              </p>
            </div>
            <div className="flex space-x-2">
              <a
                href={getImageUrl(currentImage)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-nasa-blue hover:bg-blue-600 p-2 rounded-lg transition-colors"
                title="Download image"
              >
                <Download className="w-4 h-4 text-white" />
              </a>
              <a
                href={getImageUrl(currentImage)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors"
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Image Navigation Dots */}
      {images.length > 1 && (
        <div className="flex justify-center mt-6 space-x-1 sm:space-x-2">
          {(() => {
            const maxDots = isSmallScreen ? 8 : 15; // Show fewer dots on small screens
            const totalImages = images.length;
            
            if (totalImages <= maxDots) {
              // Show all dots if we have fewer images than max
              return images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (index < currentImageIndex) {
                      onNavigateImage('prev');
                    } else if (index > currentImageIndex) {
                      onNavigateImage('next');
                    }
                  }}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                    index === currentImageIndex
                      ? 'bg-nasa-blue'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ));
            } else {
              // Show smart pagination with ellipsis
              const dots = [];
              const halfMax = Math.floor(maxDots / 2);
              
              // Always show first dot
              dots.push(
                <button
                  key={0}
                  onClick={() => {
                    if (0 < currentImageIndex) {
                      onNavigateImage('prev');
                    }
                  }}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                    0 === currentImageIndex
                      ? 'bg-nasa-blue'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              );
              
              // Show ellipsis if needed
              if (currentImageIndex > halfMax) {
                dots.push(
                  <span key="ellipsis1" className="text-gray-400 text-xs px-1">...</span>
                );
              }
              
              // Show dots around current image
              const start = Math.max(1, currentImageIndex - halfMax + 2);
              const end = Math.min(totalImages - 1, currentImageIndex + halfMax - 2);
              
              for (let i = start; i <= end; i++) {
                dots.push(
                  <button
                    key={i}
                    onClick={() => {
                      if (i < currentImageIndex) {
                        onNavigateImage('prev');
                      } else if (i > currentImageIndex) {
                        onNavigateImage('next');
                      }
                    }}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                      i === currentImageIndex
                        ? 'bg-nasa-blue'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                );
              }
              
              // Show ellipsis if needed
              if (currentImageIndex < totalImages - halfMax - 1) {
                dots.push(
                  <span key="ellipsis2" className="text-gray-400 text-xs px-1">...</span>
                );
              }
              
              // Always show last dot
              if (totalImages > 1) {
                dots.push(
                  <button
                    key={totalImages - 1}
                    onClick={() => {
                      if (totalImages - 1 > currentImageIndex) {
                        onNavigateImage('next');
                      }
                    }}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                      totalImages - 1 === currentImageIndex
                        ? 'bg-nasa-blue'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                );
              }
              
              return dots;
            }
          })()}
        </div>
      )}
    </div>
  );
};

export default EPICImageDisplay; 