"use client";

import Image from "next/image";
import authBack from "@/components/assets/images/authBack.svg";
import { DiscordWithLetter } from "@/components/assets/icons/discrodlogo_Letter";

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
              <DiscordWithLetter className="w-[124px] h-6 text-white" />
      </div>

      {/* Page Content */}
      <div className="w-full z-10">
        {children}
      </div>
    </div>
  );
}
