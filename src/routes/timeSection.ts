import { type RouteRecordRaw } from 'vue-router'

export default [
    // {
    //     path: '/Time',
    //     redirect: "/TimeInterval"
    // },
    {
        path: '/TimeInterval',
        name: 'TimeInterval',
        component: () => import("@/views/TimeInterval.vue"),
        meta: {
            title: "Time Interval"
        }
    }
] satisfies RouteRecordRaw[]
