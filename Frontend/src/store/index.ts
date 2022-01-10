import { createStore, createLogger } from "vuex";

import { store as auth, AuthStore, State as AuthState } from "@/store/auth";

export type RootState = {
  auth: AuthState;
};

export type Store = AuthStore<Pick<RootState, "auth">>;
// & ProfileStore<Pick<RootState, "profile">>;

import { Getters as AuthGetters } from "./auth/getters";
export interface RootGetters extends AuthGetters {}

// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== "production";
const plugins = debug ? [createLogger({})] : [];

export const store = createStore({
  plugins,
  modules: {
    auth,
  },
});

export function useStore(): Store {
  return store as Store;
}
