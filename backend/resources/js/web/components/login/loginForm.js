import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {notification} from 'antd';
import authApi from '../../api/authApi';
import CookieService from '../../cookies';
import {useTranslation} from "react-i18next";

const LoginForm = () => {
    const {t} = useTranslation('common');
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = () => {
        authApi.loginApi({email, password}).then(res => {
            if(res.data.success) {
                const options = res.data.expires_at ? {path:'/', expires:(new Date(res.data.expires_at))} : {path:'/'}
                CookieService.set('access_token', res.data.access_token, options);
                CookieService.set('token_type', res.data.token_type, options);

                window.localStorage.setItem('userInfo', JSON.stringify(res.data.data))
            } else {
                notification['error']({
                    message: t('common:notification'),
                    description: res.data.message
                });
            }
            return res;
        }).then((res) => {
            if(res.data.success) {
                history.push('/admin');
                notification['success']({
                    message: t('common:notification'),
                    description: t('common:loginSuccess')
                });
            }
        }).catch(err => {
            notification['error']({
                message: t('common:notification'),
                description: "t('common:loginError')"
            });
            console.log(err)
        })
    }

    return (
        <div className="login-form">
            <div id="LoginForm">
                <div className="login-form__row">
                    <label className="login-form__label">{t('common:email')}</label>
                    <input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" 
                        name="Email" 
                        className="login-form__input w-100 required" 
                    />
                </div>
                <div className="login-form__row">
                    <label className="login-form__label">{t('common:password')}</label>
                    <input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" 
                        name="password" 
                        className="w-100 login-form__input required" 
                    />
                </div>
                <div className="login-form__row">
                    <input 
                        type="submit" 
                        name="submit" 
                        className="login-form__submit button button--main button--full" 
                        id="submit" 
                        value={t('common:login')}
                        onClick={() => onLogin()}
                    />
                </div>
            </div>
            {/* <div className="login-form__forgot-pass">
                <a href="forgot-password.html">
                    Forgot Password?
                </a>
            </div>		 */}
            <div className="login-form__bottom">
                <p>{t('common:dontHaveAccount')}</p>
                <a href="/signup" className="button button--secondary button--full">{t('common:signup')}</a>
            </div>
        </div>
    )
}

export default LoginForm;