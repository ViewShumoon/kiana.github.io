import { type RouteRecordRaw } from 'vue-router'

export default [
    {
        path: '/Tools/Permutations',
        name: 'Permutations',
        component: () => import("@/views/Tools/Permutations.vue"),
        meta: {
            title: "Permutations"
        }
    }
] satisfies RouteRecordRaw[]
