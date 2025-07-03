import React from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { APODData } from '../../types/apod';
import { Button, ImageWithFallback } from '../UI';

interface APODMediaProps {
  apodData: APODData;
}

const APODMedia: React.FC<APODMediaProps> = ({ apodData }) => {
  if (apodData.media_type === 'image') {
    return (
      <div className="relative group mb-6">
        <ImageWithFallback
          src={apodData.url}
          alt={apodData.title}
          className="w-full h-auto rounded-lg shadow-2xl group-hover:scale-105 transition-transform duration-300"
          lazy={true}
        />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
          {apodData.hdurl && (
            <a
              href={apodData.hdurl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/50 p-2 rounded-lg hover:bg-black/70 transition-colors"
              title="View HD version"
            >
              <Download className="w-5 h-5 text-white" />
            </a>
          )}
          <a
            href={apodData.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/50 p-2 rounded-lg hover:bg-black/70 transition-colors"
            title="Open in new tab"
          >
            <ExternalLink className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-8 text-center mb-6">
      <p className="text-gray-400">Video content available</p>
      <Button
        variant="primary"
        className="mt-4"
        icon={ExternalLink}
        onClick={() => window.open(apodData.url, '_blank')}
      >
        Watch Video
      </Button>
    </div>
  );
};

export default APODMedia; 