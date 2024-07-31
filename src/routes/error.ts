import { type RouteRecordRaw } from "vue-router";

export default [
    {
        path: "/Error",
        name: "Error",
        component: () => import("@views/Error.vue"),
        meta: {
            title: "Error",
        },
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: "/Error"
    }
] satisfies RouteRecordRaw[];
