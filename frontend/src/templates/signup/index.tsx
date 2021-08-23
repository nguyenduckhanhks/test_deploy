import React from 'react';
import { useTranslation } from "next-i18next";
import SignupForm from '../../components/signup/signupForm';
import styles from './signup.module.scss';

const HOST = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

const SignupTemplate = () => {
    const { t } = useTranslation();

    return (
        <div className={`${styles["page--login"]}`} data-page="login">

            <div className={`${styles["login"]}`}>
                <div className={`${styles["login__content"]}`}>	
                    <img src={HOST + '/images/linkt000-full.png'} className={`${styles["logo-full"]}`}/>

                    <h2 className={`${styles["login__title"]}`}>{t('common:createAccount')}</h2>
                    <p className={`${styles["login__text"]}`}>{t('common:joinUs')}</p>

                    <SignupForm/>

                </div>
            </div>
        </div>
    )
}

export default SignupTemplate;