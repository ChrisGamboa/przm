import type { Meta, StoryObj } from '@storybook/react';
import { JobQueueClient } from './JobQueueClient';
import { Job } from '@/app/types/job';

const mockJobs: Job[] = [
  {
    id: '1',
    jobNumber: 'TJ-001',
    status: 'dispatched',
    priority: 'high',
    customerName: "Sarah Johnson",
    customerPhone: '(555) 123-4567',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry',
    vehicleYear: 2018,
    vehicleColor: 'Silver',
    licensePlate: 'ABC123',
    pickupLocation: '123 Main St, Downtown',
    destination: 'Auto Repair Shop, 456 Oak Ave',
    distance: '5.2 mi',
    estimatedTime: '12 min',
    createdAt: new Date('2025-01-15T10:00:00Z'),
    estimatedCost: 125,
    driverName: 'Alex Thompson',
    truckName: 'Truck 01',
    description: "Vehicle won't start, battery appears dead",
    scheduledAt: new Date('2025-01-15T10:00:00Z'),
  },
  {
    id: '2',
    jobNumber: 'TJ-002',
    status: 'en_route',
    priority: 'urgent',
    customerName: 'Mike Rodriguez',
    customerPhone: '(555) 987-6543',
    vehicleMake: 'Honda',
    vehicleModel: 'Civic',
    vehicleYear: 2020,
    vehicleColor: 'Blue',
    licensePlate: 'XYZ789',
    pickupLocation: 'Highway 101, Mile Marker 45',
    destination: "Johnson's Auto Body, 789 Pine St",
    distance: '18.7 mi',
    estimatedTime: '25 min',
    createdAt: new Date('2025-01-15T14:30:00Z'),
    estimatedCost: 200,
    driverName: 'Maria Santos',
    truckName: 'Truck 02',
    description: 'Rear-ended in traffic accident, vehicle not drivable',
    scheduledAt: new Date('2025-01-15T14:30:00Z'),
  },
  {
    id: '3',
    jobNumber: 'TJ-003',
    status: 'completed',
    priority: 'normal',
    customerName: 'Emily Chen',
    customerPhone: '(555) 456-7890',
    vehicleMake: 'Ford',
    vehicleModel: 'F-150',
    vehicleYear: 2019,
    vehicleColor: 'Red',
    licensePlate: 'TRUCK99',
    pickupLocation: 'City Mall Parking Lot, Level 2',
    destination: 'Owner\'s residence, 321 Elm Drive',
    distance: '8.3 mi',
    estimatedTime: '18 min',
    createdAt: new Date('2025-01-14T16:00:00Z'),
    estimatedCost: 100,
    driverName: 'Tom Wilson',
    truckName: 'Truck 03',
    description: 'Flat tire, customer needs vehicle moved to safe location',
    scheduledAt: new Date('2025-01-14T16:00:00Z'),
  },
  {
    id: '4',
    jobNumber: 'TJ-004',
    status: 'towing',
    priority: 'low',
    customerName: 'David Wilson',
    customerPhone: '(555) 321-0987',
    vehicleMake: 'BMW',
    vehicleModel: 'X5',
    vehicleYear: 2021,
    vehicleColor: 'Black',
    licensePlate: 'LUX2021',
    pickupLocation: 'Downtown Business District, 5th & Broadway',
    destination: 'BMW Service Center, 555 Motor Pkwy',
    distance: '12.1 mi',
    estimatedTime: '22 min',
    createdAt: new Date('2025-01-15T11:45:00Z'),
    estimatedCost: 175,
    driverName: 'Lisa Park',
    truckName: 'Heavy Duty 01',
    description: 'Engine overheating, steam visible from hood',
    scheduledAt: new Date('2025-01-15T11:45:00Z'),
  },
];

const meta: Meta<typeof JobQueueClient> = {
  title: 'Pages/JobQueueClient',
  component: JobQueueClient,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Client component for the job queue screen with interactive filtering, sorting, and job management capabilities. This component receives pre-fetched job data from the server.',
      },
    },
  },
  args: {
    jobs: mockJobs,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Job queue with a variety of jobs in different statuses and priorities.',
      },
    },
  },
};

export const EmptyQueue: Story = {
  args: {
    jobs: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty job queue state when no jobs are available.',
      },
    },
  },
};

export const OnlyUrgentJobs: Story = {
  args: {
    jobs: mockJobs.filter(job => job.priority === 'urgent'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Job queue with only urgent priority jobs.',
      },
    },
  },
};

export const OnlyInProgressJobs: Story = {
  args: {
    jobs: mockJobs.filter(job => ['en_route', 'on_scene', 'towing'].includes(job.status)),
  },
  parameters: {
    docs: {
      description: {
        story: 'Job queue filtered to show only in-progress jobs (en route, on scene, towing). Dispatched jobs have their own filter and require acceptance.',
      },
    },
  },
};

export const CompletedJobsOnly: Story = {
  args: {
    jobs: mockJobs.filter(job => job.status === 'completed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Job queue filtered to show only completed jobs.',
      },
    },
  },
};

export const SingleJob: Story = {
  args: {
    jobs: [mockJobs[0]],
  },
  parameters: {
    docs: {
      description: {
        story: 'Job queue with a single job for testing individual job card interactions.',
      },
    },
  },
};

export const ManyJobsWithScrollableFilters: Story = {
  args: {
    jobs: [
      ...mockJobs,
      ...mockJobs.map((job, index) => ({
        ...job,
        id: `${job.id}-${index + 5}`,
        jobNumber: `TJ-${String(index + 5).padStart(3, '0')}`,
        status: ['waiting', 'dispatched', 'en_route', 'on_scene', 'towing', 'completed'][index % 6] as any,
      })),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Job queue with many jobs to demonstrate horizontal scrolling of filter buttons. This ensures all filter tabs remain accessible even on narrow screens.',
      },
    },
  },
};
