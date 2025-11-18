"use client";
import React from "react";
import DMChat from "@/components/channels/DMChat";

interface Props {
  params: {
    id: string;
  };
}

export default function DMChatPage({ params }: Props) {
  return <DMChat dmId={params.id} />;
}
