import axios, {
    type AxiosError,
    type AxiosInstance,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from "axios";

import {
    AUTH_STORAGE_KEY,
    SESSION_HEADER,
    type ApiResult,
    type AuthSession,
} from "@/types/Auth";

const UNAVAILABLE_MESSAGE = "登录服务不可用，请稍后重试";

/**
 * 登录服务使用独立实例：baseURL 指向 Cloudflare Worker（VITE_AUTH_API_URL），
 * 不复用 src/services/axios 的 /api 代理，便于前端部署在 GitHub Pages 时直连 Worker。
 */
const authClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_URL || "/api",
    timeout: 10000,
});

// 所有请求自动携带本地保存的 sessionId，服务端据此校验登录态
authClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const sessionId = getStoredSessionId();
    if (sessionId) {
        config.headers[SESSION_HEADER] = sessionId;
    }
    return config;
});

function getStoredSessionId(): string {
    try {
        const raw = localStorage.getItem(AUTH_STORAGE_KEY);
        const session = raw ? (JSON.parse(raw) as Partial<AuthSession>) : null;
        return session?.sessionId || "";
    } catch {
        return "";
    }
}

/**
 * 解开 { success, message, data } 响应体：失败时提示并抛出异常。
 * @param silent 为 true 时不弹出错误提示（用于静默校验本地登录态）
 */
async function unwrap<T>(
    promise: Promise<AxiosResponse<ApiResult<T>>>,
    silent = false,
): Promise<T> {
    let result: ApiResult<T> | undefined;

    try {
        const response = await promise;
        result = response.data;
    } catch (error) {
        result = (error as AxiosError<ApiResult<T>>)?.response?.data;
        if (!result) {
            const message = UNAVAILABLE_MESSAGE;
            if (!silent) {
                window.$message?.error(message);
            }
            throw new Error(message);
        }
    }

    if (!result.success || result.data === undefined) {
        const message = result.message || "请求失败";
        if (!silent) {
            window.$message?.error(message);
        }
        throw new Error(message);
    }

    return result.data;
}

export const authApi = {
    /** 用用户输入的 session 字符串换取登录态 */
    login(sessionId: string): Promise<AuthSession> {
        return unwrap<AuthSession>(authClient.post("/auth/login", { sessionId }));
    },

    /** 校验请求头上携带的 session 是否仍然有效 */
    verify(silent = false): Promise<AuthSession> {
        return unwrap<AuthSession>(authClient.get("/auth/verify"), silent);
    },
};

export default authClient;
