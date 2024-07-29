import { type RouteRecordRaw } from "vue-router";

export default [
    {
        path: "/RandomString",
        name: "RandomString",
        component: () => import("@/views/RandomString.vue"),
        meta: {
            title: "RandomString",
        },
    },
    {
        path: "/RandomUserName",
        name: "RandomUserName",
        component: () => import("@/views/RandomUserName.vue"),
        meta: {
            title: "RandomUserName",
        },
    },
] satisfies RouteRecordRaw[];
