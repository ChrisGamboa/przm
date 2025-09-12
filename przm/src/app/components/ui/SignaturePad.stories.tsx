import type { Meta, StoryObj } from "@storybook/react";
import { SignaturePad } from "./SignaturePad";

const meta: Meta<typeof SignaturePad> = {
  title: "UI/SignaturePad",
  component: SignaturePad,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    onSignatureChange: { action: "signature-changed" },
    title: { control: "text" },
    subtitle: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SignaturePad>;

export const Default: Story = {
  args: {
    title: "Customer Signature",
    subtitle: "Please sign to authorize payment",
    required: true,
  },
};

export const ImpoundLotSignature: Story = {
  args: {
    title: "Impound Lot Representative",
    subtitle: "Confirm vehicle received in good condition",
    required: true,
  },
};

export const Optional: Story = {
  args: {
    title: "Optional Signature",
    subtitle: "Sign if you agree to additional terms",
    required: false,
  },
};

export const Disabled: Story = {
  args: {
    title: "Disabled Signature Pad",
    subtitle: "This signature pad is disabled",
    disabled: true,
  },
};

export const WithInitialSignature: Story = {
  args: {
    title: "Pre-filled Signature",
    subtitle: "This pad has an existing signature",
    initialSignature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
  },
};

export const Required: Story = {
  args: {
    title: "Required Signature",
    subtitle: "You must sign to continue",
    required: true,
  },
};

export const Mobile: Story = {
  args: {
    title: "Mobile Signature",
    subtitle: "Optimized for touch devices",
    required: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
