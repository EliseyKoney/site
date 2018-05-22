import Multimedia from './app/components/Multimedia'
import Notfound from './app/components/NotFound'
import Biographie from './app/components/Biographie'
import CV from './app/components/CV'
import App from './app/components/App'
import Home from './app/components/Home'


import Grid from './initial/Grid'
import { fetchPopularRepos } from './initial/api'

const routes = [
    {
        component: App,
        routes: [
            {
                path: '/',
                exact: true,
                component: Home,
            },
            {
                path: '/biographie',
                component: Biographie
            },
            {
                path: '/cv',
                component: CV
            },
            {
                path: '/multimedia',
                component: Multimedia
            },
            {
                path: '*',
                component: Notfound
            },
            {
                path: '/popular/:id',
                component: Grid,
                fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
            },
        ]
    }

]

export default routes