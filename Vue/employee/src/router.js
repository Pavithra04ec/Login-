import listtab from './components/listtab'
import add from './components/add'

export const routes =
    [
        {
            path: '/user',
            name: 'listtab',
            component: listtab
        },
        {
            path: '/adduser',
            name: 'add',
            component: add
        },
    ]