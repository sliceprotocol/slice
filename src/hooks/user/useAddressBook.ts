"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { PRELOADED_CONTACTS, Contact } from "@/config/contacts";

const STORAGE_KEY = "slice_address_book_v1";

export function useAddressBook() {
  // Initialize with System contacts
  const [contacts, setContacts] = useState<Contact[]>(PRELOADED_CONTACTS);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge: System Contacts + User Contacts (Deduplicated by address)
        const combined = [...PRELOADED_CONTACTS, ...parsed].filter(
          (contact, index, self) =>
            index ===
            self.findIndex(
              (c) => c.address.toLowerCase() === contact.address.toLowerCase(),
            ),
        );
        setContacts(combined);
      }
    } catch (e) {
      console.error("Failed to load address book", e);
    }
  }, []);

  const addContact = (name: string, address: string, avatar?: string) => {
    if (!name || !address) return;

    const newContact: Contact = { name, address, avatar };

    setContacts((prev) => {
      // Avoid duplicates
      const others = prev.filter(
        (c) => c.address.toLowerCase() !== address.toLowerCase(),
      );
      const updated = [...others, newContact]; // Add new to end

      // Persist ONLY user contacts (filter out system ones to save space)
      const userContacts = updated.filter(
        (c) => !PRELOADED_CONTACTS.some((pc) => pc.address === c.address),
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userContacts));

      return updated;
    });

    toast.success(`Saved "${name}" to contacts`);
  };

  const removeContact = (address: string) => {
    // Prevent deleting system contacts
    if (
      PRELOADED_CONTACTS.some(
        (c) => c.address.toLowerCase() === address.toLowerCase(),
      )
    ) {
      toast.error("Cannot delete system contact.");
      return;
    }

    setContacts((prev) => {
      const updated = prev.filter(
        (c) => c.address.toLowerCase() !== address.toLowerCase(),
      );

      const userContacts = updated.filter(
        (c) => !PRELOADED_CONTACTS.some((pc) => pc.address === c.address),
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userContacts));

      return updated;
    });

    toast.success("Contact removed");
  };

  return { contacts, addContact, removeContact };
}
