"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Separator } from "@/app/components/ui/separator";
import { 
  ArrowLeft,
  Car,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  User
} from "lucide-react";
import { Job } from "@/app/types/job";
import { cn } from "@/app/lib/utils";

interface OnSceneDataCollectionScreenProps {
  job: Job;
  onBack?: () => void;
  onSubmit?: (data: OnSceneData) => Promise<void>;
  className?: string;
}

interface OnSceneData {
  vin: string;
  licensePlate: string;
  vehiclePhoto: File | null;
  notes?: string;
}

export function OnSceneDataCollectionScreen({ 
  job, 
  onBack, 
  onSubmit,
  className 
}: OnSceneDataCollectionScreenProps) {
  const [formData, setFormData] = useState<OnSceneData>({
    vin: job.vin || "",
    licensePlate: job.licensePlate || "",
    vehiclePhoto: null,
    notes: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof OnSceneData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, vehiclePhoto: file }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
        setIsPhotoTaken(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetakePhoto = () => {
    setFormData(prev => ({ ...prev, vehiclePhoto: null }));
    setPhotoPreview(null);
    setIsPhotoTaken(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!formData.vin.trim() || !formData.licensePlate.trim() || !formData.vehiclePhoto) {
      alert("Please fill in all required fields and take a photo");
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Fallback behavior for Storybook or testing
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert("Data collected successfully! (Demo mode)");
        
        if (onBack) {
          onBack();
        }
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.vin.trim() && formData.licensePlate.trim() && formData.vehiclePhoto;

  return (
    <div className={cn("min-h-screen bg-gray-50 safe-area-inset", className)}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack || (() => {
                // Fallback navigation for Storybook or testing
                if (typeof window !== "undefined") {
                  window.location.href = `/jobs/${job.id}`;
                }
              })}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-semibold text-gray-900 truncate">
                On-Scene Data Collection
              </h1>
              <p className="text-sm text-gray-500 truncate">
                Job #{job.jobNumber || job.id.slice(0, 8)}
              </p>
            </div>
            <Badge
              variant="outline"
              className="shrink-0 bg-blue-50 text-blue-700 border-blue-200"
            >
              On Scene
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto p-4 pb-24">
        {/* Job Info Card */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Car className="h-5 w-5 text-blue-600" />
              Vehicle Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Vehicle:</span>
              <span className="text-sm font-medium">
                {job.vehicleYear} {job.vehicleMake} {job.vehicleModel}
              </span>
            </div>
            {job.vehicleColor && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Color:</span>
                <span className="text-sm font-medium">{job.vehicleColor}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Customer:</span>
              <span className="text-sm font-medium">{job.customerName}</span>
            </div>
          </CardContent>
        </Card>

        {/* Data Collection Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* VIN Input */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-green-600" />
                Vehicle Identification Number (VIN)
                <span className="text-red-500 text-sm">*</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="text"
                placeholder="Enter 17-character VIN"
                value={formData.vin}
                onChange={(e) => handleInputChange("vin", e.target.value.toUpperCase())}
                maxLength={17}
                className="text-base font-mono tracking-wider"
                autoComplete="off"
              />
              <p className="text-xs text-gray-500 mt-2">
                Usually found on driver's side dashboard or door frame
              </p>
            </CardContent>
          </Card>

          {/* License Plate Input */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-green-600" />
                License Plate Number
                <span className="text-red-500 text-sm">*</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="text"
                placeholder="Enter license plate number"
                value={formData.licensePlate}
                onChange={(e) => handleInputChange("licensePlate", e.target.value.toUpperCase())}
                className="text-base font-mono tracking-wider"
                autoComplete="off"
              />
              <p className="text-xs text-gray-500 mt-2">
                Verify this matches the vehicle's current plate
              </p>
            </CardContent>
          </Card>

          {/* Photo Capture */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                Vehicle Photo
                <span className="text-red-500 text-sm">*</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isPhotoTaken ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-4">
                      Take a clear photo of the vehicle showing license plate and overall condition
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handlePhotoCapture}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                      size="lg"
                    >
                      <MapPin className="h-5 w-5 mr-2" />
                      Take Photo
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden border">
                    <img
                      src={photoPreview!}
                      alt="Vehicle photo"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Photo Captured
                      </Badge>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleRetakePhoto}
                    className="w-full"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Retake Photo
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-gray-600" />
                Additional Notes (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                placeholder="Any additional observations about the vehicle condition, location, or situation..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md text-base resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-2">
                {formData.notes?.length || 0}/500 characters
              </p>
            </CardContent>
          </Card>
        </form>
      </div>

      {/* Fixed Bottom Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg safe-area-inset-bottom">
        <div className="max-w-lg mx-auto p-4">
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className="w-full h-12 text-base"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Clock className="h-5 w-5 mr-2 animate-spin" />
                Submitting Data...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Complete Data Collection
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
