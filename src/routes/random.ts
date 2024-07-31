import { type RouteRecordRaw } from "vue-router";

export default [
    {
        path: "/Random",
        name: "Random",
        component: () => import("@views/Random.vue"),
        redirect: { name: 'RandomString' },
        meta: {
            title: "Random",
        },
        children: [
            {
                path: "String",
                name: "RandomString",
                component: () => import("@/components/Random/RandomString.vue"),
                meta: {
                    title: "Random String",
                },
            },
            {
                path: "UserName",
                name: "RandomUserName",
                component: () =>
                    import("@/components/Random/RandomUserName.vue"),
                meta: {
                    title: "Random UserName",
                },
            },
        ],
    },
] satisfies RouteRecordRaw[];
