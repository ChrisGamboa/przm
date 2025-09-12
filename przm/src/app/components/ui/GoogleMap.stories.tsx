import type { Meta, StoryObj } from '@storybook/react';
import { GoogleMap } from './GoogleMap';

const meta: Meta<typeof GoogleMap> = {
  title: 'Components/GoogleMap',
  component: GoogleMap,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A Google Maps component that displays directions between pickup and destination locations for towing jobs.',
      },
    },
  },
  argTypes: {
    pickupLocation: {
      control: 'text',
      description: 'The pickup location address',
    },
    destination: {
      control: 'text',
      description: 'The destination address (optional)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithDestination: Story = {
  args: {
    pickupLocation: "123 Main St, San Francisco, CA 94102",
    destination: "456 Oak Ave, San Francisco, CA 94103",
  },
  parameters: {
    docs: {
      description: {
        story: 'Map showing directions from pickup location to destination.',
      },
    },
  },
};

export const PickupOnly: Story = {
  args: {
    pickupLocation: "789 Pine St, San Francisco, CA 94108",
    destination: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Map showing only the pickup location when no destination is provided.',
      },
    },
  },
};

export const LongDistanceRoute: Story = {
  args: {
    pickupLocation: "San Francisco, CA",
    destination: "Los Angeles, CA",
  },
  parameters: {
    docs: {
      description: {
        story: 'Map showing a long-distance towing route between cities.',
      },
    },
  },
};

export const SpecificAddresses: Story = {
  args: {
    pickupLocation: "Golden Gate Bridge, San Francisco, CA",
    destination: "Alcatraz Island, San Francisco, CA",
  },
  parameters: {
    docs: {
      description: {
        story: 'Map showing route between specific landmarks.',
      },
    },
  },
};

export const InContainer: Story = {
  args: {
    pickupLocation: "1234 Market St, San Francisco, CA",
    destination: "567 Mission St, San Francisco, CA",
    className: "h-64 w-full border rounded-lg",
  },
  decorators: [
    (Story) => (
      <div className="p-4 bg-gray-100">
        <h3 className="text-lg font-semibold mb-4">Map in a container</h3>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Map displayed within a styled container with fixed height.',
      },
    },
  },
};
