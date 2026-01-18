"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ChevronRight, Search } from "lucide-react";
import { useAddressBook } from "@/hooks/user/useAddressBook";
import { AddContactDialog } from "@/components/profile/AddContactDialog";
import { Input } from "@/components/ui/input";

export const ContactsView = () => {
  const { contacts } = useAddressBook();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.address.toLowerCase().includes(term),
    );
  }, [contacts, searchTerm]);

  return (
    // REMOVED: min-h-[50vh]
    // KEPT: pb-20 to ensure the floating button doesn't cover the last item
    <div className="flex flex-col gap-5 pb-20">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
        <Input
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border-gray-200 rounded-2xl py-6 pl-11 pr-4 text-sm font-bold focus-visible:ring-[#8c8fff] focus-visible:border-[#8c8fff] transition-colors shadow-sm"
        />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="font-manrope font-extrabold text-gray-800 uppercase tracking-wide ml-1 text-sm">
          Saved Identities
        </h3>
        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
          {filteredContacts.length}
        </span>
      </div>

      {/* Contacts List */}
      {/* REMOVED: flex-1 (so it doesn't force expansion) */}
      <div className="bg-white rounded-3xl p-2 border border-gray-100 shadow-sm">
        {filteredContacts.length > 0 ? (
          <div className="flex flex-col">
            {filteredContacts.map((c) => (
              <div
                key={c.address}
                className="flex items-center gap-3 p-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors rounded-xl cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 relative shrink-0 border border-gray-100">
                  {c.avatar ? (
                    <Image
                      src={c.avatar}
                      alt={c.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-sm">
                      {c.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-[#1b1c23] truncate group-hover:text-[#8c8fff] transition-colors">
                    {c.name}
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 bg-gray-50 w-fit px-1.5 py-0.5 rounded-md mt-0.5">
                    {c.address.slice(0, 6)}...{c.address.slice(-4)}
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 grayscale opacity-50">
              <Image
                src="/images/profiles-mockup/profile-1.jpg"
                width={64}
                height={64}
                alt="Empty"
                className="opacity-50"
              />
            </div>
            <p className="text-sm font-bold text-gray-400">
              {searchTerm ? "No matches found" : "No contacts yet"}
            </p>
            <p className="text-xs text-gray-300 mt-1 max-w-50">
              {searchTerm
                ? "Try searching for a different name or address."
                : "Add friends to quickly select them in future disputes."}
            </p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="sticky bottom-4 z-20">
        <AddContactDialog variant="full" />
      </div>
    </div>
  );
};
