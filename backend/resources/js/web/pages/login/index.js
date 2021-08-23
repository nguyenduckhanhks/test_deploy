import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import authApi from '../../api/authApi';
import LoginForm from '../../components/login/loginForm';
import logofull from '../../assets/images/linkt000-full.png';
import {useTranslation} from "react-i18next";

const LoginPage = () => {
    const history = useHistory();
    const {t} = useTranslation('common');
    useEffect(() => {
        checkLogin()
    },[])

    const checkLogin = () => {
        authApi.getProfileApi().then(res => {
            if(res.data.success) {
                history.push('/admin')
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="page page--login" data-page="login">

            <header className="header header--fixed">	
                <div className="header__inner">	
                    <div className="header__icon"></div>	
                </div>
            </header>

            <div className="login">
                <div className="login__content">	
                    <img src={logofull} className="logo-full"/>

                    <h2 className="login__title">{t('common:welcome')}</h2>
                    <p className="login__text">{t('common:loginToAccount')}</p>

                    <LoginForm/>

                </div>
            </div>
        </div>
    )
}

export default LoginPage;