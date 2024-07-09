import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkRootState } from "store";
import { AppState, UserResponse, RefreshTokenResponse } from "types";
import { axiosPublic, axiosPrivate } from "utils";

const modulePrefix = "user";

const initialState: AppState = {
  user: JSON.parse(localStorage?.getItem("user") as string),
  username: "",
  password: "",
  success: false,
  error: false,
};

export const login = createAsyncThunk<UserResponse, void, ThunkRootState>(
  `${modulePrefix}/login`,
  async (_, { getState }) => {
    const state = getState();

    const res = await axiosPublic.post<UserResponse>("login", {
      username: state.userData.username,
      password: state.userData.password,
    });

    return res.data;
  }
);

export const logout = createAsyncThunk<string, void, ThunkRootState>(
  `${modulePrefix}/logout`,
  async (_, { getState }) => {
    const state = getState();

    const res = await axiosPrivate.post<string>(
      `logout`,
      {
        token: state.userData?.user?.refreshToken,
      },
      {
        headers: {
          authorization: `Bearer ${state.userData?.user?.accessToken}`,
        },
      }
    );

    return res.data;
  }
);

export const deleteUser = createAsyncThunk<string, number, ThunkRootState>(
  `${modulePrefix}/deleteUser`,
  async (id, { getState }) => {
    const state = getState();

    const res = await axiosPrivate.delete<string>(`users/${id}`, {
      headers: { authorization: `Bearer ${state.userData.user?.accessToken}` },
    });

    return res.data;
  }
);

export const refreshToken = createAsyncThunk<
  RefreshTokenResponse,
  void,
  ThunkRootState
>(`${modulePrefix}/refreshToken`, async (_, { getState }) => {
  const state = getState();

  const res = await axiosPublic.post<RefreshTokenResponse>(`refresh`, {
    token: state.userData.user?.refreshToken,
  });

  return res.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserName(state, action: PayloadAction<AppState["username"]>) {
      state.username = action.payload;
    },
    updatePassword(state, action: PayloadAction<AppState["password"]>) {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          localStorage.setItem("user", JSON.stringify(action.payload));
          state.user = action.payload;
        }
      )

      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem("user");
        state.user = null;
        state.username = "";
        state.password = "";
        state.success = false;
        state.error = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.success = false;
        state.error = false;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.success = true;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.error = true;
      })
      .addCase(
        refreshToken.fulfilled,
        (state, action: PayloadAction<RefreshTokenResponse>) => {
          localStorage.setItem("user", JSON.stringify(action.payload));
          state.user!.accessToken = action.payload.accessToken;
          state.user!.refreshToken = action.payload.refreshToken;
        }
      );
  },
});

export const { updateUserName, updatePassword } = userSlice.actions;
