import { type RouteRecordRaw } from 'vue-router'

export default {
    path: '/Tools',
    name: 'Tools',
    component: () => import('@/views/Tools/Tools.vue'),
    redirect: { name: 'TimeInterval' },
    meta: {
        title: '工具箱'
    }
} satisfies RouteRecordRaw 