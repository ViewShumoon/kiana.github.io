import { type RouteRecordRaw } from "vue-router";

export default [
    {
        path: "/Command",
        name: "Command",
        component: () => import("@/views/Command/Command.vue"),
        redirect: { name: 'CommandTarkov' },
        meta: {
            title: "Command",
        },
        children: [
            // {
            //     path: "Give",
            //     name: "CommandGive",
            //     component: () => import("@/components/Command/Tarkov/CommandGive.vue"),
            //     meta: {
            //         title: "Command Give",
            //     },
            // },
            // {
            //     path: "Task",
            //     name: "CommandTask",
            //     component: () =>               
            //         import("@/components/Command/Tarkov/CommandTask.vue"),
            //     meta: {
            //         title: "Command Task",
            //     },
            // },
            {
                path: "Tarkov",
                name: "CommandTarkov",
                component: () =>               
                    import("@views/Command/CommandTarkov.vue"),
                meta: {
                    title: "Command Tarkov",
                },
            },
            {
                path: "Starsector",
                name: "CommandStarsector",
                component: () =>               
                    import("@views/Command/CommandStarsector.vue"),
                meta: {
                    title: "Command Starsector",
                },
            }
        ],
    },
] satisfies RouteRecordRaw[];
