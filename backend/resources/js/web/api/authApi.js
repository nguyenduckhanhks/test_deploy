import { http, authHttp } from './http';

export default {
    loginApi: (data) => {
        return http.post('/api/admin/login', data)
    },
    logoutApi: () => {
        return authHttp().post('api/admin/logout')
    },
    signupApi: (data) => {
        return http.post('api/admin/signup', data)
    },
    getProfileApi: () => {
        return authHttp().get('api/admin/get-profile')
    },
    getUserApi: (data) => {
        return http.post('api/admin/get-user', data)
    },
}
