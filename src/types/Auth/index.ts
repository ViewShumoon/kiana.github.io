/** 登录会话信息（与 src/worker/index.ts 返回的 data 对应） */
export interface AuthSession {
    sessionId: string;
    userId: string;
}

/** 登录服务的统一响应体 */
export interface ApiResult<T> {
    success: boolean;
    message?: string;
    data?: T;
}

/** localStorage 中保存登录态的 key，需与 AuthStore 的 persist.key 一致 */
export const AUTH_STORAGE_KEY = "auth";

/** 携带 session 的请求头，需与 Worker 侧保持一致 */
export const SESSION_HEADER = "X-Session-Id";
