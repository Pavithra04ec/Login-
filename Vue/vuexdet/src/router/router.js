import HelloWorld from '../components/HelloWorld.vue'
import add from '../components/add.vue'

export const routes =
    [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/add',
            name: 'add',
            component: add
        }

    ]