/** 记事本 id：8 位字母或数字（不区分大小写，服务端统一小写存储） */
export const NOTEPAD_ID_RE = /^[\w]{8}$/;

/** 服务端返回的记事本快照（与 Worker NotepadSnapshot 对应） */
export interface NotepadSnapshot {
    id: string;
    content: string;
    version: number;
    updatedAt: string;
}

/** push 接口返回：saved=false 表示云端已被其他客户端更新，需处理冲突 */
export interface NotepadPushResult {
    saved: boolean;
    snapshot: NotepadSnapshot;
}

/** 轮询间隔（毫秒），兼作客户端心跳 */
export const NOTEPAD_POLL_INTERVAL = 20000;
