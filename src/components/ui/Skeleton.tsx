import React from 'react';
import clsx from 'clsx';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
    width?: string | number;
    height?: string | number;
    animation?: 'pulse' | 'wave' | 'none';
}

/**
 * Skeleton loading component for better perceived performance
 */
export const Skeleton: React.FC<SkeletonProps> = ({
    className,
    variant = 'rectangular',
    width,
    height,
    animation = 'pulse',
}) => {
    return (
        <div
            className={clsx(
                'bg-gray-700/30',
                {
                    'animate-pulse': animation === 'pulse',
                    'rounded-full': variant === 'circular',
                    'rounded-md': variant === 'rectangular',
                    'rounded': variant === 'text',
                },
                className
            )}
            style={{
                width: width || '100%',
                height: height || (variant === 'text' ? '1rem' : '100%'),
            }}
            aria-hidden="true"
        />
    );
};

/**
 * Skeleton for friend list item
 */
export const FriendSkeleton: React.FC = () => (
    <div className="flex items-center gap-3 p-3 hover:bg-(--background-modifier-hover) rounded">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1">
            <Skeleton variant="text" width="60%" height={16} className="mb-2" />
            <Skeleton variant="text" width="40%" height={12} />
        </div>
        <div className="flex gap-2">
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="circular" width={32} height={32} />
        </div>
    </div>
);

/**
 * Skeleton for message in chat
 */
export const MessageSkeleton: React.FC = () => (
    <div className="flex gap-3 px-4 py-2 hover:bg-(--background-modifier-hover)">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
                <Skeleton variant="text" width={120} height={14} />
                <Skeleton variant="text" width={60} height={10} />
            </div>
            <Skeleton variant="text" width="90%" height={16} className="mb-1" />
            <Skeleton variant="text" width="75%" height={16} />
        </div>
    </div>
);

/**
 * Skeleton for server in sidebar
 */
export const ServerSkeleton: React.FC = () => (
    <div className="flex flex-col items-center gap-2 p-2">
        <Skeleton variant="circular" width={48} height={48} />
    </div>
);

/**
 * Skeleton for channel in sidebar
 */
export const ChannelSkeleton: React.FC = () => (
    <div className="flex items-center gap-2 px-2 py-1 mx-2 rounded">
        <Skeleton variant="rectangular" width={20} height={20} />
        <Skeleton variant="text" width="70%" height={16} />
    </div>
);

/**
 * Multiple skeletons for lists
 */
interface SkeletonListProps {
    count?: number;
    type: 'friend' | 'message' | 'server' | 'channel';
}

export const SkeletonList: React.FC<SkeletonListProps> = ({ count = 5, type }) => {
    const SkeletonComponent = {
        friend: FriendSkeleton,
        message: MessageSkeleton,
        server: ServerSkeleton,
        channel: ChannelSkeleton,
    }[type];

    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonComponent key={index} />
            ))}
        </>
    );
};

export default Skeleton;
