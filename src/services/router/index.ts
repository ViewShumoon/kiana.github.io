import { createRouter, createWebHistory } from "vue-router"

import routes from "@routes/index";

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

// 全局前置守卫，这里可以加入用户登录判断
router.beforeEach((to, from, next) => {
    // 继续前进 next()
    // 返回 false 以取消导航
    next()
})

// 全局后置钩子，这里可以加入改变页面标题等操作
router.afterEach((to, from) => {
    const _title = to.meta.title
    if (_title) {
        window.document.title = _title as string
    }
})

export default router;