import React from 'react';
import { Filter, Grid, List } from 'lucide-react';
import { Rover } from '../../types/marsRover';
import { Button, Card, DatePicker, Select } from '../UI';

interface RoverFiltersProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  selectedCamera: string;
  onCameraChange: (camera: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  rover: Rover | undefined;
}

const RoverFilters: React.FC<RoverFiltersProps> = ({
  selectedDate,
  onDateChange,
  selectedCamera,
  onCameraChange,
  showFilters,
  onToggleFilters,
  viewMode,
  onViewModeChange,
  rover,
}) => {
  const cameraOptions = rover?.cameras.map(camera => ({
    value: camera.name,
    label: camera.full_name,
  })) || [];

  return (
    <Card>
      <div className="flex flex-wrap items-center sm:justify-between justify-center gap-4 mb-4">
        <h2 className="text-2xl font-bold text-white">Filters</h2>
        <div className="flex items-center space-x-4">
          <Button
            variant="secondary"
            onClick={onToggleFilters}
            icon={Filter}
          >
            {showFilters ? 'Hide' : 'Show'} Filters
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              icon={Grid}
            />
            <Button
              variant={viewMode === 'list' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              icon={List}
            />
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="grid md:grid-cols-2 gap-6">
          <DatePicker
            label="Earth Date"
            value={selectedDate}
            onChange={onDateChange}
          />
          <Select
            label="Camera"
            value={selectedCamera}
            onChange={onCameraChange}
            options={cameraOptions}
            placeholder="All Cameras"
          />
        </div>
      )}
    </Card>
  );
};

export default RoverFilters; 