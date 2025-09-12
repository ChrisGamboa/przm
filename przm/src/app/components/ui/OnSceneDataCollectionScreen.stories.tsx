import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { OnSceneDataCollectionScreen } from './OnSceneDataCollectionScreen';
import { Job } from '@/app/types/job';

// Mock job data for stories
const mockJob: Job = {
  id: "job-123",
  jobNumber: "TW-2024-001",
  towerId: "tower-123",
  status: "on_scene",
  priority: "normal",
  customerName: "John Smith",
  customerPhone: "(555) 123-4567",
  vehicleMake: "Honda",
  vehicleModel: "Civic",
  vehicleYear: 2020,
  vehicleColor: "Silver",
  licensePlate: "ABC123",
  vin: "1HGBH41JXMN109186",
  pickupLocation: "123 Main St, Anytown, CA 90210",
  pickupLatitude: 34.0522,
  pickupLongitude: -118.2437,
  dropoffLocation: "456 Oak Ave, Nearby City, CA 90211",
  distance: "12.5 miles",
  estimatedTime: "45 minutes",
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T11:45:00Z",
  scheduledAt: "2024-01-15T12:00:00Z",
  estimatedCost: 150.00,
  description: "Vehicle broke down on the highway",
  driverName: "Mike Johnson",
  truckName: "Truck #7",
  tower: {
    firstName: "Mike",
    lastName: "Johnson",
    towCompany: "City Towing Services"
  }
};

const meta: Meta<typeof OnSceneDataCollectionScreen> = {
  title: 'Components/OnSceneDataCollectionScreen',
  component: OnSceneDataCollectionScreen,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        mobileLarge: {
          name: 'Mobile Large',
          styles: {
            width: '414px',
            height: '896px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
      },
      defaultViewport: 'mobile',
    },
  },
  args: {
    onBack: fn(),
    onSubmit: fn(),
  },
  argTypes: {
    job: {
      description: 'The job data to display',
    },
    onBack: {
      description: 'Function called when the back button is clicked',
    },
    onSubmit: {
      description: 'Function called when the form is submitted',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with complete job data
export const Default: Story = {
  args: {
    job: mockJob,
  },
};

// Story with minimal job data
export const MinimalJobData: Story = {
  args: {
    job: {
      ...mockJob,
      jobNumber: undefined,
      vehicleYear: undefined,
      vehicleColor: undefined,
      licensePlate: undefined,
      vin: undefined,
      description: undefined,
    },
  },
};

// Story with pre-filled VIN and license plate
export const PreFilledData: Story = {
  args: {
    job: {
      ...mockJob,
      vin: "1HGBH41JXMN109186",
      licensePlate: "ABC123",
    },
  },
};

// Story for different vehicle types
export const LargeVehicle: Story = {
  args: {
    job: {
      ...mockJob,
      vehicleMake: "Ford",
      vehicleModel: "F-150",
      vehicleYear: 2022,
      vehicleColor: "Blue",
      priority: "high",
    },
  },
};

export const LuxuryVehicle: Story = {
  args: {
    job: {
      ...mockJob,
      vehicleMake: "BMW",
      vehicleModel: "X5",
      vehicleYear: 2023,
      vehicleColor: "Black",
      priority: "urgent",
      estimatedCost: 300.00,
    },
  },
};

// Story for urgent priority job
export const UrgentJob: Story = {
  args: {
    job: {
      ...mockJob,
      priority: "urgent",
      description: "Vehicle blocking traffic - emergency tow needed",
    },
  },
};

// Story with long customer name and location
export const LongText: Story = {
  args: {
    job: {
      ...mockJob,
      customerName: "Alexander Benjamin Christopher",
      pickupLocation: "1234 Very Long Street Name That Might Wrap to Multiple Lines, Some Distant City, California 90210",
      dropoffLocation: "9876 Another Extremely Long Address That Could Cause Layout Issues, Far Away Town, California 90211",
    },
  },
};

// Mobile-specific stories
export const MobilePortrait: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
  args: {
    job: mockJob,
  },
};

export const MobileLandscape: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobileLarge',
    },
  },
  args: {
    job: mockJob,
  },
};

// Story demonstrating form validation
export const EmptyForm: Story = {
  args: {
    job: {
      ...mockJob,
      vin: "",
      licensePlate: "",
    },
  },
};

// Story with loading state simulation
export const LoadingState: Story = {
  args: {
    job: mockJob,
    onSubmit: async (data) => {
      // Simulate a longer loading time
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log('Submitted data:', data);
    },
  },
};

// Interactive story for testing form behavior
export const Interactive: Story = {
  args: {
    job: mockJob,
    onSubmit: async (data) => {
      console.log('Form submitted with data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert(`Data collected successfully!\nVIN: ${data.vin}\nLicense Plate: ${data.licensePlate}\nPhoto: ${data.vehiclePhoto ? 'Uploaded' : 'None'}\nNotes: ${data.notes || 'None'}`);
    },
    onBack: () => {
      console.log('Back button clicked');
      alert('Navigating back to job details');
    },
  },
};
