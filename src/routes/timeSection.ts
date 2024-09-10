import { type RouteRecordRaw } from 'vue-router'

export default {
    path: '/TimeSection',
    name: 'TimeSection',
    //alias : ["/section", "/time"],
    component: () => import("@views/TimeSection.vue"),
    meta: {
        title: "Time Section"    
    }
} satisfies RouteRecordRaw
