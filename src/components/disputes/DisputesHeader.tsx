import React from "react";
import ConnectButton from "../ConnectButton";
import Link from "next/link";

export const DisputesHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center w-full pt-8.5 px-5 overflow-hidden box-border">
      <Link href="/beexo">
        <img
          src="/images/icons/header-top.svg"
          alt="Header"
          className="h-12 w-12 object-contain block shrink max-w-[60%] cursor-pointer hover:opacity-80 transition-opacity"
        />
      </Link>

      <div className="flex items-center gap-3">
        <ConnectButton />
      </div>
    </div>
  );
};
