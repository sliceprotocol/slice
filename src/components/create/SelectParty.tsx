import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Search,
  Wallet,
  ChevronDown,
  Check,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { Contact } from "@/config/contacts";
import { useAddressBook } from "@/hooks/user/useAddressBook";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface Props {
  label: string;
  valueName: string;
  valueAddress: string;
  onChange: (name: string, address: string) => void;
}

export const SelectParty: React.FC<Props> = ({
  label,
  valueName,
  valueAddress,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // "Add Mode" state
  const [isAdding, setIsAdding] = useState(false);
  const [newAlias, setNewAlias] = useState("");

  // Use the hook
  const { contacts, addContact, removeContact } = useAddressBook();

  // Filter logic
  const filteredContacts = useMemo(() => {
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.address.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [contacts, searchTerm]);

  // Check if current search term is a valid raw address that ISN'T in contacts
  const isUnknownAddress = useMemo(() => {
    const isAddress = searchTerm.startsWith("0x") && searchTerm.length === 42;
    const isKnown = contacts.some(
      (c) => c.address.toLowerCase() === searchTerm.toLowerCase(),
    );
    return isAddress && !isKnown;
  }, [searchTerm, contacts]);

  const handleSelect = (contact: Contact) => {
    onChange(contact.name, contact.address);
    setIsOpen(false);
    setSearchTerm("");
    setIsAdding(false);
  };

  const handleSaveContact = () => {
    if (!newAlias) return;
    addContact(newAlias, searchTerm); // Use the address currently in search bar
    onChange(newAlias, searchTerm); // Select it immediately
    setIsAdding(false);
    setNewAlias("");
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-xs text-gray-500 uppercase tracking-wide">
        {label}
      </label>

      <Popover
        open={isOpen}
        onOpenChange={(v) => {
          setIsOpen(v);
          if (!v) setIsAdding(false); // Reset add mode on close
        }}
      >
        <PopoverTrigger asChild>
          <button
            className={cn(
              "flex items-center w-full bg-white border border-gray-100 rounded-2xl p-3 shadow-sm transition-all outline-none",
              "hover:border-gray-300 focus:ring-2 focus:ring-[#8c8fff]/20",
              isOpen && "border-[#8c8fff] ring-2 ring-[#8c8fff]/20",
            )}
          >
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 mr-3">
              <Wallet className="w-5 h-5 text-[#8c8fff]" />
            </div>
            <div className="flex-1 overflow-hidden text-left">
              {valueName || valueAddress ? (
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#1b1c23] truncate">
                    {valueName || "Unknown"}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 truncate">
                    {valueAddress}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-gray-400">
                  Select or paste address...
                </span>
              )}
            </div>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-gray-400 transition-transform",
                isOpen && "rotate-180",
              )}
            />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-[320px] p-0 rounded-2xl shadow-xl border-gray-100 overflow-hidden"
        >
          <div className="flex flex-col">
            {/* Search Header */}
            <div className="p-3 border-b border-gray-50 bg-white sticky top-0 z-10">
              {isAdding ? (
                // MODE: SAVE NEW CONTACT
                <div className="flex items-center gap-2 animate-in slide-in-from-right-2">
                  <input
                    autoFocus
                    className="bg-gray-50 rounded-xl px-3 py-2.5 text-sm outline-none w-full border border-blue-100 focus:border-blue-400"
                    placeholder="Enter alias name..."
                    value={newAlias}
                    onChange={(e) => setNewAlias(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveContact()}
                  />
                  <Button
                    size="icon"
                    className="h-10 w-10 shrink-0 rounded-xl bg-[#1b1c23]"
                    onClick={handleSaveContact}
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                // MODE: SEARCH
                <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    autoFocus
                    className="bg-transparent text-sm outline-none w-full placeholder:text-gray-400"
                    placeholder="Search alias or paste 0x..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      // Direct address paste logic still works for selection
                      if (
                        e.target.value.startsWith("0x") &&
                        e.target.value.length === 42
                      ) {
                        onChange("Unknown Alias", e.target.value);
                      }
                    }}
                  />
                </div>
              )}
            </div>

            {/* Content List */}
            <div className="max-h-[300px] overflow-y-auto p-1 bg-white">
              {/* If user p
asted a raw address, offer to save it */}
              {isUnknownAddress && !isAdding && (
                <button
                  onClick={() => setIsAdding(true)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors mb-1 text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold">Add to Contacts</div>
                    <div className="text-[10px] opacity-70 font-mono">
                      {searchTerm.slice(0, 8)}...
                    </div>
                  </div>
                </button>
              )}

              {filteredContacts.map((contact) => (
                <div
                  key={contact.address}
                  className="group flex items-center gap-1 p-1 rounded-xl hover:bg-[#F8F9FC] transition-colors"
                >
                  <button
                    onClick={() => handleSelect(contact)}
                    className="flex-1 flex items-center gap-3 p-1.5 text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold shrink-0 overflow-hidden relative">
                      {contact.avatar ? (
                        <Image
                          src={contact.avatar}
                          alt={contact.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        contact.name.charAt(0)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-gray-700 group-hover:text-[#1b1c23]">
                        {contact.name}
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono truncate max-w-[150px]">
                        {contact.address}
                      </div>
                    </div>
                    {valueAddress === contact.address && (
                      <Check className="w-4 h-4 text-green-500" />
                    )}
                  </button>

                  {/* Delete Button (Only appears on hover for non-system contacts) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeContact(contact.address);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Remove contact"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
