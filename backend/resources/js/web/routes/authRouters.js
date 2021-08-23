import LoginPage from '../pages/login';
import SignupPage from '../pages/signup';

const authRouters = [
    {
        path: '/login',
        exact: true,
        main: () => <LoginPage/>
    },
    {
        path: '/signup',
        exact: true,
        main: () => <SignupPage/>
    }
];

export default authRouters;
