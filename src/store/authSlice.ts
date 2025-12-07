import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "@/components/lib/authApi";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  globalname?: string;
  avatar?: string;
  theme?: "light" | "dark" | null;
  preferences?: Record<string, unknown>;
  [key: string]: unknown;
}

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

interface AuthState {
  user: AuthUser | null;
  status: RequestStatus;
  error: string | null;
  token: string | null;
  initialized: boolean;
}

const TOKEN_KEY = "Authorization";

const getInitialToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
  token: getInitialToken(),
  initialized: false,
};

const getErrorMessage = (error: unknown) => {
  if (typeof error === "string") return error;
  if (error && typeof error === "object") {
    const errObj = error as {
      response?: { data?: { message?: string } };
      message?: string;
    };

    return errObj.response?.data?.message || errObj.message || "Unexpected error";
  }
  return "Unexpected error";
};

const extractToken = (payload: unknown) => {
  if (payload && typeof payload === "object" && "Authorization" in payload) {
    return String((payload as Record<string, unknown>).Authorization);
  }
  return null;
};

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const response = await authApi.getMe();
      console.log("✅ Fetched user data:", response.data);

      // Handle different response structures
      // API might return: { data: { user: {...} } } or { user: {...} } or just {...}
      let userData;

      if (response && typeof response === 'object') {
        // Check if response has nested data.user structure
        if ('data' in response && response.data && typeof response.data === 'object') {
          userData = 'user' in response.data ? response.data.user : response.data;
        }
        // Check if response has user property directly
        else if ('user' in response) {
          userData = response.user;
        }
        // Otherwise assume response is the user object itself
        else {
          userData = response;
        }
      }

      console.log('✅ Fetched user data:', userData);
      return userData as AuthUser;
    } catch (error) {
      console.error('❌ Failed to fetch current user:', error);
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

interface AuthCredentials {
  email: string;
  password: string;
}

const persistToken = (token?: string | null) => {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: AuthCredentials, thunkAPI) => {
    try {
      const data = await authApi.login(payload);
      persistToken(extractToken(data));
      thunkAPI.dispatch(fetchCurrentUser());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  globalname: string;
  birthdate: string;
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload: RegisterPayload, thunkAPI) => {
    try {
      const data = await authApi.register(payload);
      persistToken(extractToken(data));
      thunkAPI.dispatch(fetchCurrentUser());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, thunkAPI) => {
  try {
    await authApi.logout();
  } catch (error) {
    // swallow logout errors but report
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  } finally {
    persistToken(null);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
      state.initialized = true;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      persistToken(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.initialized = true;
        console.log('✅ User loaded into Redux:', action.payload);
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = (action.payload as string) || action.error.message || null;
        state.initialized = true;
        console.error('❌ fetchCurrentUser rejected:', action.payload || action.error.message);
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = extractToken(action.payload) || state.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || action.error.message || null;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = extractToken(action.payload) || state.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || action.error.message || null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
        state.token = null;
        state.initialized = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.status = "idle";
        state.error = (action.payload as string) || action.error.message || null;
        state.initialized = false;
      });
  },
});

export const { setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
