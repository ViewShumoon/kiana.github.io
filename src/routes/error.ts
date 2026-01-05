import { type RouteRecordRaw } from "vue-router";

const blockList = [
    "wp-contents",
    "wp-admin",
    "wp-includes",
    "docker",
    ".git",
    ".ssh",
    ".env",
    "yarn.lock",
    "admin"
]


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
        redirect: to => {
            // 将错误的路径重定向到 /hackers.txt
            const path = to.path.toLowerCase();
            blockList.forEach(blocked => {
                if (path.includes(blocked)) {
                    window.location.href = '/hackers.txt';
                    return { path: '/hackers.txt'}
                }
                
            });

            return { path: '/Error'} ;
        },
    }
] satisfies RouteRecordRaw[];
