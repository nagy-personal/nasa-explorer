import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, DatePicker } from '../UI';

interface EPICDateNavigationProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  onNavigateDate: (direction: 'prev' | 'next') => void;
  formatDate: (dateString: string) => string;
  imageCount: number;
}

const EPICDateNavigation: React.FC<EPICDateNavigationProps> = ({
  selectedDate,
  onDateChange,
  onNavigateDate,
  formatDate,
  imageCount,
}) => {
  return (
    <div className="card">
      <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-6">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onNavigateDate('prev')}
          className="p-2 sm:p-3 rounded-full hover:scale-110 transition-transform"
          icon={ChevronLeft}
        />
        <Button
          variant="primary"
          className="cursor-default text-sm sm:text-base"
          style={{ pointerEvents: 'none', opacity: 0.8 }}
          icon={Calendar}
        >
          {formatDate(selectedDate)}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onNavigateDate('next')}
          disabled={selectedDate === new Date().toISOString().split('T')[0]}
          className="p-2 sm:p-3 rounded-full hover:scale-110 transition-transform"
          icon={ChevronRight}
        />
      </div>
      <div className="text-center mb-4">
        <DatePicker
          value={selectedDate}
          onChange={onDateChange}
          max={new Date().toISOString().split('T')[0]}
        />
      </div>
      <div className="text-center text-gray-400 text-sm sm:text-base">
        {imageCount} images available for {formatDate(selectedDate)}
      </div>
    </div>
  );
};

export default EPICDateNavigation; 