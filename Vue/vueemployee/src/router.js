import HelloWorld from '../src/components/HelloWorld.vue'
import add from './components/add.vue'

export const routes =
    [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/adduser',
            name: 'add',
            component: add
        }
    ]