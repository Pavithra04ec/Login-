import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import post from '@/components/post'
import update from '@/components/update'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/listusers',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/add',
      name: 'post',
      component: post
     },
    {
      path:'/edit',
      name: 'update',
      component: update,
    //   props: (route) => ({
    //     value
    // })
    }
  ]
})
