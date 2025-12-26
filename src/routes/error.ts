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
        redirect: to => {
            // 添加重定向规则，将包含 .php、/wp-contents 或 /wp-includes 的路径重定向到 /hackers.txt
            const path = to.path.toLowerCase();
            if (path.includes('.php') || path.includes('/wp-contents') || path.includes('/wp-includes')) {
                window.location.href = '/hackers.txt';
                return { path: '/hackers.txt'}
            }

            return { path: '/Error'} ;
        },
    }
] satisfies RouteRecordRaw[];
