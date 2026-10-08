import axios, {
    type AxiosError,
    type AxiosInstance,
    type AxiosResponse,
} from "axios";

import {
    type NotepadPushResult,
    type NotepadSnapshot,
} from "@/types/Notepad";
import type { ApiResult } from "@/types/Auth";

const UNAVAILABLE_MESSAGE = "记事本服务不可用，请稍后重试";

/**
 * 记事本服务与登录服务部署在同一个 Cloudflare Worker（VITE_AUTH_API_URL）。
 * 使用独立实例，不复用 /api 代理，便于 GitHub Pages 直连 Worker。
 */
const notepadClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_URL,
    timeout: 10000,
});

async function unwrap<T>(
    promise: Promise<AxiosResponse<ApiResult<T>>>,
): Promise<T> {
    let result: ApiResult<T> | undefined;

    try {
        const response = await promise;
        result = response.data;
    } catch (error) {
        result = (error as AxiosError<ApiResult<T>>)?.response?.data;
        if (!result) {
            throw new Error(UNAVAILABLE_MESSAGE);
        }
    }

    if (!result.success || result.data === undefined) {
        throw new Error(result.message || "请求失败");
    }

    return result.data;
}

export const notepadApi = {
    /** 进入记事本：不存在则创建，返回当前内容快照 */
    join(id: string): Promise<NotepadSnapshot> {
        return unwrap<NotepadSnapshot>(notepadClient.post("/notepad/v1/join", { id }));
    },

    /** 拉取云端最新内容（兼作心跳） */
    pull(id: string): Promise<NotepadSnapshot> {
        return unwrap<NotepadSnapshot>(notepadClient.get("/notepad/v1/pull", { params: { id } }));
    },

    /** 手动上传：baseVersion 为本地依据的云端版本，冲突时 saved=false 且返回最新快照 */
    push(id: string, content: string, baseVersion: number, force = false): Promise<NotepadPushResult> {
        return unwrap<NotepadPushResult>(
            notepadClient.post("/notepad/v1/push", { id, content, baseVersion, force }),
        );
    },
};

export default notepadClient;
