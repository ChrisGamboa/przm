export type PaymentMethod = "credit_card" | "cash" | "check";

export type PaymentStatus = "pending" | "processing" | "completed" | "failed";

export interface CreditCardData {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
}

export interface PaymentData {
  method: PaymentMethod;
  amount: number;
  creditCard?: CreditCardData;
  transactionId?: string;
}

export interface SignatureData {
  dataUrl: string; // Base64 encoded signature image
  timestamp: string;
  signatureType: "customer" | "impound_lot";
}

export interface DropoffData {
  impoundLotSignature: SignatureData;
  vehicleConditionNotes?: string;
  dropoffTimestamp: string;
}

export interface DropoffPaymentFormData {
  dropoff: DropoffData;
  payment: PaymentData;
  customerSignature: SignatureData;
  finalNotes?: string;
}

// Workflow step types
export type DropoffPaymentStep = "dropoff_confirmation" | "payment_processing" | "completion";

export interface DropoffPaymentState {
  currentStep: DropoffPaymentStep;
  dropoffData?: DropoffData;
  paymentData?: PaymentData;
  customerSignature?: SignatureData;
  isProcessing: boolean;
  error?: string;
}
