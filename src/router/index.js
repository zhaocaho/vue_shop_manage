import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/login.vue'
import Home from '@/components/home/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: login, name: 'login' },
  { path: '/home', component: Home, name: 'home' }
]

const router = new VueRouter({
  routes
})
// 配置路由守卫，根据token来确定用户是否有资格获取内容

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.path === '/login') {
    return next()
  }
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  next()
})
export default router
