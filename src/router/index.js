import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [

    {
        path: '/',
        name:'home',
        components: {
            default: () => import('@/views/home/TheIndex.vue'),
            Navigation: () => import('@/layout/TheNavbar.vue'),
            Footer: () => import('@/layout/TheFooter.vue'),
        },
    },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
