"use client";

import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { isAddress } from "viem";
import { X, Camera } from "lucide-react";
import { toast } from "sonner";

interface ScanContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (address: string) => void;
}

export function ScanContactModal({ isOpen, onClose, onScanSuccess }: ScanContactModalProps) {
  const [paused, setPaused] = useState(false);

  if (!isOpen) return null;

  const handleScan = (detectedCodes: any[]) => {
    if (paused) return;

    const rawValue = detectedCodes[0]?.rawValue;
    if (rawValue) {
      if (isAddress(rawValue)) {
        setPaused(true);
        // Small vibration for tactile feedback on mobile
        if (navigator.vibrate) navigator.vibrate(50); 
        onScanSuccess(rawValue);
      } else {
        // Optional: Error feedback, but careful not to spam
        // toast.error("Invalid address format");
      }
    }
  };

  const handleError = (error: unknown) => {
    console.error(error);
    toast.error("Camera access denied or not available");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1b1c23] flex flex-col items-center justify-center p-0">
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 bg-gradient-to-b from-black/50 to-transparent">
        <h2 className="text-white text-lg font-bold flex items-center gap-2">
          <Camera className="w-5 h-5" /> Scan QR
        </h2>
        <button 
          onClick={onClose}
          className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="w-full h-full relative">
        <Scanner 
          onScan={handleScan}
          onError={handleError}
          components={{ 
            onOff: false, 
            torch: true, 
            zoom: false,
            finder: false // We use our own custom overlay
          }}
          styles={{ 
            container: { width: "100%", height: "100%" },
            video: { objectFit: "cover" }
          }}
        />
        
        {/* Custom Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 border-[3px] border-white/80 rounded-[32px] shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] relative">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-[4px] border-l-[4px] border-[#8c8fff] rounded-tl-[10px] -mt-[3px] -ml-[3px]" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-[4px] border-r-[4px] border-[#8c8fff] rounded-tr-[10px] -mt-[3px] -mr-[3px]" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[4px] border-l-[4px] border-[#8c8fff] rounded-bl-[10px] -mb-[3px] -ml-[3px]" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[4px] border-r-[4px] border-[#8c8fff] rounded-br-[10px] -mb-[3px] -mr-[3px]" />
          </div>
        </div>
        
        <div className="absolute bottom-12 left-0 right-0 text-center z-10">
          <p className="text-white/80 font-medium bg-black/40 inline-block px-4 py-2 rounded-full backdrop-blur-md">
            Align QR code within the frame
          </p>
        </div>
      </div>
    </div>
  );
}
