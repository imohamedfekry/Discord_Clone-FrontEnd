import { apiClient } from "@/lib/apiClient";
import { endpoints } from "./endpoints";

/**
 * Friend Request Types
 */
export interface FriendRequestUser {
    id: string;
    username: string;
    avatar: string | null;
}

export interface FriendRequest {
    id: string;
    user: FriendRequestUser;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
    createdAt: string;
}

export interface FriendRequestsResponse {
    status: string;
    code: string;
    message: string;
    data: {
        incoming: FriendRequest[];
        outgoing: FriendRequest[];
    };
}

/**
 * Friend Request Status Types
 */
export type FriendRequestStatus = "ACCEPTED" | "REJECTED";

/**
 * Friend (accepted friend) interface
 */
export interface Friend {
    id: string;
    username: string;
    globalname?: string;
    avatar: string | null;
    status?: string;
}

export interface FriendsListResponse {
    status: string;
    code: string;
    message: string;
    data: {
        friends: Friend[];
    };
}

/**
 * Friends API Client
 */
export const friendsApi = {
    /**
     * Get all friends
     */
    async getFriends(): Promise<FriendsListResponse> {
        return apiClient.get<FriendsListResponse>(endpoints.friends.list);
    },

    /**
     * Get all friend requests (incoming & outgoing)
     */
    async getRequests(): Promise<FriendRequestsResponse> {
        return apiClient.get<FriendRequestsResponse>(endpoints.friends.requests);
    },

    /**
     * Respond to a friend request (Accept or Reject)
     * @param friendshipId - The friendship ID from the request
     * @param status - 'ACCEPTED' or 'REJECTED'
     */
    async respondToRequest(friendshipId: string, status: FriendRequestStatus): Promise<unknown> {
        return apiClient.put(endpoints.friends.respond, {
            friendshipId,
            status
        });
    },

    /**
     * Cancel an outgoing friend request
     * @param friendshipId - The friendship ID from the request
     */
    async cancelRequest(friendshipId: string): Promise<unknown> {
        return apiClient.delete(endpoints.friends.cancel, {
            data: { friendshipId }
        });
    },

    /**
     * Remove a friend
     * @param userId - The user ID of the friend to remove
     */
    async removeFriend(userId: string): Promise<unknown> {
        return apiClient.delete(endpoints.friends.remove, {
            data: { userId }
        });
    },
};
