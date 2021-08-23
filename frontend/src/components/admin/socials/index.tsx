import React, {useState, useEffect} from 'react';
import adminApi from '../../../api/adminApi';
import { useTranslation } from "next-i18next";
import styles from './socials.module.scss';
import stylesThemes from '../../../themes/index.module.scss';

const Socials = () => {
    const {t} = useTranslation();
    const [email, setEmail] = useState('');
    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [youtube, setYouTube] = useState('');
    const [tiktok, setTiktok] = useState('');

    useEffect(() => {
        getSocials()
    }, [])

    const getSocials = () => {
        adminApi.getAllSocialsApi().then((res) => {
            if(res.data.success) {
                setEmail(res.data.data.email)
                setFacebook(res.data.data.facebook)
                setTwitter(res.data.data.twitter)
                setInstagram(res.data.data.instagram)
                setLinkedin(res.data.data.linkedin)
                setYouTube(res.data.data.youtube)
                setTiktok(res.data.data.tiktok)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const updateSocials = (title:any, value:any) => {
        adminApi.updateSocialsApi({
            title,
            value,
        }).then(res => {
            if(res.data.success) {
                getSocials()
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div id="LoginForm" className={`${styles["theme---social-edit-form"]} ${stylesThemes["theme---social-edit-form"]}`}>
            <div className={`${styles["socials-form__row"]}`}>
                <label className={`${styles["socials-label"]} ${stylesThemes["socials-label"]}`}>{t('common:email')}</label>
                <input 
                    type="text" 
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    className={`${styles["socials-input"]}`} 
                    onBlur={e => { 
                        updateSocials('email', e.target.value)
                    }}
                    onFocus={e => {}}
                />
            </div>

            <div className={`${styles["socials-form__row"]}`}>
                <label className={`${styles["socials-label"]} ${stylesThemes["socials-label"]}`}>{t('common:facebook')}</label>
                <input 
                    type="text" 
                    name="facebook" 
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)} 
                    className={`${styles["socials-input"]}`} 
                    onBlur={e => { 
                        updateSocials('facebook', e.target.value)
                    }}
                    onFocus={e => {}}
                />
            </div>

            <div className={`${styles["socials-form__row"]}`}>
                <label className={`${styles["socials-label"]} ${stylesThemes["socials-label"]}`}>{t('common:twitter')}</label>
                <input 
                    type="text" 
                    name="twitter" 
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)} 
                    className={`${styles["socials-input"]}`} 
                    onBlur={e => { 
                        updateSocials('twitter', e.target.value)
                    }}
                    onFocus={e => {}}
                />
            </div>

            <div className={`${styles["socials-form__row"]}`}>
                <label className={`${styles["socials-label"]} ${stylesThemes["socials-label"]}`}>{t('common:instagram')}</label>
                <input 
                    type="text" 
                    name="instagram" 
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)} 
                    className={`${styles["socials-input"]}`} 
                    onBlur={e => { 
                        updateSocials('instagram', e.target.value)
                    }}
                    onFocus={e => {}}
                />
            </div>

            <div className={`${styles["socials-form__row"]}`}>
                <label className={`${styles["socials-label"]} ${stylesThemes["socials-label"]}`}>{t('common:linkedin')}</label>
                <input 
                    type="text" 
                    name="linkedin" 
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)} 
                    className={`${styles["socials-input"]}`} 
                    onBlur={e => { 
                        updateSocials('linkedin', e.target.value)
                    }}
                    onFocus={e => {}}
                />
            </div>

            <div className={`${styles["socials-form__row"]}`}>
                <label className={`${styles["socials-label"]} ${stylesThemes["socials-label"]}`}>{t('common:youtube')}</label>
                <input 
                    type="text" 
                    name="youtube" 
                    value={youtube}
                    onChange={(e) => setYouTube(e.target.value)} 
                    className={`${styles["socials-input"]}`} 
                    onBlur={e => { 
                        updateSocials('youtube', e.target.value)
                    }}
                    onFocus={e => {}}
                />
            </div>

            <div className={`${styles["socials-form__row"]}`}>
                <label className={`${styles["socials-label"]} ${stylesThemes["socials-label"]}`}>{t('common:tiktok')}</label>
                <input 
                    type="text" 
                    name="tiktok" 
                    value={tiktok}
                    onChange={(e) => setTiktok(e.target.value)} 
                    className={`${styles["socials-input"]}`} 
                    onBlur={e => { 
                        updateSocials('tiktok', e.target.value)
                    }}
                    onFocus={e => {}}
                />
            </div>
        </div>
    )
}

export default Socials