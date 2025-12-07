"use client";

import React from "react";
import { useAppSelector } from "@/store/hooks";
import { selectFriends } from "@/store/selectors";
import { User } from "@/types/models";

export default function OnlineFriends() {
    const friends = useAppSelector(selectFriends);

    // Filter only online friends (ONLINE, IDLE, DND)
    const onlineFriends = friends.filter((friend: User) =>
        friend.status === "ONLINE" || friend.status === "IDLE" || friend.status === "DND"
    );

    if (onlineFriends.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-md px-4">
                    <div className="mb-4">
                        <svg
                            className="w-32 h-32 mx-auto text-(--text-tertiary)"
                            viewBox="0 0 200 200"
                            fill="currentColor"
                        >
                            <path d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zm0 180c-44.1 0-80-35.9-80-80S55.9 20 100 20s80 35.9 80 80-35.9 80-80 80z" />
                            <circle cx="70" cy="70" r="12" />
                            <circle cx="130" cy="70" r="12" />
                            <path d="M100 120c-20 0-35-10-40-20h80c-5 10-20 20-40 20z" />
                        </svg>
                    </div>
                    <h2 className="text-[22px] font-semibold text-(--text-primary) mb-2">
                        No one's online right now
                    </h2>
                    <p className="text-sm text-(--text-secondary) leading-relaxed">
                        None of your friends are online at the moment.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <div className="px-8 py-4">
                <h3 className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wide">
                    Online — {onlineFriends.length}
                </h3>
            </div>
            <div className="flex-1 overflow-y-auto px-8">
                {onlineFriends.map((friend: User) => (
                    <div
                        key={friend.id}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-(--background-modifier-hover) cursor-pointer"
                    >
                        <div className="relative">
                            <div className="w-8 h-8 rounded-full bg-(--background-modifier-accent) flex items-center justify-center">
                                <span className="text-sm font-semibold text-(--text-primary)">
                                    {friend.username?.[0]?.toUpperCase() || "?"}
                                </span>
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-(--status-success) border-2 border-(--background-secondary) rounded-full" />
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-semibold text-(--text-primary)">{friend.username}</div>
                            <div className="text-xs text-(--text-secondary)">
                                {friend.status === "ONLINE" ? "Online" : friend.status}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
