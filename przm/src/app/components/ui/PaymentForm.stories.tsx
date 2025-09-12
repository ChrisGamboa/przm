import type { Meta, StoryObj } from "@storybook/react";
import { PaymentForm } from "./PaymentForm";

const meta: Meta<typeof PaymentForm> = {
  title: "UI/PaymentForm",
  component: PaymentForm,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    onPaymentMethodChange: { action: "payment-method-changed" },
    onCreditCardChange: { action: "credit-card-changed" },
    amount: { control: "number" },
    paymentMethod: { 
      control: "select",
      options: ["credit_card", "cash", "check"]
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof PaymentForm>;

export const Default: Story = {
  args: {
    amount: 125.00,
    paymentMethod: "credit_card",
  },
};

export const CashPayment: Story = {
  args: {
    amount: 89.50,
    paymentMethod: "cash",
  },
};

export const CheckPayment: Story = {
  args: {
    amount: 200.00,
    paymentMethod: "check",
  },
};

export const WithCreditCardData: Story = {
  args: {
    amount: 325.75,
    paymentMethod: "credit_card",
    creditCardData: {
      cardNumber: "4532 1234 5678 9012",
      expiryMonth: "12",
      expiryYear: "2027",
      cvv: "123",
      cardholderName: "John Doe",
    },
  },
};

export const HighAmount: Story = {
  args: {
    amount: 1250.00,
    paymentMethod: "credit_card",
  },
};

export const LowAmount: Story = {
  args: {
    amount: 45.25,
    paymentMethod: "cash",
  },
};

export const Disabled: Story = {
  args: {
    amount: 150.00,
    paymentMethod: "credit_card",
    disabled: true,
    creditCardData: {
      cardNumber: "4532 1234 5678 9012",
      expiryMonth: "12",
      expiryYear: "2027",
      cvv: "123",
      cardholderName: "John Doe",
    },
  },
};

export const Mobile: Story = {
  args: {
    amount: 95.00,
    paymentMethod: "credit_card",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
