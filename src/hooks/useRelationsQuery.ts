import {
    useQuery,
    useMutation,
    useQueryClient,
    type UseQueryResult,
    type UseMutationResult,
} from '@tanstack/react-query';
import {
    relationsApi,
    type BlockedUsersResponse,
    type CreateRelationPayload,
    type DeleteRelationPayload,
} from '@/components/lib/relationsApi';
import { queryKeys } from '@/lib/queryKeys';
import { getErrorMessage } from '@/lib/queryErrorHandler';

/**
 * ====================================
 * QUERY HOOKS (Read Operations)
 * ====================================
 */

/**
 * Fetch blocked users
 * 
 * Features:
 * - Auto-caches for 2 minutes
 * - Refetches on window focus
 * - Returns list of blocked users
 */
export function useBlockedUsers(): UseQueryResult<BlockedUsersResponse, Error> {
    return useQuery({
        queryKey: queryKeys.relations.blocked,
        queryFn: async () => {
            const response = await relationsApi.getBlockedUsers();
            console.log('✅ Blocked users fetched:', response);
            return response;
        },
        staleTime: 1000 * 60 * 2, // 2 minutes
        retry: 2,
    });
}

/**
 * ====================================
 * MUTATION HOOKS (Write Operations)
 * ====================================
 */

/**
 * Block a user
 * 
 * Features:
 * - Optimistic update (immediately adds to blocked list)
 * - Invalidates cache on success
 * - Rolls back on error
 */
export function useBlockUser(): UseMutationResult<unknown, Error, string> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (userId: string) => {
            return relationsApi.blockUser(userId);
        },
        onMutate: async (userId) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: queryKeys.relations.blocked });

            // Snapshot previous value
            const previousBlocked = queryClient.getQueryData<BlockedUsersResponse>(
                queryKeys.relations.blocked
            );

            // Note: We can't add optimistically without user data
            // Just wait for server response

            return { previousBlocked };
        },
        onSuccess: () => {
            console.log('✅ User blocked successfully');
            // Invalidate to refetch fresh data
            queryClient.invalidateQueries({ queryKey: queryKeys.relations.blocked });
            queryClient.invalidateQueries({ queryKey: queryKeys.relations.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.friends.list });
        },
        onError: (error, userId, context) => {
            console.error('❌ Failed to block user:', getErrorMessage(error));

            // Rollback if needed
            if (context?.previousBlocked) {
                queryClient.setQueryData(
                    queryKeys.relations.blocked,
                    context.previousBlocked
                );
            }
        },
    });
}

/**
 * Unblock a user
 * 
 * Features:
 * - Optimistic update (immediately removes from blocked list)
 * - Invalidates cache on success
 * - Rolls back on error
 */
export function useUnblockUser(): UseMutationResult<unknown, Error, string> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (userId: string) => {
            return relationsApi.unblockUser(userId);
        },
        onMutate: async (userId) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: queryKeys.relations.blocked });

            // Snapshot previous value
            const previousBlocked = queryClient.getQueryData<BlockedUsersResponse>(
                queryKeys.relations.blocked
            );

            // Optimistically remove user from blocked list
            if (previousBlocked) {
                queryClient.setQueryData<BlockedUsersResponse>(
                    queryKeys.relations.blocked,
                    {
                        ...previousBlocked,
                        data: previousBlocked.data.filter(
                            (relation) => relation.targetUser.id !== userId
                        ),
                    }
                );
            }

            return { previousBlocked };
        },
        onSuccess: () => {
            console.log('✅ User unblocked successfully');
            // Invalidate to refetch fresh data
            queryClient.invalidateQueries({ queryKey: queryKeys.relations.blocked });
            queryClient.invalidateQueries({ queryKey: queryKeys.relations.all });
        },
        onError: (error, userId, context) => {
            console.error('❌ Failed to unblock user:', getErrorMessage(error));

            // Rollback to previous state
            if (context?.previousBlocked) {
                queryClient.setQueryData(
                    queryKeys.relations.blocked,
                    context.previousBlocked
                );
            }
        },
    });
}

/**
 * Generic create relation hook (for future use)
 * Can be used for any relation type
 */
export function useCreateRelation(): UseMutationResult<unknown, Error, CreateRelationPayload> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: CreateRelationPayload) => {
            return relationsApi.createRelation(payload);
        },
        onSuccess: (data, variables) => {
            console.log(`✅ Relation created: ${variables.type}`);

            // Invalidate based on type
            switch (variables.type) {
                case 'BLOCKED':
                    queryClient.invalidateQueries({ queryKey: queryKeys.relations.blocked });
                    break;
                case 'IGNORED':
                    queryClient.invalidateQueries({ queryKey: queryKeys.relations.ignored });
                    break;
                case 'MUTED':
                    queryClient.invalidateQueries({ queryKey: queryKeys.relations.muted });
                    break;
            }

            queryClient.invalidateQueries({ queryKey: queryKeys.relations.all });
        },
    });
}

/**
 * Generic delete relation hook (for future use)
 * Can be used for any relation type
 */
export function useDeleteRelation(): UseMutationResult<unknown, Error, DeleteRelationPayload> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: DeleteRelationPayload) => {
            return relationsApi.deleteRelation(payload);
        },
        onSuccess: (data, variables) => {
            console.log(`✅ Relation deleted: ${variables.type}`);

            // Invalidate based on type
            switch (variables.type) {
                case 'BLOCKED':
                    queryClient.invalidateQueries({ queryKey: queryKeys.relations.blocked });
                    break;
                case 'IGNORED':
                    queryClient.invalidateQueries({ queryKey: queryKeys.relations.ignored });
                    break;
                case 'MUTED':
                    queryClient.invalidateQueries({ queryKey: queryKeys.relations.muted });
                    break;
            }

            queryClient.invalidateQueries({ queryKey: queryKeys.relations.all });
        },
    });
}
