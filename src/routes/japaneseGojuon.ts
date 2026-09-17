import { type RouteRecordRaw } from 'vue-router'

export default {
    path: '/Gojuon',
    name: 'Gojuon',
    component: () => import('@/views/JapaneseGojuon/JapaneseGojuon.vue'),
    meta: {
        title: '五十音图'
    }
} satisfies RouteRecordRaw
