"use client";

import React, { useRef, useEffect, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { cn } from "@/app/lib/utils";
import { RotateCcw, Check, Pen } from "lucide-react";

interface SignaturePadProps {
  title: string;
  subtitle?: string;
  onSignatureChange: (signature: string | null) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  initialSignature?: string;
}

export function SignaturePad({
  title,
  subtitle,
  onSignatureChange,
  className,
  required = false,
  disabled = false,
  initialSignature,
}: SignaturePadProps) {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    if (initialSignature && sigCanvas.current) {
      sigCanvas.current.fromDataURL(initialSignature);
      setIsEmpty(false);
      setHasSignature(true);
    }
  }, [initialSignature]);

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setIsEmpty(true);
      setHasSignature(false);
      onSignatureChange(null);
    }
  };

  const handleEnd = () => {
    if (sigCanvas.current) {
      const signatureData = sigCanvas.current.toDataURL();
      const isCanvasEmpty = sigCanvas.current.isEmpty();
      
      setIsEmpty(isCanvasEmpty);
      setHasSignature(!isCanvasEmpty);
      
      if (!isCanvasEmpty) {
        onSignatureChange(signatureData);
      } else {
        onSignatureChange(null);
      }
    }
  };

  const handleBegin = () => {
    // Called when user starts drawing
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Pen className="h-5 w-5" />
          {title}
          {required && <span className="text-red-500">*</span>}
        </CardTitle>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Signature Canvas */}
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg bg-white">
          <SignatureCanvas
            ref={sigCanvas}
            canvasProps={{
              className: "w-full h-40 md:h-48 rounded-lg",
              style: { background: 'white', pointerEvents: disabled ? 'none' : 'auto' }
            }}
            onEnd={handleEnd}
            onBegin={handleBegin}
            backgroundColor="white"
            penColor="black"
            minWidth={1}
            maxWidth={3}
            velocityFilterWeight={0.7}
            dotSize={1}
          />
          
          {/* Placeholder text when empty */}
          {isEmpty && !disabled && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center text-gray-400">
                <Pen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Please sign here</p>
              </div>
            </div>
          )}

          {/* Success indicator when signed */}
          {hasSignature && (
            <div className="absolute top-2 right-2 bg-green-100 text-green-700 p-1 rounded-full">
              <Check className="h-4 w-4" />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearSignature}
            disabled={disabled || isEmpty}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Clear
          </Button>
          
          {hasSignature && (
            <div className="flex items-center gap-2 text-sm text-green-600 ml-auto">
              <Check className="h-4 w-4" />
              Signature captured
            </div>
          )}
        </div>

        {/* Validation message */}
        {required && isEmpty && (
          <p className="text-sm text-red-500">
            Signature is required to proceed
          </p>
        )}
      </CardContent>
    </Card>
  );
}
