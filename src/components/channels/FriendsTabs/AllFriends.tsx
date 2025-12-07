"use client";

import React, { useState } from "react";
import { useFriends, useRemoveFriend } from "@/hooks/useFriendsQuery";
import type { Friend } from "@/components/lib/friendsApi";

export default function AllFriends() {
    const [searchQuery, setSearchQuery] = useState("");
    const { data, isLoading, error } = useFriends();
    const removeMutation = useRemoveFriend();

    const friends = data?.data?.friends || [];

    // Filter friends based on search
    const filteredFriends = friends.filter((friend) =>
        friend.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRemoveFriend = (userId: string, username: string) => {
        if (confirm(`Are you sure you want to remove ${username} from your friends?`)) {
            removeMutation.mutate(userId);
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-(--text-primary) mx-auto mb-4"></div>
                    <p className="text-sm text-(--text-secondary)">Loading friends...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-md px-4">
                    <div className="text-red-500 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-(--text-primary) mb-2">
                        Failed to load friends
                    </h2>
                    <p className="text-sm text-(--text-secondary)">
                        {error.message || "Something went wrong"}
                    </p>
                </div>
            </div>
        );
    }

    // Empty state
    if (!friends || friends.length === 0) {
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
                        Wumpus is waiting on friends.
                    </h2>
                    <p className="text-sm text-(--text-secondary) leading-relaxed">
                        No one's around to play with Wumpus. You can add friends with their Discord username.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Search Bar */}
            <div className="px-8 py-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 bg-(--background-base-low) text-(--text-primary) rounded-md text-sm placeholder:text-(--text-tertiary) focus:outline-none"
                    />
                </div>
            </div>

            {/* Header */}
            <div className="px-8 py-4">
                <h3 className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wide">
                    {searchQuery ? `Search Results — ${filteredFriends.length}` : `All Friends — ${friends.length}`}
                </h3>
            </div>

            {/* Friends List */}
            <div className="flex-1 overflow-y-auto px-8">
                {filteredFriends.length === 0 && searchQuery ? (
                    <div className="text-center py-8">
                        <p className="text-sm text-(--text-secondary)">No friends found matching "{searchQuery}"</p>
                    </div>
                ) : (
                    filteredFriends.map((friend: Friend) => (
                        <div
                            key={friend.id}
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-(--background-modifier-hover) cursor-pointer border-t border-(--border-normal) first:border-t-0"
                        >
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-8 h-8 rounded-full bg-(--background-modifier-accent) flex items-center justify-center">
                                    <span className="text-sm font-semibold text-(--text-primary)">
                                        {friend.username?.[0]?.toUpperCase() || "?"}
                                    </span>
                                </div>
                                <div
                                    className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-(--background-secondary) rounded-full ${friend.status === "ONLINE" ? "bg-(--status-success)" : "bg-(--status-idle)"
                                        }`}
                                />
                            </div>

                            {/* Friend Info */}
                            <div className="flex-1">
                                <div className="text-sm font-semibold text-(--text-primary)">{friend.username}</div>
                                <div className="text-xs text-(--text-secondary)">
                                    {friend.status === "ONLINE" ? "Online" : "Offline"}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <button
                                    title="Message"
                                    className="w-9 h-9 rounded-full bg-(--background-base-lowest) hover:bg-(--background-modifier-hover) flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 text-(--text-secondary)" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                                    </svg>
                                </button>
                                <button
                                    title="More"
                                    onClick={() => handleRemoveFriend(friend.id, friend.username)}
                                    disabled={removeMutation.isPending}
                                    className="w-9 h-9 rounded-full bg-(--background-base-lowest) hover:bg-(--status-danger) hover:text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {removeMutation.isPending ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                                    ) : (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
