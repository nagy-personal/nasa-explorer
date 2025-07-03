import React from 'react';
import { APODData } from '../../types/apod';

interface APODInfoProps {
  apodData: APODData;
  formatDate: (dateString: string) => string;
}

const APODInfo: React.FC<APODInfoProps> = ({ apodData, formatDate }) => {
  return (
    <div className="mt-8 pt-6 border-t border-gray-700">
      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
        <div>
          <span className="font-semibold text-white">Date:</span> {formatDate(apodData.date)}
        </div>
        <div>
          <span className="font-semibold text-white">Media Type:</span> {apodData.media_type}
        </div>
        <div>
          <span className="font-semibold text-white">Service Version:</span> {apodData.service_version}
        </div>
        {apodData.copyright && (
          <div>
            <span className="font-semibold text-white">Copyright:</span> {apodData.copyright}
          </div>
        )}
      </div>
    </div>
  );
};

export default APODInfo; 