"use client";

import Image from "next/image";
import authBack from "@/components/assets/images/authBack.svg";
import discordWithLetter from "@/components/assets/icons/discrodlogo_Letter.svg";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden select-none bg-(--bg-primary)">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-80">
        <Image
          src={authBack}
          alt="Auth Background"
          fill
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Discord Logo */}
      <div className="absolute top-8 left-8 z-20">
        <Image
          src={discordWithLetter}
          alt="Discord Logo"
          width={140}
          height={140}
          draggable={false}
        />
      </div>

      {/* Page Content */}
      <div className="w-full z-10">
        {children}
      </div>
    </div>
  );
}
