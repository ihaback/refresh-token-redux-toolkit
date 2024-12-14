# JWT Refresh Tokens in React & Redux Toolkit
📦 ARCHIVED AND NO LONGER MAINTAINED

 Refresh Tokens are credentials used to obtain access tokens. Refresh tokens are issued to the client by the authorization server and are used to obtain a new access token when the current access token becomes invalid or expires, or to obtain additional access tokens with identical or narrower scope. This implementation uses React and Redux Toolkit and is inspired by [this repo](https://github.com/safak/youtube/tree/jwt).

## Project setup

```
npm install
```

or with volta versions defined in package.json (recommended)

```
volta run npm install
```

### Run React and Express backend simultaneously

```
npm run start
```

### Credentials to test implementation

```js
const users = [
  {
    id: "1",
    username: "john",
    password: "john123",
    isAdmin: true,
  },
  {
    id: "2",
    username: "joe",
    password: "joe123",
    isAdmin: false,
  },
];
```

### The backend expects the token to be refreshed after 3 seconds

```js
// server.js
const generateAccessToken = (user) => {
  return jwt.sign({ id: user?.id, isAdmin: user?.isAdmin }, "mySecretKey", {
    expiresIn: "3s",
  });
};

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};
```

### Two instances of axios for communicating with public and private endpoints

```ts
// src/utils/index.ts
import axios from "axios";

export const axiosPublic = axios.create({ baseURL: "http://localhost:6060" });
export const axiosPrivate = axios.create({ baseURL: "http://localhost:6060" });
```

## Refreshing tokens is handled by Axios request interceptors

```js
// src/utils/index.ts
axiosPrivate.interceptors.request.use(
  async (config) => {
    const user = store?.getState()?.auth?.user;

    let currentDate = new Date();
    if (user?.accessToken) {
      const decodedToken = <{ exp: number }>(user?.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        await store.dispatch(refreshToken());
        if (config?.headers) {
          config.headers["authorization"] = `Bearer ${
            store?.getState()?.auth?.user?.accessToken
          }`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

### State handling and communication with the backend is handled through Redux actions

```ts
// src/features/authSlice.ts
export const authSlice = createSlice({
  name: modulePrefix,
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
```

### The shape of the state

```ts
// src/types/index.ts
export interface AppState {
  user: {
    accessToken: string;
    isAdmin: boolean;
    refreshToken: string;
    username: string;
  } | null;
  username: string;
  password: string;
  success: boolean;
  error: boolean;
}
```