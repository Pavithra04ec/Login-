import HelloWorld from './components/HelloWorld.vue'
import add from './components/add.vue'
import edit from './components/Edit.vue'

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
            component:add
        },
        {
            path: '/edituser/:EmpId',
            name: 'edit',
            component:edit
        }
    ]