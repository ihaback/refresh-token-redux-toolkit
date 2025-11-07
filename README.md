# Refresh Tokens with React & Redux Toolkit

This repository is a small example that attempts demonstrates how to keep a user session alive by refreshing JSON Web Tokens (JWTs) in a React app powered by Redux Toolkit. It is intentionally simple and should be treated as learning material rather than production-ready code.

## What this project shows

- React + Redux Toolkit handling login, logout, delete user, and refresh flows.
- Axios instances split into public/private clients with an interceptor that injects updated access tokens.
- An Express mock API with access tokens that expire after 3 seconds so you can watch the refresh flow in action.

## Getting started

```bash
npm install
# or use Volta to pin versions
volta run npm install
```

Start both the Vite dev server and the Express backend:

```bash
npm run start
```

The UI loads at `http://localhost:5173`, while the API lives at `http://localhost:6060`.

## Demo credentials

```js
{ username: "john", password: "john123" } // admin
{ username: "joe", password: "joe123" }   // regular user
```

## How the refresh flow works

1. The backend issues access tokens that expire in 3 seconds and longer-lived refresh tokens (`server.js`).
2. The Redux slice (`src/features/authSlice.ts`) stores the user payload and keeps `localStorage` in sync.
3. The private Axios client (`src/utils/index.ts`) inspects every request:
   - If the access token is about to expire, it dispatches `refreshToken`.
   - Once the new token arrives, the pending request is retried with the fresh `Authorization` header.

This flow keeps the example easy to reason about yet mirrors what you would do in a richer app—swap in your own API, add proper error handling, and plug in secure token storage.

## State shape reference

```ts
interface AppState {
  user: {
    accessToken: string;
    refreshToken: string;
    username: string;
    isAdmin: boolean;
  } | null;
  username: string;
  password: string;
  success: boolean;
  error: boolean;
}
```

## Notes

- The repo is archived and kept around simply as a teaching aid.
- Security best practices (rotating secrets, HTTP-only cookies, CSRF protection, etc.) are intentionally out of scope—add them before using these ideas in production.
