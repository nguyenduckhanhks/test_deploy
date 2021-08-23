import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {notification} from 'antd';
import authApi from '../../api/authApi';
import CookieService from '../../cookies';
import {useTranslation} from "react-i18next";

const SignupForm = () => {
    const {t} = useTranslation('common');
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignup = () => {
        authApi.signupApi({username,email,password}).then(res => {
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
                    description: t('common:signupSuccess')
                });

                // mailApi.sendMailSignup()
            }
        }).catch(err => {
            notification['error']({
                message: t('common:notification'),
                description: t('common:signupError')
            });
            console.log(err)
        })
    }
    
    return(
        <div className="login-form">
            <div id="LoginForm">
                <div className="login-form__row">
                    <label className="login-form__label">{t('common:username')}</label>
                    <input 
                        type="text" 
                        name="Name" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        className="login-form__input required" 
                    />
                </div>
                <div className="login-form__row">
                    <label className="login-form__label">{t('common:email')}</label>
                    <input 
                        type="text" 
                        name="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        className="login-form__input required email" 
                    />
                </div>
                <div className="login-form__row">
                    <label className="login-form__label">{t('common:password')}</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-form__input required" 
                    />
                </div>
                <div className="login-form__row">
                    <input 
                        type="submit" 
                        name="submit" 
                        className="login-form__submit button button--main button--full" 
                        id="submit" 
                        onClick={() => onSignup()}
                        value={t('common:signup')}
                    />
                </div>
            </div>	
            <div className="login-form__bottom">
                <p>{t('common:alreadyHaveAccount')}</p>
                <a href="/login" className="button button--secondary button--full">{t('common:login')}</a>
            </div>
        </div>
    )
}

export default SignupForm