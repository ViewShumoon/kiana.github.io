import { type RouteRecordRaw } from 'vue-router'

export default {
    path: '/JapaneseGojuon',
    name: 'JapaneseGojuon',
    component: () => import('@/views/JapaneseGojuon/JapaneseGojuon.vue'),
    meta: {
        title: '五十音图'
    }
} satisfies RouteRecordRaw
