import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, DatePicker } from '../UI';

interface APODHeaderProps {
  title: string;
  date: string;
  onDateChange: (date: string) => void;
  onNavigateDate: (direction: 'prev' | 'next') => void;
  showDatePicker: boolean;
  onToggleDatePicker: () => void;
  formatDate: (dateString: string) => string;
}

const APODHeader: React.FC<APODHeaderProps> = ({
  title,
  date,
  onDateChange,
  onNavigateDate,
  showDatePicker,
  onToggleDatePicker,
  formatDate,
}) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-space font-bold mb-4 bg-gradient-to-r from-nasa-blue to-cosmic-purple bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-xl text-gray-400 mb-6">
        {formatDate(date)}
      </p>

      {/* Date Navigation */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onNavigateDate('prev')}
          className="p-3 rounded-full hover:scale-110 transition-transform"
          icon={ChevronLeft}
        />

        <Button
          variant="primary"
          onClick={onToggleDatePicker}
          icon={Calendar}
        >
          Select Date
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onNavigateDate('next')}
          disabled={date === new Date().toISOString().split('T')[0]}
          className="p-3 rounded-full hover:scale-110 transition-transform"
          icon={ChevronRight}
        />
      </div>

      {/* Date Picker */}
      {showDatePicker && (
        <div className="mb-6">
          <DatePicker
            value={date}
            onChange={(newDate) => {
              onDateChange(newDate);
              onToggleDatePicker();
            }}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
      )}
    </div>
  );
};

export default APODHeader; 