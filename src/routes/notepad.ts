import { type RouteRecordRaw } from 'vue-router'

export default {
    path: '/Notepad',
    name: 'Notepad',
    component: () => import('@/views/Notepad/Notepad.vue'),
    meta: {
        title: '同步记事本'
    }
} satisfies RouteRecordRaw
