import HomePage from '../pages/home';
import AdminPage from '../pages/admin';
import LinksPage from '../pages/links';

const homeRouters = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage/>
    },
    {
        path: '/admin/:_current',
        exact: true,
        main: () => <AdminPage/>
    },
    {
        path: '/admin',
        exact: true,
        main: () => <AdminPage/>
    },
    {
        path: '/:_username',
        exact: true,
        main: () => <LinksPage/>
    }
];

export default homeRouters;
