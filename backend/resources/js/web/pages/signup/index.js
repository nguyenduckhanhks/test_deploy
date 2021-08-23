import React from 'react';
import iconBack from '../../assets/images/arrow-back.svg';
import SignupForm from '../../components/signup/signupForm';
import logofull from '../../assets/images/linkt000-full.png';
import {useTranslation} from "react-i18next";

const SignupPage = () => {
    const {t} = useTranslation('common');

    return (
        <div className="page page--login" data-page="login">
	
            <header className="header header--fixed">	
                <div className="header__inner">	
                    <div className="header__icon">
                        <a href="/login">
                            <img src={iconBack} alt="" title=""/>
                        </a>
                    </div>	
                </div>
            </header>
	
            <div className="login">
                <div className="login__content">	
                    <img src={logofull} className="logo-full"/>
                    <h2 className="login__title">{t('common:createAccount')}</h2>
                    <p className="login__text">{t('common:joinUs')}</p>
                    <SignupForm/>
                </div>
            </div>
        </div>
    )
}

export default SignupPage