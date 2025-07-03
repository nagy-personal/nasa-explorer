import React, { useRef } from 'react';
import { Photo } from '../../types/marsRover';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

interface PhotoCardProps {
  photo: Photo;
  viewMode: 'grid' | 'list';
  children?: React.ReactNode;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, viewMode, children }) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const { isIntersecting } = useIntersectionObserver({ ref: divRef });

  return (
    <div
      ref={divRef}
      className={
        viewMode === 'grid'
          ? `bg-gray-900 rounded-lg overflow-hidden flex flex-col items-center aspect-square min-h-[200px] min-w-[200px] transition-opacity duration-700 ${isIntersecting ? 'opacity-100' : 'opacity-0'}`
          : 'flex items-center space-x-4 bg-gray-800 rounded-lg p-4'
      }
    >
      {children}
    </div>
  );
};

export default PhotoCard; 