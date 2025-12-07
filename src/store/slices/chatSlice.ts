import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../types/models';
import { RootState } from '../index';

const messagesAdapter = createEntityAdapter<Message>();

interface ChatState {
    activeChannelId: string | null;
    typingUsers: Record<string, string[]>; // channelId -> userIds
}

const chatSlice = createSlice({
    name: 'chat',
    initialState: messagesAdapter.getInitialState<ChatState>({
        activeChannelId: null,
        typingUsers: {},
    }),
    reducers: {
        setActiveChannel(state, action: PayloadAction<string | null>) {
            state.activeChannelId = action.payload;
        },
        addMessage: messagesAdapter.addOne,
        setMessages: messagesAdapter.setAll,
        setTypingUser(state, action: PayloadAction<{ channelId: string; userId: string; isTyping: boolean }>) {
            const { channelId, userId, isTyping } = action.payload;
            if (!state.typingUsers[channelId]) state.typingUsers[channelId] = [];

            if (isTyping) {
                if (!state.typingUsers[channelId].includes(userId)) {
                    state.typingUsers[channelId].push(userId);
                }
            } else {
                state.typingUsers[channelId] = state.typingUsers[channelId].filter(id => id !== userId);
            }
        },
    },
});

export const { setActiveChannel, addMessage, setMessages, setTypingUser } = chatSlice.actions;
export const chatSelectors = messagesAdapter.getSelectors<RootState>((state) => state.chat);
export default chatSlice.reducer;
