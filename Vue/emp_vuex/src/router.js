import HelloWorld from './components/HelloWorld.vue'
import edit from './components/edit.vue'

export const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/edit/:CategoryId',
        name: 'edit',
        component: edit
    }
]