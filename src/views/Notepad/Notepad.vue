<template>
    <div class="container p-3">
        <n-h2>云同步记事本</n-h2>

        <!-- 入口：输入 8 位字母 id -->
        <div v-if="stage === 'join'">

            <div class="join-form">
                <n-input-otp v-model:value="otpChars" :length="8" :gap="12" :allow-input="OnlyLetters"
                    @keyup.enter="Join" @finish="Join" />
                <n-flex justify="center">
                    <n-button type="primary" :loading="joining" @click="Join">进入</n-button>
                    <n-button strong secondary @click="RandomId">随机生成</n-button>
                </n-flex>
            </div>
        </div>

        <!-- 编辑器 -->
        <div v-else class="editor">
            <n-flex justify="space-between" class="mb-4">
                <n-flex align="center">
                    <span class="fs-5">{{ notepadId }} 的记事本</span>
                    <!-- <CopyToClipboardButton :value="notepadId">复制 Id</CopyToClipboardButton> -->
                </n-flex>

                <n-flex align="center">
                    <span :class="isDirty ? 'text-warning' : 'text-synced'">
                        {{ isDirty ? '本地修改未上传' : '已同步' }}
                    </span>
                    <n-button type="primary" :disabled="!isDirty" :loading="pushing" @click="Upload">
                        上传
                    </n-button>
                    <n-button strong secondary @click="ManualPull" :loading="pulling">
                        拉取
                    </n-button>
                </n-flex>
            </n-flex>

            <n-input v-model:value="textInput" type="textarea" placeholder="输入内容" :autosize="textareaAutosize" />

            <n-flex justify="space-between" class="mt-3">
                <div>
                    <span>{{ textInput.length }} 字符</span>
                    <n-divider :vertical="true" />
                    <span>版本 {{ currentSnapshot?.version ?? 0 }}</span>
                    <n-divider :vertical="true" />
                    <span>最后更新时间 {{ currentSnapshot?.updatedAt ?? "" }}</span>
                    <n-divider :vertical="true" />
                </div>

                <n-button type="error" ghost @click="Exit">退出记事本</n-button>
            </n-flex>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import { notepadApi } from '@/services/notepad'
import { RandomHelper } from '@/common/RandomHelper'
import { NOTEPAD_ID_RE, NOTEPAD_POLL_INTERVAL, type NotepadSnapshot } from '@/types/Notepad'

const NOTEPAD_GONE_MESSAGE = '记事本不存在或已销毁'

const otpChars = ref<string[]>([])

const notepadId = ref<string>('')
const stage = ref<'join' | 'edit'>('join')
const joining = ref<boolean>(false)
const pushing = ref<boolean>(false)
const pulling = ref<boolean>(false)

const textInput = ref<string>('')
const currentSnapshot = ref<NotepadSnapshot | null>(null)

const textareaAutosize = { minRows: 14, maxRows: 32 }

const isDirty = computed<boolean>(() =>
    stage.value === 'edit' && currentSnapshot.value !== null && textInput.value !== currentSnapshot.value.content)

/** 等待用户处理的云端冲突快照（对话框与消息提示共用，轮询会刷新为最新版本） */
const pendingConflict = ref<NotepadSnapshot | null>(null)

let pollTimer: ReturnType<typeof setInterval> | null = null
let remoteConflictDialog: { destroy: () => void } | null = null
let conflictMessage: { destroy: () => void } | null = null
let notifiedConflictVersion: number | null = null

/** 只允许字母进入每个格子 */
function OnlyLetters(char: string): boolean {
    return /^[\w]$/.test(char)
}

function RandomId() {
    otpChars.value = RandomHelper.GenerateRandomString_Letters(8).split('')
}

async function Join() {
    if (joining.value) return
    const id = otpChars.value.join('').trim()
    if (!NOTEPAD_ID_RE.test(id)) {
        window.$message?.error('请输入记事本Id')
        return
    }

    joining.value = true
    try {
        const snapshot = await notepadApi.join(id)
        notepadId.value = snapshot.id
        currentSnapshot.value = snapshot
        textInput.value = snapshot.content
        stage.value = 'edit'
        // StartPolling()
    } catch (error) {
        window.$message?.error((error as Error).message)
    } finally {
        joining.value = false
    }
}

function Exit() {
    // StopPolling()
    DismissConflictUi()
    pendingConflict.value = null
    stage.value = 'join'
    notepadId.value = ''
    otpChars.value = []
    currentSnapshot.value = null
    textInput.value = ''
}

/* ---------------- 拉取（含轮询） ---------------- */

async function Pull(silent: boolean) {
    if (stage.value !== 'edit' || notepadId.value === '' || currentSnapshot.value === null) return

    try {
        const snapshot = await notepadApi.pull(notepadId.value)
        const base = currentSnapshot.value

        // 本地编辑器内容与云端不一致 → 冲突
        if (isDirty.value && snapshot.content !== textInput.value) {
            pendingConflict.value = snapshot
            if (silent) {
                // 自动轮询：只在顶部弹可点击消息，不打断编辑；对话框已打开时仅刷新版本信息
                if (remoteConflictDialog === null) ShowConflictNotice(snapshot)
            } else {
                // 手动拉取：直接询问
                DismissConflictNotice()
                AskRemote(snapshot)
            }
            return
        }

        // 无本地修改，或云端内容恰好与本地编辑相同 → 直接应用（无损）
        const contentChanged = snapshot.content !== base.content
        ApplyRemote(snapshot)
        if (contentChanged) {
            if (silent) window.$message?.info(`云端已更新到版本 ${snapshot.version}，已自动同步`)
            else window.$message?.success(`已同步到版本 ${snapshot.version}`)
        } else if (!silent) {
            window.$message?.success('已为最新版本')
        }
    } catch (error) {
        const message = (error as Error).message
        if (message === NOTEPAD_GONE_MESSAGE) {
            // StopPolling()
            DismissConflictUi()
            window.$dialog?.error({
                title: '记事本已销毁',
                content: '该记事本空闲超过 24 小时，已销毁',
                positiveText: '了解',
                onPositiveClick: () => Exit(),
                onMaskClick: () => Exit(),
            })
            return
        }
        if (!silent) {
            window.$message?.error(message)
        }
    }
}

async function ManualPull() {
    pulling.value = true
    try {
        await Pull(false)
    } finally {
        pulling.value = false
    }
}

function ApplyRemote(snapshot: NotepadSnapshot) {
    textInput.value = snapshot.content
    currentSnapshot.value = snapshot
    pendingConflict.value = null
    DismissConflictUi()
}

/** 自动轮询发现冲突：顶部消息提示，用户点击“处理”后再 AskRemote */
function ShowConflictNotice(snapshot: NotepadSnapshot) {
    if (notifiedConflictVersion === snapshot.version) return
    DismissConflictNotice()
    notifiedConflictVersion = snapshot.version
    const msg = window.$message?.warning(
        () => h('div', { class: 'd-flex align-items-center gap-2' }, [
            h('span', `云端版本 ${snapshot.version} 与本地修改存在冲突`),
            h(NButton, {
                size: 'tiny',
                type: 'warning',
                onClick: () => {
                    DismissConflictNotice()
                    if (pendingConflict.value) AskRemote(pendingConflict.value)
                },
            }, { default: () => '处理' }),
        ]),
        {
            duration: 0,
            closable: true,
            onAfterLeave: () => { if (conflictMessage === msg) conflictMessage = null },
        },
    ) ?? null
    conflictMessage = msg
}

/** 有本地修改时收到云端新版本：让用户选择加载云端或保持本地 */
function AskRemote(snapshot: NotepadSnapshot) {
    pendingConflict.value = snapshot
    notifiedConflictVersion = snapshot.version
    if (remoteConflictDialog) return
    remoteConflictDialog = window.$dialog?.warning({
        title: '确认使用云端？',
        content: `本地与云端内容不一致，确认要丢弃本地修改，使用云端内容吗？`,
        positiveText: '确定',
        negativeText: '取消',
        closeOnEsc: false,
        maskClosable: false,
        onPositiveClick: () => {
            // 应用轮询刷新后的最新快照
            if (pendingConflict.value) ApplyRemote(pendingConflict.value)
            CloseRemoteConflictDialog()
        },
        onNegativeClick: () => CloseRemoteConflictDialog(),
        onClose: () => CloseRemoteConflictDialog(),
    }) ?? null
}

function CloseRemoteConflictDialog() {
    remoteConflictDialog?.destroy()
    remoteConflictDialog = null
}

function DismissConflictNotice() {
    conflictMessage?.destroy()
    conflictMessage = null
    notifiedConflictVersion = null
}

function DismissConflictUi() {
    CloseRemoteConflictDialog()
    DismissConflictNotice()
}

// function StartPolling() {
//     StopPolling()
//     pollTimer = setInterval(() => Pull(true), NOTEPAD_POLL_INTERVAL)
// }

// function StopPolling() {
//     if (pollTimer !== null) {
//         clearInterval(pollTimer)
//         pollTimer = null
//     }
// }

/* ---------------- 上传 ---------------- */

async function Upload() {
    if (!currentSnapshot.value || !isDirty.value) return
    await Push(false)
}

async function Push(force: boolean) {
    if (!currentSnapshot.value) return
    pushing.value = true
    try {
        const result = await notepadApi.push(notepadId.value, textInput.value, currentSnapshot.value.version, force)
        if (result.saved) {
            currentSnapshot.value = result.snapshot
            pendingConflict.value = null
            DismissConflictUi()
            window.$message?.success(`已上传，版本 ${result.snapshot.version}`)
            if (textInput.value !== result.snapshot.content) {
                window.$message?.info('上传期间有新的编辑，仍需再次上传')
            }
        } else {
            AskConflict(result.snapshot)
        }
    } catch (error) {
        window.$message?.error((error as Error).message)
    } finally {
        pushing.value = false
    }
}

/** 上传时发现云端已被其他客户端更新 */
function AskConflict(latest: NotepadSnapshot) {
    window.$dialog?.warning({
        title: '上传冲突',
        content: `云端已存在更新的版本 v${latest.version}（其他客户端先上传）。` +
            '“覆盖上传”将以本地内容为准；“加载云端”将放弃本地修改。',
        positiveText: '覆盖上传',
        negativeText: '加载云端',
        closeOnEsc: false,
        maskClosable: false,
        onPositiveClick: () => Push(true),
        onNegativeClick: () => ApplyRemote(latest),
    })
}

onUnmounted(() => {
    // StopPolling()
    DismissConflictUi()
})
</script>

<style scoped>
.join-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
}

.notepad-id {
    font-family: monospace;
    letter-spacing: 0.2em;
}

.text-synced {
    color: var(--n-success-color, #63e2b7);
}

.text-warning {
    color: var(--n-warning-color, #f0a020);
}
</style>
