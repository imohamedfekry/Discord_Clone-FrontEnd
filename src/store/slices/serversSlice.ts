import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { Server, Channel } from '../../types/models';
import { RootState } from '../index';

const serversAdapter = createEntityAdapter<Server>();
const channelsAdapter = createEntityAdapter<Channel>();

interface ServersState {
    activeServerId: string | null;
    servers: ReturnType<typeof serversAdapter.getInitialState>;
    channels: ReturnType<typeof channelsAdapter.getInitialState>;
}

const initialState: ServersState = {
    activeServerId: null,
    servers: serversAdapter.getInitialState(),
    channels: channelsAdapter.getInitialState(),
};

const serversSlice = createSlice({
    name: 'servers',
    initialState,
    reducers: {
        setActiveServer(state, action: PayloadAction<string | null>) {
            state.activeServerId = action.payload;
        },
        // Server Actions
        setServers(state, action: PayloadAction<Server[]>) {
            serversAdapter.setAll(state.servers, action.payload);
        },
        addServer(state, action: PayloadAction<Server>) {
            serversAdapter.addOne(state.servers, action.payload);
        },
        removeServer(state, action: PayloadAction<string>) {
            serversAdapter.removeOne(state.servers, action.payload);
        },
        // Channel Actions
        setChannels(state, action: PayloadAction<Channel[]>) {
            channelsAdapter.setAll(state.channels, action.payload);
        },
        addChannel(state, action: PayloadAction<Channel>) {
            channelsAdapter.addOne(state.channels, action.payload);
        },
        removeChannel(state, action: PayloadAction<string>) {
            channelsAdapter.removeOne(state.channels, action.payload);
        },
    },
});

export const {
    setActiveServer,
    setServers, addServer, removeServer,
    setChannels, addChannel, removeChannel
} = serversSlice.actions;

export const serversSelectors = serversAdapter.getSelectors<RootState>((state) => state.servers.servers);
export const channelsSelectors = channelsAdapter.getSelectors<RootState>((state) => state.servers.channels);

export default serversSlice.reducer;
