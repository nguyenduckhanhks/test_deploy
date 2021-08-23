import React, {useState} from 'react';
import {notification} from 'antd';
import { useRouter } from "next/router";
import authApi from '../../api/authApi';
import CookieService from '../../services/cookies';
import { useTranslation } from "next-i18next";
import Link from 'next/link';
import styles from './signupForm.module.scss';

const SignupForm = () => {
    const {t} = useTranslation();
    const router = useRouter();
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
                router.push('/setting');

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

    return (
        <div className={`${styles["login-form"]}`}>
            <div id="LoginForm">
                <div className={`${styles["login-form__row"]}`}>
                    <label className={`${styles["login-form__label"]}`}>{t('common:username')}</label>
                    <input 
                        type="text" 
                        name="Name" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        className={`${styles["login-form__input"]}`}
                    />
                </div>
                <div className={`${styles["login-form__row"]}`}>
                    <label className={`${styles["login-form__label"]}`}>{t('common:email')}</label>
                    <input 
                        type="text" 
                        name="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        className={`${styles["login-form__input"]}`}
                    />
                </div>
                <div className={`${styles["login-form__row"]}`}>
                    <label className={`${styles["login-form__label"]}`}>{t('common:password')}</label>
                    <input 
                         type="password" 
                         name="password" 
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                        className={`${styles["login-form__input"]}`}
                    />
                </div>
                <div className={`${styles["login-form__row"]}`}>
                    <input 
                        type="submit" 
                        name="submit" 
                        className={`${styles["login-form__submit"]}`}
                        id="submit" 
                        value={t('common:signup').toString()}
                        onClick={() => onSignup()}
                    />
                </div>
            </div>
            <div className={`${styles["login-form__bottom"]}`}>
                <p>{t('common:alreadyHaveAccount')}</p>
                <Link href="/login">
                    <a className={`${styles["button-signup"]}`}>{t('common:login')}</a>
                </Link>
            </div>
        </div>
    )
}

export default SignupForm;