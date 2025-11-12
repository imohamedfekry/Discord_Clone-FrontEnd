"use client";
import ServersBar from "@/components/layout/ServersBar";
import TopBar from "@/components/layout/TopBar";
import React, { ReactNode } from "react";

interface ChannelsLayoutProps {
  children: ReactNode;
}

export default function ChannelsLayout({ children }: ChannelsLayoutProps) {
  return (
    <>
      <TopBar />
      <div className="flex flex-1 h-[calc(100vh-3rem)] overflow-hidden">
        {/* السيرفر بار على الشمال */}
        <ServersBar />

        {/* المحتوى الرئيسي */}
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
