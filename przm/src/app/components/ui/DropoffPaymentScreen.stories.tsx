import type { Meta, StoryObj } from "@storybook/react";
import { DropoffPaymentScreen } from "./DropoffPaymentScreen";
import type { Job } from "@/app/types/job";

const sampleJob: Job = {
  id: "job-123",
  jobNumber: "JOB-2024-001",
  towerId: "tower-1",
  status: "towing",
  priority: "normal",
  customerName: "John Smith",
  customerPhone: "(555) 123-4567",
  vehicleMake: "Toyota",
  vehicleModel: "Camry",
  vehicleYear: 2020,
  vehicleColor: "Silver",
  licensePlate: "ABC123",
  vin: "1HGBH41JXMN109186",
  vehiclePhotoUrl: "https://example.com/photo.jpg",
  pickupLocation: "123 Main St, Downtown",
  pickupLatitude: 40.7128,
  pickupLongitude: -74.0060,
  dropoffLocation: "City Impound Lot - 456 Industrial Blvd",
  dropoffLatitude: 40.7580,
  dropoffLongitude: -73.9855,
  distance: "5.2 miles",
  estimatedTime: "25 minutes",
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T14:45:00Z",
  scheduledAt: "2024-01-15T11:00:00Z",
  estimatedCost: 125.00,
  actualCost: 125.00,
  description: "Vehicle breakdown - engine trouble",
  driverName: "Mike Johnson",
  truckName: "Truck #3",
  tower: {
    firstName: "Mike",
    lastName: "Johnson",
    towCompany: "City Towing Services",
  },
};

const meta: Meta<typeof DropoffPaymentScreen> = {
  title: "UI/DropoffPaymentScreen",
  component: DropoffPaymentScreen,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onBack: { action: "back-clicked" },
    onComplete: { action: "payment-completed" },
    onReturnToJob: { action: "return-to-job-clicked" },
    isReadOnly: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof DropoffPaymentScreen>;

export const Default: Story = {
  args: {
    job: sampleJob,
  },
};

export const HighValueJob: Story = {
  args: {
    job: {
      ...sampleJob,
      estimatedCost: 450.00,
      actualCost: 450.00,
      vehicleMake: "BMW",
      vehicleModel: "X5",
      vehicleYear: 2023,
      description: "Luxury vehicle towing - special handling required",
      priority: "high",
    },
  },
};

export const LowValueJob: Story = {
  args: {
    job: {
      ...sampleJob,
      estimatedCost: 75.00,
      actualCost: 75.00,
      vehicleMake: "Honda",
      vehicleModel: "Civic",
      vehicleYear: 2015,
      description: "Standard towing service",
      priority: "low",
    },
  },
};

export const UrgentJob: Story = {
  args: {
    job: {
      ...sampleJob,
      priority: "urgent",
      estimatedCost: 200.00,
      actualCost: 200.00,
      description: "Emergency towing - blocking traffic",
      customerName: "Emergency Services",
    },
  },
};

export const CommercialVehicle: Story = {
  args: {
    job: {
      ...sampleJob,
      vehicleMake: "Ford",
      vehicleModel: "Transit",
      vehicleYear: 2022,
      estimatedCost: 175.00,
      actualCost: 175.00,
      customerName: "ABC Delivery Company",
      customerPhone: "(555) 987-6543",
      description: "Commercial van towing",
    },
  },
};

export const WithoutEstimatedCost: Story = {
  args: {
    job: {
      ...sampleJob,
      estimatedCost: undefined,
      actualCost: undefined,
    },
  },
};

export const LongCustomerName: Story = {
  args: {
    job: {
      ...sampleJob,
      customerName: "Maria Gonzalez-Rodriguez",
      vehicleMake: "Chevrolet",
      vehicleModel: "Silverado",
      dropoffLocation: "Metro City Impound Facility - 789 Long Industrial Boulevard, Warehouse District",
    },
  },
};

export const CompletedJobSummary: Story = {
  args: {
    job: {
      ...sampleJob,
      status: "completed",
      paymentMethod: "credit_card",
      paymentAmount: 125.00,
      paymentTransactionId: "txn_1234567890_abcdef123",
      dropoffNotes: "Vehicle delivered in good condition. Minor scratches on rear bumper noted.",
      completedAt: "2024-01-15T15:30:00Z",
      dropoffCompletedAt: "2024-01-15T15:15:00Z",
      paymentCompletedAt: "2024-01-15T15:30:00Z",
    },
    isReadOnly: true,
  },
};

export const Mobile: Story = {
  args: {
    job: sampleJob,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
