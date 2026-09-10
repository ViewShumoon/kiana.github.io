import { defineStore } from "pinia";
import { authApi } from "@services/auth";
import { AUTH_STORAGE_KEY, type AuthSession } from "@/types/Auth";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        sessionId: "",
        userId: "",
    }),
    getters: {
        isLoggedIn: (state) => !!state.sessionId,
    },
    actions: {
        /** 登录成功后写入 state，由 persist 插件同步到 localStorage */
        async login(sessionId: string) {
            this.applySession(await authApi.login(sessionId));
        },

        /** 刷新页面后静默复核本地 session，失效则清除登录态 */
        async restore() {
            if (!this.sessionId) {
                return;
            }

            try {
                this.applySession(await authApi.verify(true));
            } catch {
                this.clearSession();
            }
        },

        logout() {
            this.clearSession();
        },

        applySession(session: AuthSession) {
            this.sessionId = session.sessionId;
            this.userId = session.userId;
        },

        clearSession() {
            this.sessionId = "";
            this.userId = "";
        },
    },
    persist: {
        key: AUTH_STORAGE_KEY,
        storage: localStorage,
    },
});
