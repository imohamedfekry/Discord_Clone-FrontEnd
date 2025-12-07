"use client";

import React, { useState } from "react";
import { apiClient } from "@/lib/apiClient";

export default function AddFriend() {
    const [username, setUsername] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username.trim()) {
            setStatus("error");
            setMessage("Please enter a username");
            return;
        }

        setStatus("loading");
        setMessage("");

        try {
            // Send friend request via API
            const response = await apiClient.post<{ message: string }>('/users/friends/request', {
                username: username.trim()
            });

            setStatus("success");
            setMessage(response?.message || `Friend request sent to ${username}!`);
            setUsername("");

            // Clear message after 3 seconds
            setTimeout(() => {
                setStatus("idle");
                setMessage("");
            }, 3000);
        } catch (error: any) {
            setStatus("error");
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                "Failed to send friend request";
            setMessage(errorMessage);
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <div className="px-8 py-6">
                <h2 className="text-base font-semibold text-(--text-primary) mb-2">
                    Add Friend
                </h2>
                <p className="text-sm text-(--text-secondary) mb-4">
                    You can add friends with their Discord username.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="rounded-lg bg-(--background-base-lowest) p-4">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="You can add friends with their Discord username."
                            className="w-full bg-transparent text-(--text-primary) placeholder:text-(--text-tertiary) focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-(--brand-primary) hover:bg-(--brand-primary-hover) text-white rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={!username.trim() || status === "loading"}
                    >
                        {status === "loading" ? "Sending..." : "Send Friend Request"}
                    </button>
                </form>

                {/* Status Message */}
                {(status === "success" || status === "error") && message && (
                    <div className={`mt-4 p-4 rounded-md ${status === "success"
                        ? "bg-(--status-success)/10 text-(--status-success)"
                        : "bg-(--status-danger)/10 text-(--status-danger)"
                        }`}>
                        {message}
                    </div>
                )}
            </div>

            {/* Tips Section */}
            <div className="px-8 py-6 border-t border-(--border-normal)">
                <h3 className="text-sm font-semibold text-(--text-primary) mb-3">
                    Other ways to add friends
                </h3>
                <div className="space-y-4">
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-(--brand-primary) flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-(--text-primary)">
                                If you're in a server together
                            </div>
                            <div className="text-xs text-(--text-secondary)">
                                Right click on their profile and select "Add Friend"
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-(--brand-primary) flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-(--text-primary)">
                                Share your username
                            </div>
                            <div className="text-xs text-(--text-secondary)">
                                Give your friends your username so they can add you
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
