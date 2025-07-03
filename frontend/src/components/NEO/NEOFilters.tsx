import React from 'react';
import { Filter } from 'lucide-react';
import { Button, Card, DatePicker } from '../UI';

interface NEOFiltersProps {
  startDate: string;
  onStartDateChange: (date: string) => void;
  endDate: string;
  onEndDateChange: (date: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

const NEOFilters: React.FC<NEOFiltersProps> = ({
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  showFilters,
  onToggleFilters,
}) => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Date Range</h2>
        <Button
          variant="secondary"
          onClick={onToggleFilters}
          icon={Filter}
        >
          {showFilters ? 'Hide' : 'Show'} Filters
        </Button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={onStartDateChange}
            max={endDate}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={onEndDateChange}
            min={startDate}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
      )}
    </Card>
  );
};

export default NEOFilters; 