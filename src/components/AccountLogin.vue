<template>
    <div class="login-button">
        <n-dropdown
            v-if="auth.isLoggedIn"
            trigger="click"
            :options="accountOptions"
            @select="handleAccountSelect"
        >
            <n-button round>
                <n-text depth="1">{{ auth.userId }}</n-text>
                <!-- <n-text depth="3">&nbsp;▾</n-text> -->
            </n-button>
        </n-dropdown>

        <n-button v-else round @click="openLoginDialog">登录</n-button>

        <n-modal
            v-model:show="showLogin"
            preset="card"
            title="登录"
            :mask-closable="false"
            style="width: 380px; max-width: 90vw"
        >
            <n-form @submit.prevent="submitLogin">
                <n-form-item label="Session" :show-feedback="false">
                    <n-input
                        v-model:value="sessionIdInput"
                        type="password"
                        clearable
                        placeholder="请输入 Session"
                        @keyup.enter="submitLogin"
                    />
                </n-form-item>
            </n-form>
            <template #footer>
                <n-space justify="end">
                    <n-button @click="showLogin = false">取消</n-button>
                    <n-button type="primary" :loading="loading" @click="submitLogin">
                        登录
                    </n-button>
                </n-space>
            </template>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import { type DropdownOption } from "naive-ui";
import { useAuthStore } from "@stores/AuthStore";

const auth = useAuthStore();

const showLogin = ref(false);
const loading = ref(false);
const sessionIdInput = ref("");

const accountOptions: DropdownOption[] = [{ label: "退出登录", key: "logout" }];

function openLoginDialog() {
    sessionIdInput.value = "";
    showLogin.value = true;
}

async function submitLogin() {
    const sessionId = sessionIdInput.value.trim();
    if (!sessionId) {
        window.$message.warning("请输入 Session");
        return;
    }

    loading.value = true;
    try {
        await auth.login(sessionId);
        showLogin.value = false;
        window.$message.success(`${auth.userId} 登录成功`);
    } catch {
        // 失败提示已在 auth 服务里统一弹出
    } finally {
        loading.value = false;
    }
}

function handleAccountSelect(key: string) {
    if (key === "logout") {
        window.$dialog.error({
            title: "退出登录",
            content: "确定要退出登录吗？",
            positiveText: "确定",
            negativeText: "取消",
            onPositiveClick: () => {
                auth.logout();
                window.$message.success("已退出登录");
            },
        });
    }
}

onMounted(() => {
    auth.restore();
});
</script>

<style scoped>
.login-button {
    display: flex;
    align-items: center;
    flex: none;
}
</style>
