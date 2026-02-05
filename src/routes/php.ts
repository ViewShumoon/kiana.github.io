import { type RouteRecordRaw } from "vue-router";

export default [
    {
        path: "/:pathMatch(.*\\.php$)",
        name: "Php",
        component: () => import("@views/Php.vue"),
        props: true,
        meta: {
            title: "Php"    
        }
    },
] satisfies RouteRecordRaw[];
