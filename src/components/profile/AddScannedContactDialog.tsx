"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, Save, X } from "lucide-react";
import { AVAILABLE_AVATARS } from "@/config/app";
import { useAddressBook } from "@/hooks/user/useAddressBook";
import { cn } from "@/lib/utils";
import { shortenAddress } from "@/util/wallet";

interface AddScannedContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  scannedAddress: string;
}

export function AddScannedContactDialog({ 
  isOpen, 
  onClose, 
  scannedAddress 
}: AddScannedContactDialogProps) {
  const { addContact } = useAddressBook();
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(AVAILABLE_AVATARS[0]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name) return;
    addContact(name, scannedAddress, selectedAvatar);
    onClose();
    // Reset form
    setName("");
    setSelectedAvatar(AVAILABLE_AVATARS[0]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-[24px] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-extrabold text-[#1b1c23]">Add Contact</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">
              Wallet Address
            </label>
            <div className="w-full p-3 bg-gray-50 rounded-xl font-mono text-sm border border-gray-100">
              {shortenAddress(scannedAddress)}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">
              Alias / Name
            </label>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alice"
              className="w-full p-3 bg-gray-50 rounded-xl font-bold text-[#1b1c23] text-sm border border-transparent focus:bg-white focus:border-[#8c8fff] outline-none transition-all"
              autoFocus
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">
              Choose Avatar
            </label>
            <div className="grid grid-cols-4 gap-2">
              {AVAILABLE_AVATARS.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setSelectedAvatar(src)}
                  className={cn(
                    "relative w-full aspect-square rounded-xl shrink-0 border-2 transition-all overflow-hidden",
                    selectedAvatar === src
                      ? "border-[#8c8fff] scale-105 z-10 shadow-md"
                      : "border-transparent opacity-50 hover:opacity-100 bg-gray-50",
                  )}
                >
                  <Image
                    src={src}
                    alt="Avatar option"
                    fill
                    className="object-cover"
                  />
                  {selectedAvatar === src && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button 
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={!name}
              className="flex-1 py-3 bg-[#1b1c23] text-white rounded-xl font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
