import { type RouteRecordRaw } from 'vue-router'

export default {
    path: '/',
    name: 'index',
    component: () => import("@components/NyanCat.vue"),
    meta: {
        title: "Nyan Cat"    
    }
} satisfies RouteRecordRaw
