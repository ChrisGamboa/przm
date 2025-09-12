import type { Meta, StoryObj } from '@storybook/react';
import { JobDetailsScreen } from './JobDetailsScreen';
import { Job } from '@/app/types/job';

const meta: Meta<typeof JobDetailsScreen> = {
  title: 'Components/JobDetailsScreen',
  component: JobDetailsScreen,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        component: 'A redesigned job details screen with a sticky bottom CTA button. The screen maximizes viewport usage with a prominent route map, efficient information hierarchy, and context-aware primary actions that remain accessible during scrolling.',
      },
    },
  },
  argTypes: {
    onBack: { action: 'back clicked' },
    onUpdateStatus: { action: 'status updated' },
    onCollectOnSceneData: { action: 'collect on-scene data clicked' },
    onProcessDropoff: { action: 'process dropoff clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const baseJob: Job = {
  id: "job-001",
  jobNumber: "TOW-2025-001",
  status: "en_route",
  priority: "normal",
  customerName: "John Smith",
  customerPhone: "(555) 123-4567",
  vehicleMake: "Honda",
  vehicleModel: "Civic",
  vehicleYear: 2020,
  vehicleColor: "Blue",
  licensePlate: "ABC-1234",
  vin: "1HGBH41JXMN109186",
  keysAvailable: true,
  pickupLocation: "123 Main St, San Francisco, CA 94102",
  destination: "456 Oak Ave, San Francisco, CA 94103",
  distance: "2.3 miles",
  estimatedTime: "15 mins",
  createdAt: new Date(2025, 8, 12, 10, 30),
  scheduledAt: new Date(2025, 8, 12, 11, 0),
  estimatedCost: 125.50,
  description: "Vehicle broke down on Main Street. Keys are with the customer.",
  driverName: "Mike Johnson",
  truckName: "Truck #7",
};

export const WaitingJob: Story = {
  args: {
    job: {
      ...baseJob,
      status: "waiting",
      driverName: undefined,
      truckName: undefined,
    },
  },
};

export const DispatchedJob: Story = {
  args: {
    job: {
      ...baseJob,
      status: "dispatched",
    },
  },
};

export const EnRouteJob: Story = {
  args: {
    job: {
      ...baseJob,
      status: "en_route",
    },
  },
};

export const OnSceneJob: Story = {
  args: {
    job: {
      ...baseJob,
      status: "on_scene",
      vin: undefined, // VIN not collected yet
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the On Scene status with a sticky bottom CTA button for data collection. The button remains visible while scrolling through job details, making the data collection action always accessible.',
      },
    },
  },
};

export const TowingJob: Story = {
  args: {
    job: {
      ...baseJob,
      status: "towing",
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the Towing status with a sticky bottom CTA button for dropoff processing. The button stays fixed at the bottom for easy access while reviewing job details.',
      },
    },
  },
};

export const CompletedJob: Story = {
  args: {
    job: {
      ...baseJob,
      status: "completed",
    },
  },
};

export const CancelledJob: Story = {
  args: {
    job: {
      ...baseJob,
      status: "cancelled",
    },
  },
};

export const UrgentPriorityJob: Story = {
  args: {
    job: {
      ...baseJob,
      priority: "urgent",
      status: "on_scene",
      description: "Emergency tow - vehicle blocking traffic on highway entrance ramp.",
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Urgent priority job in On Scene status with sticky CTA. The data collection button remains prominently visible at the bottom, emphasizing the critical next action regardless of scroll position.',
      },
    },
  },
};

export const MinimalInformationJob: Story = {
  args: {
    job: {
      ...baseJob,
      vehicleColor: undefined,
      licensePlate: undefined,
      vin: undefined,
      keysAvailable: undefined,
      destination: undefined,
      distance: undefined,
      estimatedTime: undefined,
      scheduledAt: undefined,
      estimatedCost: undefined,
      description: undefined,
      driverName: undefined,
      truckName: undefined,
      status: "waiting",
    },
  },
};

export const NoKeysAvailableJob: Story = {
  args: {
    job: {
      ...baseJob,
      keysAvailable: false,
      status: "on_scene",
      description: "Customer lost keys. Vehicle needs to be towed without keys.",
    },
  },
};

export const LongAddressesJob: Story = {
  args: {
    job: {
      ...baseJob,
      pickupLocation: "1234 Very Long Street Name That Goes On And On, San Francisco, CA 94102",
      destination: "5678 Another Extremely Long Address That Tests Text Wrapping, Oakland, CA 94601",
      description: "This is a very long description that tests how the component handles extended text content. The vehicle has multiple issues and requires special handling during the towing process.",
    },
  },
};

export const HighPriorityJobWithoutKeys: Story = {
  args: {
    job: {
      ...baseJob,
      priority: "high",
      status: "towing",
      keysAvailable: false,
      description: "High priority tow - vehicle needs to be moved immediately.",
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'High priority job in Towing status without keys. The sticky dropoff processing CTA button ensures the completion action is always accessible.',
      },
    },
  },
};
