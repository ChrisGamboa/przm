import type { Meta, StoryObj } from '@storybook/react';
import { JobCard } from './JobCard';
import { Job } from '@/app/types/job';

const meta: Meta<typeof JobCard> = {
  title: 'Towing/JobCard',
  component: JobCard,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onViewDetails: { action: 'view details clicked' },
    onUpdateStatus: { action: 'update status clicked' },
    onAcceptJob: { action: 'accept job clicked' },
    onDeclineJob: { action: 'decline job clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const baseJob: Job = {
  id: '1',
  jobNumber: '21',
  status: 'en_route',
  priority: 'normal',
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
};

export const Default: Story = {
  args: {
    job: baseJob,
  },
};

export const WaitingStatus: Story = {
  args: {
    job: {
      ...baseJob,
      status: 'dispatched',
      jobNumber: '18',
    },
  },
};

export const DispatchedStatus: Story = {
  args: {
    job: {
      ...baseJob,
      status: 'dispatched',
      jobNumber: '19',
    },
  },
};

export const OnSceneStatus: Story = {
  args: {
    job: {
      ...baseJob,
      status: 'on_scene',
      jobNumber: '22',
    },
  },
};

export const TowingStatus: Story = {
  args: {
    job: {
      ...baseJob,
      status: 'towing',
      jobNumber: '23',
    },
  },
};

export const CompletedStatus: Story = {
  args: {
    job: {
      ...baseJob,
      status: 'completed',
      jobNumber: '20',
    },
  },
};

export const UrgentPriority: Story = {
  args: {
    job: {
      ...baseJob,
      priority: 'urgent',
      jobNumber: '24',
      customerName: 'Emergency Road Service',
      description: 'Vehicle blocking traffic - urgent response needed',
    },
  },
};

export const HighPriority: Story = {
  args: {
    job: {
      ...baseJob,
      priority: 'high',
      jobNumber: '25',
      customerName: 'Downtown Auto Repair',
    },
  },
};

export const MinimalInfo: Story = {
  args: {
    job: {
      id: '2',
      jobNumber: '26',
      status: 'dispatched',
      priority: 'low',
      customerName: 'John Smith',
      customerPhone: '(555) 987-6543',
      vehicleMake: 'Honda',
      vehicleModel: 'Civic',
      vehicleYear: 2018,
      pickupLocation: 'Main Street Parking Lot',
      createdAt: new Date('2024-01-15T11:30:00'),
    },
  },
};

export const LongLocation: Story = {
  args: {
    job: {
      ...baseJob,
      jobNumber: '27',
      pickupLocation: 'Very Long Street Name That Should Truncate Properly in the Mobile Interface, Downtown Business District',
      destination: 'Another Very Long Address That Should Also Truncate Properly, Uptown Commercial Area',
    },
  },
};

export const NoDriverTruck: Story = {
  args: {
    job: {
      ...baseJob,
      jobNumber: '28',
      driverName: undefined,
      truckName: undefined,
    },
  },
};

export const Dispatched: Story = {
  args: {
    job: {
      ...baseJob,
      status: 'dispatched',
      priority: 'high',
      jobNumber: '29',
      description: 'Job dispatched to tower - awaiting acceptance',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Dispatched job card showing Accept and Decline buttons. Towers must accept or decline jobs in this status.',
      },
    },
  },
};
