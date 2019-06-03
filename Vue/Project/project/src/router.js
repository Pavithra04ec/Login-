//import Vue from 'vue'
// import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import post from '@/components/post'
import update from '@/components/update'
import home from '@/components/header'
import pagenotfound from '@/components/pagenotfound'
//Vue.use(Router)

export const routes =
    [ {
        path:'/',
        redirect: {
            name: "home"
        }
        //component : app
    },
        {
            path: '/dashboard',
            name: 'home',
            component: home
        },
        {
            path: '/user',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/user/add',
            name: 'post',
            component: post
        },
        {
            path: '/user/edit/:id',
            name: 'update',
            component: update
        },
        {
            path: '/pagenotfound',
            name: 'pagenotfound',
            component: pagenotfound
        },
        {
            path: '*',
            redirect: '/pagenotfound'
        },    
    ]

