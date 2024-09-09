import { type RouteRecordRaw } from 'vue-router'

export default {
    path: '/dx',
    name: 'maimai',
    alias : ["/maimai", "/mai"],
    component: () => import("@views/maimai.vue"),
    meta: {
        title: "maimai DX"    
    }
} satisfies RouteRecordRaw
