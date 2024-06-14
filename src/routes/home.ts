import { type RouteRecordRaw } from 'vue-router'

export default {
    path: '/',
    name: 'index',
    component: () => import("@components/HelloWorld.vue"),
    meta: {
        title: "主页"
    }
} satisfies RouteRecordRaw
