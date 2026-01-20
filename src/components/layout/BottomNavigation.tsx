"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Home, Gavel } from "lucide-react";

export const BottomNavigation = () => {
  const pathname = usePathname();

  // 1. Define paths where we want to HIDE the global navigation
  const hideOnPaths = [
    "/disputes/", // Hide on all nested dispute routes (e.g., /disputes/1/vote)
    "/juror/stake",
    "/juror/assign",
    "/juror/assigned",
  ];

  // Check if current path starts with any of the hidden paths
  // Special case: don't hide on /disputes (list page) or /disputes/create
  const shouldHide = hideOnPaths.some((path) => {
    if (path === "/disputes/") {
      // Hide on /disputes/[id]/* but not on /disputes or /disputes/create
      return pathname?.startsWith("/disputes/") && 
             pathname !== "/disputes/create" &&
             /^\/disputes\/\d+/.test(pathname);
    }
    return pathname?.startsWith(path);
  });

  if (shouldHide) return null;

  const isHome = pathname === "/" || pathname === "/disputes";
  const isVotes = pathname?.startsWith("/juror/tasks");
  const isProfile = pathname?.startsWith("/profile");

  const navItemClass = (isActive: boolean) =>
    `flex flex-col items-center justify-center gap-1 transition-all duration-300 relative group ${
      isActive ? "text-[#8c8fff]" : "text-gray-400 hover:text-[#8c8fff]"
    }`;

  const iconClass = (isActive: boolean) =>
    `w-5 h-5 ${isActive ? "stroke-[2.5px] fill-[#8c8fff]/20" : "stroke-2"}`;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100]">
      <div className="flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm border border-gray-100/50 rounded-full shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all hover:shadow-[0_6px_25px_rgb(0,0,0,0.1)]">
        {/* Disputes / Home */}
        <Link href="/disputes" className={navItemClass(isHome)}>
          <div
            className={`p-2 transition-transform duration-200 ${isHome ? "scale-105" : "group-hover:scale-105"}`}
          >
            <Home className={iconClass(isHome)} />
          </div>
        </Link>

        {/* Vertical Divider */}
        <div className="w-px h-4 bg-gray-200 mx-2" />

        {/* Juror Tasks */}
        <Link href="/juror/tasks" className={navItemClass(isVotes)}>
          <div
            className={`p-2 transition-transform duration-200 ${isVotes ? "scale-105" : "group-hover:scale-105"}`}
          >
            <Gavel className={iconClass(isVotes)} />
          </div>
        </Link>

        {/* Vertical Divider */}
        <div className="w-px h-4 bg-gray-200 mx-2" />

        {/* Profile */}
        <Link href="/profile" className={navItemClass(isProfile)}>
          <div
            className={`p-2 transition-transform duration-200 ${isProfile ? "scale-105" : "group-hover:scale-105"}`}
          >
            <User className={iconClass(isProfile)} />
          </div>
        </Link>
      </div>
    </div>
  );
};
