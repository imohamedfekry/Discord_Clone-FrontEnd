import { apiClient } from "@/lib/apiClient";
import { endpoints } from "./endpoints";

/**
 * User Relation Types
 * Extensible for future relation types
 */
export type RelationType = "BLOCKED" | "IGNORED" | "MUTED" | "NOTE";

/**
 * User interface for relations
 */
export interface RelationUser {
    id: string;
    username: string;
    globalname?: string;
    avatar: string | null;
    status?: string;
}

/**
 * Relation interface (matches API response)
 */
export interface Relation {
    id: string;
    targetUser: RelationUser;  // API uses targetUser, not user
    note: string | null;
    createdAt: string;
    updatedAt: string;
}

/**
 * API Response for blocked users
 */
export interface BlockedUsersResponse {
    status: string;
    code: string;
    message: string;
    data: Relation[];  // Array directly, not nested in object
}

/**
 * Create relation payload
 */
export interface CreateRelationPayload {
    targetUserId: string;
    type: RelationType;
}

/**
 * Delete relation payload
 */
export interface DeleteRelationPayload {
    targetUserId: string;
    type: RelationType;
}

/**
 * Relations API Client
 * Handles all user relation operations (block, ignore, mute, etc.)
 */
export const relationsApi = {
    /**
     * Get all blocked users
     */
    async getBlockedUsers(): Promise<BlockedUsersResponse> {
        return apiClient.get<BlockedUsersResponse>(endpoints.relations.blocked);
    },

    /**
     * Create a relation (block, ignore, mute, etc.)
     * @param payload - Contains targetUserId and type
     */
    async createRelation(payload: CreateRelationPayload): Promise<unknown> {
        return apiClient.post(endpoints.relations.base, payload);
    },

    /**
     * Delete a relation (unblock, unignore, unmute, etc.)
     * @param payload - Contains targetUserId and type
     */
    async deleteRelation(payload: DeleteRelationPayload): Promise<unknown> {
        return apiClient.delete(endpoints.relations.base, {
            data: payload
        });
    },

    /**
     * Block a user (convenience method)
     * @param userId - The user ID to block
     */
    async blockUser(userId: string): Promise<unknown> {
        return this.createRelation({ targetUserId: userId, type: "BLOCKED" });
    },

    /**
     * Unblock a user (convenience method)
     * @param userId - The user ID to unblock
     */
    async unblockUser(userId: string): Promise<unknown> {
        return this.deleteRelation({ targetUserId: userId, type: "BLOCKED" });
    },

    // Future methods can be added here:
    // ignoreUser(userId: string)
    // unignoreUser(userId: string)
    // muteUser(userId: string)
    // unmuteUser(userId: string)
};
