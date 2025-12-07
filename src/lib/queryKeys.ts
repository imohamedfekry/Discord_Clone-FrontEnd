/**
 * Centralized Query Keys Factory
 * 
 * Benefits:
 * - Type-safe query key references
 * - Easy cache invalidation
 * - Prevents key duplication bugs
 * - Single source of truth for all query keys
 * 
 * Usage:
 * - useQuery({ queryKey: queryKeys.auth.me, ... })
 * - queryClient.invalidateQueries({ queryKey: queryKeys.auth.me })
 */

export const queryKeys = {
    // Authentication & User queries
    auth: {
        // Current logged-in user
        me: ['auth', 'me'] as const,

        // Specific user by ID
        user: (id: string) => ['auth', 'user', id] as const,

        // All auth-related queries
        all: ['auth'] as const,
    },

    // Server/Guild queries
    servers: {
        all: ['servers'] as const,
        detail: (id: string) => ['servers', id] as const,
        members: (serverId: string) => ['servers', serverId, 'members'] as const,
        channels: (serverId: string) => ['servers', serverId, 'channels'] as const,
    },

    // Channel queries
    channels: {
        all: ['channels'] as const,
        detail: (id: string) => ['channels', id] as const,
        messages: (channelId: string) => ['channels', channelId, 'messages'] as const,
    },

    // Friends queries
    friends: {
        all: ['friends'] as const,
        list: ['friends', 'list'] as const,
        requests: ['friends', 'requests'] as const,
        online: ['friends', 'online'] as const,
        pending: ['friends', 'pending'] as const,
        blocked: ['friends', 'blocked'] as const,
    },

    // User Relations queries (extensible for different relation types)
    relations: {
        all: ['relations'] as const,
        blocked: ['relations', 'blocked'] as const,
        ignored: ['relations', 'ignored'] as const,
        muted: ['relations', 'muted'] as const,
    },

    // DM (Direct Message) queries
    dms: {
        all: ['dms'] as const,
        conversation: (userId: string) => ['dms', userId] as const,
        messages: (conversationId: string) => ['dms', conversationId, 'messages'] as const,
    },
} as const;
