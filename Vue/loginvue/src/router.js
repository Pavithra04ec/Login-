import HelloWorld from './components/HelloWorld.vue'
import profile from './components/profile.vue'


export const routes = [
    {
        path:'*',
        redirect: {
            name: "HelloWorld"
        }
        //component : app
    },
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/profile/:Email',
        name: 'profile',
        component: profile
    }
]