export interface User {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
    discriminator: string;
    status?: PresenceStatus;
}

export type PresenceStatus = 'ONLINE' | 'IDLE' | 'DND' | 'OFFLINE';

export interface FriendRequest {
    id: string;
    from: User;
    to: User;
    sender?: User;    // Alias for 'from' - used in some socket events
    receiver?: User;  // Alias for 'to' - used in some socket events
    user?: User;      // Can be either sender or receiver depending on context
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
    createdAt: string;
}

export interface Message {
    id: string;
    channelId: string;
    authorId: string;
    content: string;
    createdAt: string;
    updatedAt?: string;
    attachments?: string[];
}

export interface Server {
    id: string;
    name: string;
    icon?: string;
    ownerId: string;
    channels: string[]; // IDs of channels
}

export interface Channel {
    id: string;
    serverId: string;
    name: string;
    type: 'TEXT' | 'VOICE';
}

export interface Notification {
    id: string;
    type: 'FRIEND_REQUEST' | 'MESSAGE' | 'SYSTEM';
    title: string;
    body: string;
    read: boolean;
    createdAt: string;
}
