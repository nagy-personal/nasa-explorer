import React from 'react';
import { Asteroid } from '../../types/neo';
import { Card } from '../UI';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface NEOChartsProps {
  asteroids: Asteroid[];
}

const NEOCharts: React.FC<NEOChartsProps> = ({ asteroids }) => {
  const getSizeDistribution = () => {
    const sizeRanges = {
      'Small (< 100m)': 0,
      'Medium (100m - 1km)': 0,
      'Large (> 1km)': 0
    };

    asteroids.forEach(asteroid => {
      const avgDiameter = (asteroid.estimated_diameter.kilometers.estimated_diameter_min +
        asteroid.estimated_diameter.kilometers.estimated_diameter_max) / 2;

      if (avgDiameter < 0.1) {
        sizeRanges['Small (< 100m)']++;
      } else if (avgDiameter < 1) {
        sizeRanges['Medium (100m - 1km)']++;
      } else {
        sizeRanges['Large (> 1km)']++;
      }
    });

    return {
      labels: Object.keys(sizeRanges),
      datasets: [{
        data: Object.values(sizeRanges),
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 2
      }]
    };
  };

  const getVelocityChart = () => {
    const topAsteroids = asteroids.slice(0, 10); // Top 10 by velocity

    return {
      labels: topAsteroids.map(a => a.name.substring(0, 15) + '...'),
      datasets: [{
        label: 'Velocity (km/s)',
        data: topAsteroids.map(a => parseFloat(a.close_approach_data[0]?.relative_velocity.kilometers_per_second || '0')),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2
      }]
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <Card className="w-full">
        <h3 className="text-xl font-bold mb-4 text-white">Size Distribution</h3>
        <div className="w-full">
          <Doughnut
            data={getSizeDistribution()}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    color: '#9CA3AF'
                  }
                }
              }
            }}
          />
        </div>
      </Card>

      <Card className="w-full">
        <h3 className="text-xl font-bold mb-4 text-white">Top 10 by Velocity</h3>
        <div className="w-full">
          <Bar
            data={getVelocityChart()}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: '#9CA3AF'
                  },
                  grid: {
                    color: '#374151'
                  }
                },
                x: {
                  ticks: {
                    color: '#9CA3AF'
                  },
                  grid: {
                    color: '#374151'
                  }
                }
              }
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default NEOCharts; 