import axios from 'axios';
import CookieService from '../services/cookies';

const HOST = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

export const http = axios.create({
    baseURL: HOST
})

export const authHttp = () => {

    const ACCESS_TOKEN = CookieService.get('access_token') ? CookieService.get('access_token') : '';
    const TOKEN_TYPE = CookieService.get('token_type') ? CookieService.get('token_type') : '';

    return axios.create({
        baseURL: HOST,
        headers: {
            'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`
        }
    })
}
