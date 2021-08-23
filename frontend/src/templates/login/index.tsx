import React, {useEffect} from 'react';
import authApi from '../../api/authApi';
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import LoginForm from '../../components/login/loginForm';
import styles from './login.module.scss';

const HOST = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

const LoginTemplate = () => {
    const { t } = useTranslation();
    const router = useRouter();

    useEffect(() => {
        checkLogin()
    },[])

    const checkLogin = () => {
        authApi.getProfileApi().then(res => {
            if(res.data.success) {
                router.push('/setting')
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className={`${styles["page--login"]}`} data-page="login">

            <div className={`${styles["login"]}`}>
                <div className={`${styles["login__content"]}`}>	
                    <img src={HOST + '/images/linkt000-full.png'} className={`${styles["logo-full"]}`}/>

                    <h2 className={`${styles["login__title"]}`}>{t('common:welcome')}</h2>
                    <p className={`${styles["login__text"]}`}>{t('common:loginToAccount')}</p>

                    <LoginForm/>

                </div>
            </div>
        </div>
    )
}

export default LoginTemplate;