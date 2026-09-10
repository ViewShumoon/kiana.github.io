import { type RouteRecordRaw } from 'vue-router'

export default [
    {
        path: '/Games',
        name: 'Games',
        component: () => import("@/views/Games/Games.vue"),
        meta: {
            title: "Games"
        }
    },
    {
        path: '/Games/Tetris',
        name: 'Tetris',
        component: () => import("@/views/Games/Tetris.vue"),
        meta: {
            title: "Tetris"
        }
    },
] satisfies RouteRecordRaw[]
