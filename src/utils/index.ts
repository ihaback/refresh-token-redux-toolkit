import axios from "axios";
import { store } from "store";
import { refreshToken } from "features";
import { jwtDecode } from "jwt-decode";

export const axiosPublic = axios.create({
  baseURL: "http://localhost:6060/api",
});
export const axiosPrivate = axios.create({
  baseURL: "http://localhost:6060/api",
});

axiosPrivate.interceptors.request.use(
  async (config) => {
    const user = store?.getState()?.auth?.user;

    let currentDate = new Date();
    if (user?.accessToken) {
      const decodedToken = jwtDecode<{ exp: number }>(user?.accessToken);
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
