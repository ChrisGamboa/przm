"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/app/lib/utils";
import { 
  CreditCard, 
  DollarSign, 
  Shield, 
  CheckCircle2, 
  AlertCircle,
  Banknote,
  FileText
} from "lucide-react";
import type { PaymentMethod, CreditCardData } from "@/app/types/payment";

interface PaymentFormProps {
  amount: number;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  onCreditCardChange: (cardData: CreditCardData) => void;
  paymentMethod: PaymentMethod;
  creditCardData?: CreditCardData;
  className?: string;
  disabled?: boolean;
}

export function PaymentForm({
  amount,
  onPaymentMethodChange,
  onCreditCardChange,
  paymentMethod,
  creditCardData,
  className,
  disabled = false,
}: PaymentFormProps) {
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    // Add spaces every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const validateCardNumber = (number: string) => {
    const digits = number.replace(/\s/g, "");
    return digits.length >= 13 && digits.length <= 19;
  };

  const validateExpiryMonth = (month: string) => {
    const monthNum = parseInt(month);
    return monthNum >= 1 && monthNum <= 12;
  };

  const validateExpiryYear = (year: string) => {
    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(year);
    return yearNum >= currentYear && yearNum <= currentYear + 10;
  };

  const validateCVV = (cvv: string) => {
    return cvv.length >= 3 && cvv.length <= 4;
  };

  const handleCardDataChange = (field: keyof CreditCardData, value: string) => {
    const newCardData = {
      ...creditCardData,
      [field]: value,
    } as CreditCardData;

    // Clear errors for this field
    const newErrors = { ...cardErrors };
    delete newErrors[field];

    // Validate the field
    switch (field) {
      case "cardNumber":
        if (!validateCardNumber(value)) {
          newErrors[field] = "Please enter a valid card number";
        }
        break;
      case "expiryMonth":
        if (!validateExpiryMonth(value)) {
          newErrors[field] = "Invalid month";
        }
        break;
      case "expiryYear":
        if (!validateExpiryYear(value)) {
          newErrors[field] = "Invalid year";
        }
        break;
      case "cvv":
        if (!validateCVV(value)) {
          newErrors[field] = "Invalid CVV";
        }
        break;
      case "cardholderName":
        if (value.trim().length < 2) {
          newErrors[field] = "Please enter cardholder name";
        }
        break;
    }

    setCardErrors(newErrors);
    onCreditCardChange(newCardData);
  };

  const paymentMethods: Array<{
    id: PaymentMethod;
    label: string;
    icon: React.ReactNode;
    description: string;
  }> = [
    {
      id: "credit_card",
      label: "Credit Card",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Pay with Visa, Mastercard, or American Express",
    },
    {
      id: "cash",
      label: "Cash",
      icon: <Banknote className="h-5 w-5" />,
      description: "Cash payment on site",
    },
    {
      id: "check",
      label: "Check",
      icon: <FileText className="h-5 w-5" />,
      description: "Payment by personal or company check",
    },
  ];

  const isFormValid = () => {
    if (paymentMethod === "credit_card") {
      return (
        creditCardData &&
        validateCardNumber(creditCardData.cardNumber) &&
        validateExpiryMonth(creditCardData.expiryMonth) &&
        validateExpiryYear(creditCardData.expiryYear) &&
        validateCVV(creditCardData.cvv) &&
        creditCardData.cardholderName.trim().length >= 2 &&
        Object.keys(cardErrors).length === 0
      );
    }
    return true; // Cash and check don't require additional validation
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Amount Display */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-green-700">Total Amount:</span>
            <span className="text-2xl font-bold text-green-800">
              {formatCurrency(amount)}
            </span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Payment Method</h3>
          <div className="grid gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => onPaymentMethodChange(method.id)}
                disabled={disabled}
                className={cn(
                  "flex items-start gap-3 p-4 border-2 rounded-lg text-left transition-colors",
                  "hover:border-blue-200 hover:bg-blue-50",
                  paymentMethod === method.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {method.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{method.label}</span>
                    {paymentMethod === method.id && (
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Credit Card Form */}
        {paymentMethod === "credit_card" && (
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>

            <div className="grid gap-4">
              {/* Card Number */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Card Number *
                </label>
                <Input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={creditCardData?.cardNumber || ""}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    if (formatted.replace(/\s/g, "").length <= 19) {
                      handleCardDataChange("cardNumber", formatted);
                    }
                  }}
                  disabled={disabled}
                  className={cn(
                    cardErrors.cardNumber ? "border-red-500" : ""
                  )}
                />
                {cardErrors.cardNumber && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {cardErrors.cardNumber}
                  </p>
                )}
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Month *
                  </label>
                  <Input
                    type="text"
                    placeholder="MM"
                    maxLength={2}
                    value={creditCardData?.expiryMonth || ""}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      handleCardDataChange("expiryMonth", value);
                    }}
                    disabled={disabled}
                    className={cn(
                      cardErrors.expiryMonth ? "border-red-500" : ""
                    )}
                  />
                  {cardErrors.expiryMonth && (
                    <p className="text-xs text-red-500 mt-1">
                      {cardErrors.expiryMonth}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Year *
                  </label>
                  <Input
                    type="text"
                    placeholder="YYYY"
                    maxLength={4}
                    value={creditCardData?.expiryYear || ""}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      handleCardDataChange("expiryYear", value);
                    }}
                    disabled={disabled}
                    className={cn(
                      cardErrors.expiryYear ? "border-red-500" : ""
                    )}
                  />
                  {cardErrors.expiryYear && (
                    <p className="text-xs text-red-500 mt-1">
                      {cardErrors.expiryYear}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    CVV *
                  </label>
                  <Input
                    type="text"
                    placeholder="123"
                    maxLength={4}
                    value={creditCardData?.cvv || ""}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      handleCardDataChange("cvv", value);
                    }}
                    disabled={disabled}
                    className={cn(
                      cardErrors.cvv ? "border-red-500" : ""
                    )}
                  />
                  {cardErrors.cvv && (
                    <p className="text-xs text-red-500 mt-1">
                      {cardErrors.cvv}
                    </p>
                  )}
                </div>
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Cardholder Name *
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={creditCardData?.cardholderName || ""}
                  onChange={(e) => handleCardDataChange("cardholderName", e.target.value)}
                  disabled={disabled}
                  className={cn(
                    cardErrors.cardholderName ? "border-red-500" : ""
                  )}
                />
                {cardErrors.cardholderName && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {cardErrors.cardholderName}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Payment Method Badge */}
        <div className="flex items-center justify-between pt-2">
          <Badge 
            variant={isFormValid() ? "default" : "secondary"}
            className="flex items-center gap-1"
          >
            {isFormValid() ? (
              <CheckCircle2 className="h-3 w-3" />
            ) : (
              <AlertCircle className="h-3 w-3" />
            )}
            {paymentMethod === "credit_card" ? "Credit Card" : 
             paymentMethod === "cash" ? "Cash Payment" : "Check Payment"}
          </Badge>
          
          {isFormValid() && (
            <span className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" />
              Ready to process
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
