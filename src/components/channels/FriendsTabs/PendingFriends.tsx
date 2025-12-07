"use client";

import React from "react";
import {
    useFriendRequests,
    useAcceptFriendRequest,
    useRejectFriendRequest,
    useCancelFriendRequest
} from "@/hooks/useFriendsQuery";

export default function PendingFriends() {
    // React Query hooks
    const { data, isLoading, error } = useFriendRequests();
    const acceptMutation = useAcceptFriendRequest();
    const rejectMutation = useRejectFriendRequest();
    const cancelMutation = useCancelFriendRequest();

    const incomingRequests = data?.data?.incoming || [];
    const outgoingRequests = data?.data?.outgoing || [];
    const hasRequests = incomingRequests.length > 0 || outgoingRequests.length > 0;

    const handleAcceptRequest = (requestId: string) => {
        acceptMutation.mutate(requestId);
    };

    const handleRejectRequest = (requestId: string) => {
        rejectMutation.mutate(requestId);
    };

    const handleCancelRequest = (requestId: string) => {
        cancelMutation.mutate(requestId);
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-(--text-primary) mx-auto mb-4"></div>
                    <p className="text-sm text-(--text-secondary)">Loading friend requests...</p>
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
                        Failed to load friend requests
                    </h2>
                    <p className="text-sm text-(--text-secondary)">
                        {error.message || "Something went wrong"}
                    </p>
                </div>
            </div>
        );
    }

    // Empty state
    if (!hasRequests) {
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
                        There are no pending friend requests.
                    </h2>
                    <p className="text-sm text-(--text-secondary) leading-relaxed">
                        Here's where you'll see incoming and outgoing friend requests.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Incoming Requests */}
            {incomingRequests.length > 0 && (
                <>
                    <div className="px-8 py-4">
                        <h3 className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wide">
                            Incoming — {incomingRequests.length}
                        </h3>
                    </div>
                    <div className="px-8">
                        {incomingRequests.map((request) => (
                            <div
                                key={request.id}
                                className="flex items-center gap-3 p-2 rounded-md hover:bg-(--background-modifier-hover) border-t border-(--border-normal) first:border-t-0"
                            >
                                <div className="w-8 h-8 rounded-full bg-(--background-modifier-accent) flex items-center justify-center">
                                    <span className="text-sm font-semibold text-(--text-primary)">
                                        {request.user.username?.[0]?.toUpperCase() || "?"}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-semibold text-(--text-primary)">
                                        {request.user.username}
                                    </div>
                                    <div className="text-xs text-(--text-secondary)">
                                        Incoming Friend Request
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleAcceptRequest(request.id)}
                                        disabled={acceptMutation.isPending}
                                        className="px-4 py-2 bg-(--status-success) hover:bg-(--status-success)/80 text-white rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {acceptMutation.isPending ? "..." : "Accept"}
                                    </button>
                                    <button
                                        onClick={() => handleRejectRequest(request.id)}
                                        disabled={rejectMutation.isPending}
                                        className="px-4 py-2 bg-(--status-danger) hover:bg-(--status-danger)/80 text-white rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {rejectMutation.isPending ? "..." : "Ignore"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Outgoing Requests */}
            {outgoingRequests.length > 0 && (
                <>
                    <div className="px-8 py-4">
                        <h3 className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wide">
                            Outgoing — {outgoingRequests.length}
                        </h3>
                    </div>
                    <div className="px-8">
                        {outgoingRequests.map((request) => (
                            <div
                                key={request.id}
                                className="flex items-center gap-3 p-2 rounded-md hover:bg-(--background-modifier-hover) border-t border-(--border-normal) first:border-t-0"
                            >
                                <div className="w-8 h-8 rounded-full bg-(--background-modifier-accent) flex items-center justify-center">
                                    <span className="text-sm font-semibold text-(--text-primary)">
                                        {request.user.username?.[0]?.toUpperCase() || "?"}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-semibold text-(--text-primary)">
                                        {request.user.username}
                                    </div>
                                    <div className="text-xs text-(--text-secondary)">
                                        Outgoing Friend Request
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleCancelRequest(request.id)}
                                    disabled={cancelMutation.isPending}
                                    className="px-4 py-2 bg-(--background-base-lowest) hover:bg-(--background-modifier-hover) text-(--text-secondary) rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {cancelMutation.isPending ? "..." : "Cancel"}
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
