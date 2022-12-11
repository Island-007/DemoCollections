/*
 * @Author: zhangpeiwen
 * @Date: 2022-12-07 11:55:40
 * @LastEditTime: 2022-12-08 14:52:46
 * @LastEditors: zhangpeiwen
 * @Description: 
 * @FilePath: \LearnProject\vue-mobile-test\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'CountDownPage',
    component: () => import('@/views/CountDownPage/index.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
