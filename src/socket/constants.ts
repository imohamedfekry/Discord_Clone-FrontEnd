export const SOCKET_EVENTS = {
    // Connection
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    CONNECT_ERROR: 'connect_error',

    // Friends
    FRIEND_REQUEST_RECEIVED: 'friend:request:received',
    FRIEND_REQUEST_ACCEPTED: 'friend:request:accepted',
    FRIEND_REQUEST_REJECTED: 'friend:request:rejected',
    FRIEND_REQUEST_CANCELLED: 'friend:request:cancelled',
    FRIEND_REMOVED: 'friend:removed',
    FRIENDS_LIST: 'friends:list',
    FRIENDS_REQUESTS_LIST: 'friends:requests:list',

    // Chat
    MESSAGE_RECEIVED: 'chat:message:received',
    TYPING_START: 'chat:typing:start',
    TYPING_STOP: 'chat:typing:stop',

    // Presence
    PRESENCE_UPDATE: 'presence:update',
    PRESENCE_SYNC: 'presence:sync',

    // Servers
    SERVER_JOINED: 'server:joined',
    SERVER_LEFT: 'server:left',
    CHANNEL_CREATED: 'channel:created',
    CHANNEL_DELETED: 'channel:deleted',
} as const;
