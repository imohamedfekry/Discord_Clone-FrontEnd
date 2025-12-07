"use client";

import React from "react";
import { useBlockedUsers, useUnblockUser } from "@/hooks/useRelationsQuery";
import type { Relation } from "@/components/lib/relationsApi";

export default function BlockedUsers() {
    const { data, isLoading, error } = useBlockedUsers();
    const unblockMutation = useUnblockUser();

    const blockedUsers = data?.data || [];  // data is array directly

    const handleUnblock = (userId: string, username: string) => {
        if (confirm(`Are you sure you want to unblock ${username}?`)) {
            unblockMutation.mutate(userId);
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-(--text-primary) mx-auto mb-4"></div>
                    <p className="text-sm text-(--text-secondary)">Loading blocked users...</p>
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
                        Failed to load blocked users
                    </h2>
                    <p className="text-sm text-(--text-secondary)">
                        {error.message || "Something went wrong"}
                    </p>
                </div>
            </div>
        );
    }

    // Empty state
    if (blockedUsers.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-md px-4">
                    <h2 className="text-[17px] font-semibold text-(--text-primary) mb-2">
                        You can't unblock the Wumpus.
                    </h2>
                    <p className="text-sm text-(--text-secondary) leading-relaxed">
                        You haven't blocked anyone yet.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="px-8 py-4">
                <h3 className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wide">
                    Blocked — {blockedUsers.length}
                </h3>
            </div>

            {/* Blocked Users List */}
            <div className="flex-1 overflow-y-auto px-8">
                {blockedUsers.map((relation: Relation) => (
                    <div
                        key={relation.id}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-(--background-modifier-hover) border-t border-(--border-normal) first:border-t-0"
                    >
                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-full bg-(--background-modifier-accent) flex items-center justify-center">
                            <span className="text-sm font-semibold text-(--text-primary)">
                                {relation.targetUser.username?.[0]?.toUpperCase() || "?"}
                            </span>
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <div className="text-sm font-semibold text-(--text-primary)">
                                {relation.targetUser.username}
                            </div>
                            {relation.targetUser.globalname && (
                                <div className="text-xs text-(--text-secondary)">
                                    {relation.targetUser.globalname}
                                </div>
                            )}
                        </div>

                        {/* Unblock Button */}
                        <button
                            onClick={() => handleUnblock(relation.targetUser.id, relation.targetUser.username)}
                            disabled={unblockMutation.isPending}
                            className="px-4 py-2 bg-(--status-danger) hover:bg-(--status-danger)/80 text-white rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {unblockMutation.isPending ? "..." : "Unblock"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
