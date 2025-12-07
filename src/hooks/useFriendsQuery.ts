import {
    useQuery,
    useMutation,
    useQueryClient,
    type UseQueryResult,
    type UseMutationResult,
} from '@tanstack/react-query';
import {
    friendsApi,
    type FriendRequestsResponse,
    type FriendsListResponse,
    type FriendRequestStatus
} from '@/components/lib/friendsApi';
import { queryKeys } from '@/lib/queryKeys';
import { getErrorMessage } from '@/lib/queryErrorHandler';

/**
 * ====================================
 * QUERY HOOKS (Read Operations)
 * ====================================
 */

/**
 * Fetch friend requests (incoming & outgoing)
 * 
 * Features:
 * - Auto-caches for 30 seconds (requests change frequently)
 * - Refetches on window focus
 * - Returns structured data with incoming/outgoing arrays
 */
export function useFriendRequests(): UseQueryResult<FriendRequestsResponse, Error> {
    return useQuery({
        queryKey: queryKeys.friends.requests,
        queryFn: async () => {
            const response = await friendsApi.getRequests();
            console.log('✅ Friend requests fetched:', response);
            return response;
        },
        staleTime: 1000 * 30, // 30 seconds - requests change frequently
        retry: 2,
    });
}

/**
 * Fetch all friends
 * 
 * Features:
 * - Auto-caches for 2 minutes
 * - Refetches on window focus
 * - Returns list of accepted friends
 */
export function useFriends(): UseQueryResult<FriendsListResponse, Error> {
    return useQuery({
        queryKey: queryKeys.friends.list,
        queryFn: async () => {
            const response = await friendsApi.getFriends();
            console.log('✅ Friends list fetched:', response);
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

interface RespondToRequestParams {
    friendshipId: string;
    status: FriendRequestStatus;
}

/**
 * Respond to a friend request (Accept or Reject)
 * 
 * Features:
 * - Optimistic update (immediately updates UI)
 * - Invalidates requests cache on success
 * - Rolls back on error
 */
export function useRespondToFriendRequest(): UseMutationResult<unknown, Error, RespondToRequestParams> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ friendshipId, status }: RespondToRequestParams) => {
            return friendsApi.respondToRequest(friendshipId, status);
        },
        onMutate: async ({ friendshipId, status }) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: queryKeys.friends.requests });

            // Snapshot previous value
            const previousRequests = queryClient.getQueryData<FriendRequestsResponse>(
                queryKeys.friends.requests
            );

            // Optimistically update - remove from incoming
            if (previousRequests) {
                queryClient.setQueryData<FriendRequestsResponse>(
                    queryKeys.friends.requests,
                    {
                        ...previousRequests,
                        data: {
                            ...previousRequests.data,
                            incoming: previousRequests.data.incoming.filter(
                                (req) => req.id !== friendshipId
                            ),
                        },
                    }
                );
            }

            // Return context with snapshot
            return { previousRequests };
        },
        onSuccess: (data, { status }) => {
            console.log(`✅ Friend request ${status === 'ACCEPTED' ? 'accepted' : 'rejected'}`);
            // Invalidate to refetch fresh data
            queryClient.invalidateQueries({ queryKey: queryKeys.friends.requests });
            queryClient.invalidateQueries({ queryKey: queryKeys.friends.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.friends.list });
        },
        onError: (error, variables, context) => {
            console.error('❌ Failed to respond to friend request:', getErrorMessage(error));

            // Rollback to previous state
            if (context?.previousRequests) {
                queryClient.setQueryData(
                    queryKeys.friends.requests,
                    context.previousRequests
                );
            }
        },
    });
}

/**
 * Accept a friend request (convenience wrapper)
 */
export function useAcceptFriendRequest(): UseMutationResult<unknown, Error, string> {
    const respondMutation = useRespondToFriendRequest();

    return {
        ...respondMutation,
        mutate: (friendshipId: string) => {
            respondMutation.mutate({ friendshipId, status: 'ACCEPTED' });
        },
        mutateAsync: async (friendshipId: string) => {
            return respondMutation.mutateAsync({ friendshipId, status: 'ACCEPTED' });
        },
    } as UseMutationResult<unknown, Error, string>;
}

/**
 * Reject a friend request (convenience wrapper)
 */
export function useRejectFriendRequest(): UseMutationResult<unknown, Error, string> {
    const respondMutation = useRespondToFriendRequest();

    return {
        ...respondMutation,
        mutate: (friendshipId: string) => {
            respondMutation.mutate({ friendshipId, status: 'REJECTED' });
        },
        mutateAsync: async (friendshipId: string) => {
            return respondMutation.mutateAsync({ friendshipId, status: 'REJECTED' });
        },
    } as UseMutationResult<unknown, Error, string>;
}

/**
 * Cancel an outgoing friend request
 * 
 * Features:
 * - Optimistic update
 * - Invalidates cache on success
 */
export function useCancelFriendRequest(): UseMutationResult<unknown, Error, string> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (friendshipId: string) => {
            return friendsApi.cancelRequest(friendshipId);
        },
        onMutate: async (friendshipId) => {
            await queryClient.cancelQueries({ queryKey: queryKeys.friends.requests });

            const previousRequests = queryClient.getQueryData<FriendRequestsResponse>(
                queryKeys.friends.requests
            );

            // Optimistically remove from outgoing
            if (previousRequests) {
                queryClient.setQueryData<FriendRequestsResponse>(
                    queryKeys.friends.requests,
                    {
                        ...previousRequests,
                        data: {
                            ...previousRequests.data,
                            outgoing: previousRequests.data.outgoing.filter(
                                (req) => req.id !== friendshipId
                            ),
                        },
                    }
                );
            }

            return { previousRequests };
        },
        onSuccess: () => {
            console.log('✅ Friend request cancelled');
            queryClient.invalidateQueries({ queryKey: queryKeys.friends.requests });
        },
        onError: (error, friendshipId, context) => {
            console.error('❌ Failed to cancel friend request:', getErrorMessage(error));

            if (context?.previousRequests) {
                queryClient.setQueryData(
                    queryKeys.friends.requests,
                    context.previousRequests
                );
            }
        },
    });
}

/**
 * Remove a friend
 * 
 * Features:
 * - Optimistic update (immediately removes from UI)
 * - Invalidates cache on success
 * - Rolls back on error
 */
export function useRemoveFriend(): UseMutationResult<unknown, Error, string> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (userId: string) => {
            return friendsApi.removeFriend(userId);
        },
        onMutate: async (userId) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: queryKeys.friends.list });

            // Snapshot previous value
            const previousFriends = queryClient.getQueryData<FriendsListResponse>(
                queryKeys.friends.list
            );

            // Optimistically remove friend from list
            if (previousFriends) {
                queryClient.setQueryData<FriendsListResponse>(
                    queryKeys.friends.list,
                    {
                        ...previousFriends,
                        data: {
                            friends: previousFriends.data.friends.filter(
                                (friend) => friend.id !== userId
                            ),
                        },
                    }
                );
            }

            // Return context with snapshot
            return { previousFriends };
        },
        onSuccess: () => {
            console.log('✅ Friend removed successfully');
            // Invalidate to refetch fresh data
            queryClient.invalidateQueries({ queryKey: queryKeys.friends.list });
            queryClient.invalidateQueries({ queryKey: queryKeys.friends.all });
        },
        onError: (error, userId, context) => {
            console.error('❌ Failed to remove friend:', getErrorMessage(error));

            // Rollback to previous state
            if (context?.previousFriends) {
                queryClient.setQueryData(
                    queryKeys.friends.list,
                    context.previousFriends
                );
            }
        },
    });
}
