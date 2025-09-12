"use client";

import React from "react";
import { MapPin } from "lucide-react";

interface GoogleMapProps {
  pickupLocation: string;
  destination?: string;
  className?: string;
}

export function GoogleMap({ pickupLocation, destination, className }: GoogleMapProps) {
  // Create the Google Maps Embed URL
  const createMapUrl = () => {
    const baseUrl = "https://www.google.com/maps/embed/v1/directions";
    
     // Get Google Maps API key from environment variable
     const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (destination) {
      // Show directions from pickup to destination
      const params = new URLSearchParams({
        key: apiKey,
        origin: pickupLocation,
        destination: destination,
        mode: "driving",
      });
      return `${baseUrl}?${params.toString()}`;
    } else {
      // Show just the pickup location
      const placeUrl = "https://www.google.com/maps/embed/v1/place";
      const params = new URLSearchParams({
        key: apiKey,
        q: pickupLocation,
      });
      return `${placeUrl}?${params.toString()}`;
    }
  };

  // Fallback to a static map with location details if no API key
  const renderFallbackMap = () => (
    <div className="h-full bg-gradient-to-br from-slate-100 via-blue-50 to-green-50 relative overflow-hidden">
      {/* Map-like background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(90deg, #e5e7eb 1px, transparent 1px),
            linear-gradient(#e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>
      
      {/* Route visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Pickup marker */}
          <div className="absolute -top-8 -left-12 transform">
            <div className="bg-green-500 rounded-full p-2 shadow-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
              <div className="bg-white px-2 py-1 rounded shadow text-xs font-medium">A</div>
            </div>
          </div>
          
          {/* Route line */}
          {destination && (
            <div className="w-32 h-0.5 bg-blue-500 transform rotate-12"></div>
          )}
          
          {/* Destination marker */}
          {destination && (
            <div className="absolute -bottom-8 -right-12 transform">
              <div className="bg-red-500 rounded-full p-2 shadow-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                <div className="bg-white px-2 py-1 rounded shadow text-xs font-medium">B</div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Information overlay */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Route Information
          </h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Pickup:</span>
              <p className="font-medium text-gray-900 truncate">{pickupLocation}</p>
            </div>
            {destination && (
              <div>
                <span className="text-gray-600">Destination:</span>
                <p className="font-medium text-gray-900 truncate">{destination}</p>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            🗺️ Interactive map available with Google Maps API key
          </p>
        </div>
      </div>
    </div>
  );

  // Check if API key is configured
  const isApiKeyConfigured = Boolean(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

  if (!isApiKeyConfigured) {
    return (
      <div className={`${className} relative`}>
        {renderFallbackMap()}
      </div>
    );
  }

  return (
    <div className={`${className} relative`}>
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0, display: 'block' }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={createMapUrl()}
        title="Route Map"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
