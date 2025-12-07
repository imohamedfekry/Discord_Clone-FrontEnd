# Frontend Architecture Documentation

## 1. Overview
This project uses a modern React + Redux Toolkit + Socket.io architecture. The codebase is organized by **feature** rather than by technical layer where possible, ensuring high cohesion and low coupling.

## 2. Directory Structure
```
src/
├── app/                # Next.js App Router & Providers
├── components/         # UI Components
├── config/             # Environment & Global Config
├── context/            # UI Contexts (Theme, Tabs) - NO Socket logic here
├── socket/             # WebSocket Core & Event Handlers
│   ├── events/         # Event handlers per feature
│   ├── index.tsx       # SocketProvider & Connection Logic
│   ├── constants.ts    # Event Name Constants
│   └── registerHandlers.ts # Handler Aggregation
├── store/              # Redux Store & Slices
│   ├── slices/         # Feature-based Slices
│   └── index.ts        # Store Configuration
├── types/              # Shared DTO Types (User, Message, etc.)
└── system/             # Utilities
```

## 3. Redux Architecture
We use **Redux Toolkit** with `createEntityAdapter` for efficient state management of collections (Friends, Requests, Messages).

### Slices
- **friendsSlice**: Manages the friends list.
- **requestsSlice**: Manages incoming/outgoing friend requests.
- **chatSlice**: Manages messages and typing status.
- **presenceSlice**: Manages user online statuses.
- **serversSlice**: Manages servers and channels.
- **socketConnectionSlice**: Manages technical socket state (connected, reconnecting, ping).

### Data Flow
1. **Socket Event** received in `src/socket/events/*.ts`.
2. **Handler** dispatches a Redux Action (e.g., `dispatch(addMessage(msg))`).
3. **Reducer** updates the state (using `entityAdapter` for O(1) updates).
4. **UI Component** selects data via `useAppSelector(selectMessages)`.

## 4. WebSocket Architecture
The WebSocket logic is completely decoupled from the UI components.

- **SocketProvider** (`src/socket/index.tsx`): Initializes the socket connection, handles reconnection, and provides the `socket` instance to the app via Context.
- **Event Handlers** (`src/socket/events/`): Pure functions that take `socket` and `dispatch`. They contain NO UI logic.
- **Registration**: All handlers are registered in `registerHandlers.ts`.

### How to Add a New Feature
1. **Define Types**: Add DTO interfaces in `src/types/models.ts`.
2. **Create Slice**: Create `src/store/slices/myFeatureSlice.ts`.
3. **Add to Store**: Import and add to `src/store/index.ts`.
4. **Define Events**: Add event names to `src/socket/constants.ts`.
5. **Create Handler**: Create `src/socket/events/myFeature.ts` and write `socket.on(...)` logic.
6. **Register Handler**: Add to `src/socket/registerHandlers.ts`.

## 5. Naming Conventions
- **Events**: `domain:action` (e.g., `friend:request:received`, `chat:message:sent`).
- **Actions**: Verb + Noun (e.g., `addFriend`, `setMessages`).
- **Files**: camelCase for files, PascalCase for Components/Classes.

## 6. Key Principles
- **No Business Logic in Components**: Components should only dispatch actions and select state.
- **No Socket Logic in Redux**: Reducers should be synchronous and pure. Socket side-effects live in the `socket/` directory.
- **Strong Typing**: Always use defined interfaces (User, Message) instead of `any`.
