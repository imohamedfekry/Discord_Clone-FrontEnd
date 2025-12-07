"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type FriendsTab = "all" | "online" | "pending" | "blocked" | "addFriend";

interface FriendsTabContextType {
    activeTab: FriendsTab;
    setActiveTab: (tab: FriendsTab) => void;
}

const FriendsTabContext = createContext<FriendsTabContextType | undefined>(undefined);

export function FriendsTabProvider({ children }: { children: ReactNode }) {
    const [activeTab, setActiveTab] = useState<FriendsTab>("online");

    return (
        <FriendsTabContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </FriendsTabContext.Provider>
    );
}

export function useFriendsTab() {
    const context = useContext(FriendsTabContext);
    if (!context) {
        throw new Error("useFriendsTab must be used within FriendsTabProvider");
    }
    return context;
}
