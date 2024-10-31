import { type RouteRecordRaw } from 'vue-router'

export default [
    {
        path: '/Sort',
        redirect: "/BogoSort"
    },
    {
        path: '/BogoSort',
        name: 'BogoSort',
        component: () => import("@/views/BogoSort.vue"),
        meta: {
            title: "Bogo Sort"
        }
    }
] satisfies RouteRecordRaw[]
