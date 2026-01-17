"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

// Default set of avatars available in the public folder
export const PRESET_AVATARS = [
  "/images/profiles-mockup/profile-1.jpg",
  "/images/profiles-mockup/profile-2.jpg",
  "/images/profiles-mockup/profile-3.jpg",
  "/images/profiles-mockup/profile-4.jpg",
  "/images/profiles-mockup/profile-5.jpg",
  "/images/profiles-mockup/profile-6.jpg",
  "/images/profiles-mockup/profile-7.jpg",
  "/images/profiles-mockup/profile-8.jpg",
  "/images/profiles-mockup/profile-9.jpg",
  "/images/profiles-mockup/profile-10.jpg",
  "/images/profiles-mockup/profile-11.jpg",
  "/images/profiles-mockup/profile-12.jpg",
];

const STORAGE_KEY_PREFIX = "slice_profile_v1_";
const DEFAULT_NAME = "Anonymous Juror";

function getStoredProfile(address: string | undefined): {
  avatar: string;
  name: string;
} {
  if (!address) return { avatar: PRESET_AVATARS[0], name: DEFAULT_NAME };

  try {
    const key = `${STORAGE_KEY_PREFIX}${address.toLowerCase()}`;
    const stored = localStorage.getItem(key);

    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        avatar: parsed.avatar || PRESET_AVATARS[0],
        name: parsed.name || DEFAULT_NAME,
      };
    }
  } catch (_e) {
    console.error("Failed to load user profile");
  }

  return { avatar: PRESET_AVATARS[0], name: DEFAULT_NAME };
}

export function useUserProfile() {
  // Use wagmi's useAccount to get the current user's address for isolation
  const { address } = useAccount();

  // Initialize profile with current address
  const [avatar, setAvatar] = useState<string>(
    () => getStoredProfile(address).avatar,
  );
  const [name, setName] = useState<string>(
    () => getStoredProfile(address).name,
  );

  // Sync profile when address changes
  useEffect(() => {
    const profile = getStoredProfile(address);
    setAvatar((current) =>
      current !== profile.avatar ? profile.avatar : current,
    );
    setName((current) => (current !== profile.name ? profile.name : current));
  }, [address]);

  const updateAvatar = (newUrl: string) => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      setAvatar(newUrl);
      const key = `${STORAGE_KEY_PREFIX}${address.toLowerCase()}`;
      const currentData = JSON.parse(localStorage.getItem(key) || "{}");
      localStorage.setItem(
        key,
        JSON.stringify({ ...currentData, avatar: newUrl }),
      );

      toast.success("Profile updated");
    } catch (_e) {
      toast.error("Failed to save profile");
    }
  };

  const updateName = (newName: string) => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      setName(newName);
      const key = `${STORAGE_KEY_PREFIX}${address.toLowerCase()}`;
      const currentData = JSON.parse(localStorage.getItem(key) || "{}");
      localStorage.setItem(
        key,
        JSON.stringify({ ...currentData, name: newName }),
      );

      toast.success("Name updated");
    } catch (_e) {
      toast.error("Failed to save name");
    }
  };

  return {
    avatar,
    name,
    updateAvatar,
    updateName,
    availableAvatars: PRESET_AVATARS,
  };
}
