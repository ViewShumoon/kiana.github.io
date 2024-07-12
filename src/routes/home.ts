import { type RouteRecordRaw } from 'vue-router'

export default {
    path: '/',
    name: 'index',
    component: () => import("@/views/NyanCat.vue"),
    meta: {
        title: "Nyan Cat"    
    }
} satisfies RouteRecordRaw
