import { type RouteRecordRaw } from "vue-router";

export default [
    {
        path: "/Tools/Random",
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
            {
                path: "TimestampId",
                name: "RandomTimestampId",
                component: () =>
                    import("@/views/Random/RandomTimestampId.vue"),
                meta: {
                    title: "Random TimestampId",
                },
            },
        ],
    },
] satisfies RouteRecordRaw[];
