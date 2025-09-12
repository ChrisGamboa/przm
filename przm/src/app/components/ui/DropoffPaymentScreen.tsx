"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { SignaturePad } from "@/app/components/ui/SignaturePad";
import { PaymentForm } from "@/app/components/ui/PaymentForm";
import { cn } from "@/app/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Car,
  MapPin,
  User,
  Phone,
  DollarSign,
  Clock,
  Truck,
  AlertTriangle,
  Receipt,
} from "lucide-react";
import type { Job } from "@/app/types/job";
import type { 
  DropoffPaymentStep, 
  DropoffPaymentFormData,
  PaymentMethod,
  CreditCardData,
  SignatureData 
} from "@/app/types/payment";

interface DropoffPaymentScreenProps {
  job: Job;
  onBack?: () => void;
  onComplete?: (data: DropoffPaymentFormData) => void;
  onReturnToJob?: () => void;
  isReadOnly?: boolean;
  className?: string;
}

export function DropoffPaymentScreen({
  job,
  onBack,
  onComplete,
  onReturnToJob,
  isReadOnly = false,
  className,
}: DropoffPaymentScreenProps) {
  const [currentStep, setCurrentStep] = useState<DropoffPaymentStep>(
    isReadOnly ? "completion" : "dropoff_confirmation"
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state - initialize with job data if in read-only mode
  const [impoundLotSignature, setImpoundLotSignature] = useState<string | null>(null);
  const [vehicleConditionNotes, setVehicleConditionNotes] = useState(
    isReadOnly ? (job.dropoffNotes || "") : ""
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    isReadOnly && job.paymentMethod ? (job.paymentMethod as PaymentMethod) : "credit_card"
  );
  const [creditCardData, setCreditCardData] = useState<CreditCardData>({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
  });
  const [customerSignature, setCustomerSignature] = useState<string | null>(null);
  const [finalNotes, setFinalNotes] = useState("");

  const steps: Array<{ id: DropoffPaymentStep; label: string; description: string }> = [
    { 
      id: "dropoff_confirmation", 
      label: "Dropoff Confirmation", 
      description: "Confirm vehicle delivery" 
    },
    { 
      id: "payment_processing", 
      label: "Payment Processing", 
      description: "Process payment and get authorization" 
    },
    { 
      id: "completion", 
      label: "Completion", 
      description: "Job completed successfully" 
    },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const canProceedFromDropoff = () => {
    return impoundLotSignature !== null;
  };

  const canProceedFromPayment = () => {
    if (paymentMethod === "credit_card") {
      return (
        customerSignature !== null &&
        creditCardData.cardNumber.trim() !== "" &&
        creditCardData.expiryMonth.trim() !== "" &&
        creditCardData.expiryYear.trim() !== "" &&
        creditCardData.cvv.trim() !== "" &&
        creditCardData.cardholderName.trim() !== ""
      );
    }
    return customerSignature !== null;
  };

  const handleNext = () => {
    if (currentStep === "dropoff_confirmation" && canProceedFromDropoff()) {
      setCurrentStep("payment_processing");
    } else if (currentStep === "payment_processing" && canProceedFromPayment()) {
      handleCompletePayment();
    }
  };

  const handleBack = () => {
    if (currentStep === "payment_processing") {
      setCurrentStep("dropoff_confirmation");
    } else if (currentStep === "dropoff_confirmation" && onBack) {
      onBack();
    }
  };

  const handleCompletePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const now = new Date().toISOString();
      
      const dropoffData: DropoffPaymentFormData = {
        dropoff: {
          impoundLotSignature: {
            dataUrl: impoundLotSignature!,
            timestamp: now,
            signatureType: "impound_lot",
          },
          vehicleConditionNotes,
          dropoffTimestamp: now,
        },
        payment: {
          method: paymentMethod,
          amount: job.estimatedCost || 0,
          creditCard: paymentMethod === "credit_card" ? creditCardData : undefined,
          transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        },
        customerSignature: {
          dataUrl: customerSignature!,
          timestamp: now,
          signatureType: "customer",
        },
        finalNotes,
      };

      setCurrentStep("completion");
      
      if (onComplete) {
        onComplete(dropoffData);
      }
    } catch (err) {
      setError("Failed to process payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderJobSummary = () => (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Car className="h-5 w-5" />
          Job Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{job.customerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{job.customerPhone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-gray-500" />
              <span>{job.vehicleYear} {job.vehicleMake} {job.vehicleModel}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-xs">{job.dropoffLocation || "Impound Lot"}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="font-medium text-green-600">
                {formatCurrency(job.estimatedCost || 0)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-gray-500" />
              <span>{job.driverName || "Driver"}</span>
            </div>
          </div>
        </div>
        
        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
          Job #{job.jobNumber}
        </Badge>
      </CardContent>
    </Card>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case "dropoff_confirmation":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Confirm Vehicle Delivery
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Please confirm that the vehicle has been delivered to the impound lot in good condition.
                  The impound lot representative should sign below to acknowledge receipt.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Important:</p>
                      <p>Inspect the vehicle for any damage before completing the signature. 
                         Note any pre-existing damage in the notes section below.</p>
                    </div>
                  </div>
                </div>

                <SignaturePad
                  title="Impound Lot Representative Signature"
                  subtitle="I confirm that the vehicle has been received in the condition noted"
                  onSignatureChange={setImpoundLotSignature}
                  required
                />

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Vehicle Condition Notes (Optional)
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    rows={3}
                    placeholder="Note any existing damage, missing items, or special conditions..."
                    value={vehicleConditionNotes}
                    onChange={(e) => setVehicleConditionNotes(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "payment_processing":
        return (
          <div className="space-y-6">
            <PaymentForm
              amount={job.estimatedCost || 0}
              paymentMethod={paymentMethod}
              creditCardData={creditCardData}
              onPaymentMethodChange={setPaymentMethod}
              onCreditCardChange={setCreditCardData}
            />

            <SignaturePad
              title="Customer Payment Authorization"
              subtitle="Customer signature authorizing payment for towing services"
              onSignatureChange={setCustomerSignature}
              required
            />

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Additional Notes (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                  rows={2}
                  placeholder="Any additional notes or special instructions..."
                  value={finalNotes}
                  onChange={(e) => setFinalNotes(e.target.value)}
                />
              </CardContent>
            </Card>
          </div>
        );

      case "completion":
        return (
          <div className="space-y-6">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="bg-green-100 p-3 rounded-full">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">
                      Job Completed Successfully!
                    </h3>
                    <p className="text-sm text-green-700 mt-2">
                      Payment has been processed and the vehicle has been delivered.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Completion Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Job Number:</span>
                      <span className="font-medium">#{job.jobNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium capitalize">
                        {paymentMethod.replace("_", " ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount Paid:</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(
                          isReadOnly && job.paymentAmount 
                            ? job.paymentAmount 
                            : (job.estimatedCost || 0)
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed At:</span>
                      <span className="font-medium">
                        {isReadOnly && job.completedAt 
                          ? formatTime(new Date(job.completedAt))
                          : formatTime(new Date())
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    </div>
                    {isReadOnly && job.paymentTransactionId && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transaction ID:</span>
                        <span className="font-medium text-xs">{job.paymentTransactionId}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={onReturnToJob}
                    variant="default"
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Return to Job Details
                  </Button>
                </div>
                <p className="text-center text-sm text-gray-500 mt-3">
                  The job has been successfully completed and payment processed.
                </p>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn("min-h-screen bg-gray-50 flex flex-col", className)}>
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">
                {isReadOnly ? "Completion Summary" : "Dropoff & Payment"}
              </h1>
              <p className="text-sm text-gray-600">
                {isReadOnly 
                  ? "View completed job details and payment information"
                  : "Complete vehicle delivery and process payment"
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      {!isReadOnly && (
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Step {currentStepIndex + 1} of {steps.length}</span>
                <span className="text-gray-600">{Math.round(progressPercentage)}% Complete</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={cn(
                      "flex flex-col items-center text-center flex-1",
                      index < currentStepIndex ? "text-green-600" : 
                      index === currentStepIndex ? "text-blue-600" : "text-gray-400"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mb-1",
                      index < currentStepIndex ? "bg-green-100 text-green-600" :
                      index === currentStepIndex ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
                    )}>
                      {index < currentStepIndex ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className="text-xs font-medium">{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        {renderJobSummary()}
        {renderStepContent()}

        {error && (
          <Card className="border-red-200 bg-red-50 mt-6">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer Actions */}
      {currentStep !== "completion" && (
        <div className="bg-white border-t shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {currentStep === "dropoff_confirmation" && "Complete the signature to proceed"}
                {currentStep === "payment_processing" && "Fill payment details and sign to complete"}
              </div>
              
              <Button
                onClick={handleNext}
                disabled={
                  isProcessing ||
                  (currentStep === "dropoff_confirmation" && !canProceedFromDropoff()) ||
                  (currentStep === "payment_processing" && !canProceedFromPayment())
                }
                className="flex items-center gap-2"
                size="lg"
              >
                {isProcessing ? (
                  "Processing..."
                ) : currentStep === "payment_processing" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Complete Payment
                  </>
                ) : (
                  <>
                    Next Step
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
