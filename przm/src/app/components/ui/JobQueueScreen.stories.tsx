import type { Meta, StoryObj } from '@storybook/react';
import { JobQueueScreen } from './JobQueueScreen';
import { Job } from '@/app/types/job';

const meta: Meta<typeof JobQueueScreen> = {
  title: 'Towing/JobQueueScreen',
  component: JobQueueScreen,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onViewDetails: { action: 'view details clicked' },
    onUpdateStatus: { action: 'update status clicked' },
    onRefresh: { action: 'refresh clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleJobs: Job[] = [
  {
    id: '1',
    jobNumber: '21',
    status: 'en_route',
    priority: 'urgent',
    customerName: "Kyle's Motors",
    customerPhone: '(555) 123-4567',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry',
    vehicleYear: 2020,
    vehicleColor: 'Blue',
    licensePlate: 'ABC123',
    pickupLocation: '830 South 17th Street, Columbus OH 43206',
    destination: '830 South 17th Street, Columbus OH 43206',
    distance: '1241 mi (18 h 4m)',
    estimatedTime: '1 ft (1 min)',
    createdAt: new Date('2024-01-15T10:55:00'),
    estimatedCost: 150,
    driverName: 'Kyle Ed',
    truckName: 'Richie',
    description: 'Light tow needed'
  },
  {
    id: '2',
    jobNumber: '18',
    status: 'waiting',
    priority: 'high',
    customerName: 'Downtown Auto Repair',
    customerPhone: '(555) 234-5678',
    vehicleMake: 'Honda',
    vehicleModel: 'Civic',
    vehicleYear: 2019,
    vehicleColor: 'Red',
    licensePlate: 'XYZ789',
    pickupLocation: 'Main Street & 5th Avenue',
    destination: 'City Auto Shop, 123 Repair Blvd',
    distance: '5.2 mi',
    estimatedTime: '12 min',
    createdAt: new Date('2024-01-15T10:30:00'),
    estimatedCost: 85,
    driverName: 'Sarah Johnson',
    truckName: 'Truck 02'
  },
  {
    id: '3',
    jobNumber: '19',
    status: 'dispatched',
    priority: 'normal',
    customerName: 'Mike Rodriguez',
    customerPhone: '(555) 345-6789',
    vehicleMake: 'Ford',
    vehicleModel: 'F-150',
    vehicleYear: 2021,
    vehicleColor: 'White',
    licensePlate: 'FORD21',
    pickupLocation: 'Highway 35, Mile Marker 42',
    destination: 'Johnson\'s Garage',
    distance: '15.7 mi',
    estimatedTime: '25 min',
    createdAt: new Date('2024-01-15T10:15:00'),
    estimatedCost: 120,
    driverName: 'Alex Chen',
    truckName: 'Truck 03'
  },
  {
    id: '4',
    jobNumber: '22',
    status: 'on_scene',
    priority: 'normal',
    customerName: 'Emily Davis',
    customerPhone: '(555) 456-7890',
    vehicleMake: 'BMW',
    vehicleModel: 'X5',
    vehicleYear: 2022,
    vehicleColor: 'Black',
    licensePlate: 'BMW22X',
    pickupLocation: 'Shopping Mall Parking Lot',
    destination: 'BMW Service Center',
    distance: '8.3 mi',
    estimatedTime: '18 min',
    createdAt: new Date('2024-01-15T09:45:00'),
    estimatedCost: 200,
    driverName: 'Tom Wilson',
    truckName: 'Truck 01'
  },
  {
    id: '5',
    jobNumber: '20',
    status: 'completed',
    priority: 'low',
    customerName: 'Robert Taylor',
    customerPhone: '(555) 567-8901',
    vehicleMake: 'Chevrolet',
    vehicleModel: 'Malibu',
    vehicleYear: 2018,
    vehicleColor: 'Silver',
    licensePlate: 'CHV18M',
    pickupLocation: 'Office Complex Parking',
    destination: 'Home Garage',
    distance: '12.1 mi',
    estimatedTime: '22 min',
    createdAt: new Date('2024-01-15T09:00:00'),
    estimatedCost: 95,
    driverName: 'Lisa Park',
    truckName: 'Truck 04'
  },
  {
    id: '6',
    jobNumber: '23',
    status: 'towing',
    priority: 'urgent',
    customerName: 'Emergency Services',
    customerPhone: '(555) 678-9012',
    vehicleMake: 'Tesla',
    vehicleModel: 'Model 3',
    vehicleYear: 2023,
    vehicleColor: 'White',
    licensePlate: 'TESLA3',
    pickupLocation: 'Interstate 75, Exit 42',
    destination: 'Tesla Service Center',
    distance: '22.5 mi',
    estimatedTime: '35 min',
    createdAt: new Date('2024-01-15T11:20:00'),
    estimatedCost: 250,
    driverName: 'Chris Martinez',
    truckName: 'Heavy Duty 01'
  }
];

export const Default: Story = {
  args: {
    jobs: sampleJobs,
  },
};

export const EmptyQueue: Story = {
  args: {
    jobs: [],
  },
};

export const SingleJob: Story = {
  args: {
    jobs: [sampleJobs[0]],
  },
};

export const OnlyUrgentJobs: Story = {
  args: {
    jobs: sampleJobs.filter(job => job.priority === 'urgent'),
  },
};

export const OnlyWaitingJobs: Story = {
  args: {
    jobs: sampleJobs.filter(job => job.status === 'waiting'),
  },
};

export const OnlyCompletedJobs: Story = {
  args: {
    jobs: sampleJobs.filter(job => job.status === 'completed'),
  },
};

export const ManyJobs: Story = {
  args: {
    jobs: [
      ...sampleJobs,
      ...sampleJobs.map((job, index) => ({
        ...job,
        id: `${job.id}-copy-${index}`,
        jobNumber: `${parseInt(job.jobNumber) + 10}`,
        createdAt: new Date(job.createdAt.getTime() - index * 300000), // 5 min intervals
      })),
    ],
  },
};
