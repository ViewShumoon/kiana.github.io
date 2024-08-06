<template>
    <n-dialog-provider>
        <DialogContent />
        <n-notification-provider>
            <NotificationContent/>
            <n-message-provider>
                <MessageContent/>
                    <n-loading-bar-provider>
                        <LoadingBarContent/>
                        <slot name="default"></slot>
                    </n-loading-bar-provider>
            </n-message-provider>
        </n-notification-provider>
    </n-dialog-provider>
</template>
  
<script setup lang="ts">
import DialogContent from "./WindowDialog";
import NotificationContent from "./WindowNotification";
import MessageContent from "./WindowMessage";
import LoadingBarContent from "./WindowLoadingBar";

</script>
<style scoped></style>
