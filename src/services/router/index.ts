import { createRouter, createWebHistory } from "vue-router"

import routes from "@routes/index";

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

// 全局前置守卫，这里可以加入用户登录判断
router.beforeEach((to, from, next) => {
 
    next()
})

// 全局后置钩子，这里可以加入改变页面标题等操作
router.afterEach((to, from) => {
    const title = to.meta.title
    if (title) {
        window.document.title = title as string
    }

    // const icon = to.meta.icon
    // if (icon) { 
        
    // }
})

export default router;
