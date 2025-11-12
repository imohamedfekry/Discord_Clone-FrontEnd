"use client";
import ServersBar from "@/components/layout/ServersBar";
import TopBar from "@/components/layout/TopBar";
import React, { ReactNode } from "react";

interface ChannelsLayoutProps {
  children: ReactNode;
}

export default function ChannelsLayout({ children }: ChannelsLayoutProps) {
  return (
    <div className="flex flex-col h-screen w-screen bg-[#121214] text-white">
      {/* شريط الأعلى */}
      <TopBar />

      {/* الحاوية الرئيسية */}
      <div className="flex flex-1 overflow-hidden">
        {/* شريط السيرفرات على اليسار */}
        <ServersBar />

        {/* المحتوى الرئيسي */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
