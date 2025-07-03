import React from 'react';
import { APODData } from '../../types/apod';
import { Card } from '../UI';
import APODMedia from './APODMedia';
import APODInfo from './APODInfo';

interface APODCardProps {
  apodData: APODData;
  formatDate: (dateString: string) => string;
}

const APODCard: React.FC<APODCardProps> = ({ apodData, formatDate }) => {
  return (
    <Card>
      <h2 className="text-3xl font-bold mb-4 text-white">{apodData.title}</h2>

      {apodData.copyright && (
        <p className="text-gray-400 mb-4">
          Image Credit: {apodData.copyright}
        </p>
      )}

      <APODMedia apodData={apodData} />

      {/* Explanation */}
      <div className="prose prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-gray-300 whitespace-pre-line">
          {apodData.explanation}
        </p>
      </div>

      <APODInfo apodData={apodData} formatDate={formatDate} />
    </Card>
  );
};

export default APODCard; 