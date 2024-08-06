import { type RouteRecordRaw } from "vue-router";

export default [
    {
        path: "/Random",
        name: "Random",
        component: () => import("@/views/Random/Random.vue"),
        redirect: { name: 'RandomString' },
        meta: {
            title: "Random",
        },
        children: [
            {
                path: "String",
                name: "RandomString",
                component: () => import("@/views/Random/RandomString.vue"),
                meta: {
                    title: "Random String",
                },
            },
            {
                path: "UserName",
                name: "RandomUserName",
                component: () =>
                    import("@/views/Random/RandomUserName.vue"),
                meta: {
                    title: "Random UserName",
                },
            },
        ],
    },
] satisfies RouteRecordRaw[];
