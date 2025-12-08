import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useAuth } from '@/hooks/useAuth';
import { setConnected, setReconnecting, updatePing } from '../store/slices/socketConnectionSlice';
import { SOCKET_EVENTS } from './constants';

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
    emit: (event: string, ...args: any[]) => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const socketRef = useRef<Socket | null>(null);
    const dispatch = useAppDispatch();
    const { user } = useAuth();

    const isConnected = useAppSelector((state) => state.socketConnection.isConnected);

    const connect = useCallback(() => {
        // Don't connect if already connected
        if (socketRef.current?.connected) {
            console.log('🔌 Socket already connected');
            return;
        }

        console.log('🚀 Initiating socket connection...');
        const socketUrl = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3000';

        const socket = io(socketUrl, {
            transports: ['websocket'],
            withCredentials: true,
            autoConnect: true,
            reconnection: true,
        });

        socketRef.current = socket;

        // Connection Events
        socket.on(SOCKET_EVENTS.CONNECT, () => {
            dispatch(setConnected(true));
            console.log('✅ Socket connected successfully');
        });

        socket.on(SOCKET_EVENTS.DISCONNECT, () => {
            dispatch(setConnected(false));
            console.log('❌ Socket disconnected');
        });

        socket.on(SOCKET_EVENTS.CONNECT_ERROR, (err) => {
            console.error('🔴 Socket connection error:', err);
            dispatch(setConnected(false));
        });

        socket.io.on("reconnect_attempt", () => {
            dispatch(setReconnecting(true));
            console.log('🔄 Attempting to reconnect...');
        });

        socket.io.on("reconnect", () => {
            dispatch(setReconnecting(false));
            console.log('✅ Reconnected successfully');
        });

        socket.on('pong', (latency) => {
            dispatch(updatePing(latency));
        });
    }, [dispatch]);

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            console.log('🔌 Disconnecting socket...');
            socketRef.current.removeAllListeners();
            socketRef.current.disconnect();
            socketRef.current = null;
            dispatch(setConnected(false));
        }
    }, [dispatch]);

    // Effect to handle connection based on user state
    useEffect(() => {
        console.log('👤 User state changed:', user ? `Logged in as ${user.username}` : 'Not logged in');

        if (user) {
            // User is logged in, connect socket
            connect();
        } else {
            // User logged out, disconnect socket
            disconnect();
        }

        // Cleanup on unmount
        return () => {
            disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]); // Only depend on user ID to avoid infinite loops

    const emit = useCallback((event: string, ...args: any[]) => {
        socketRef.current?.emit(event, ...args);
    }, []);

    return (
        <SocketContext.Provider value={{
            socket: socketRef.current,
            isConnected,  // ✅ الآن يستخدم state من Redux
            emit
        }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};
