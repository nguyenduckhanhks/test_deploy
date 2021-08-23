import React, {useState, useEffect} from 'react';
import { Menu, Layout } from 'antd';
import {LogoutOutlined} from '@ant-design/icons';
import LinksManage from '../../components/admin/link-management';
import Socials from '../../components/admin/socials';
import Profile from '../../components/admin/profile';
import authApi from '../../api/authApi';
import CookieService from '../../services/cookies';
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import styles from './admin.module.scss';
import stylesThemes from '../../themes/index.module.scss';

const { Footer } = Layout;

const AdminTemplate = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const [current, setCurrent] = useState('');
    const [username, setUsername] = useState('');
    const [cover, setCover] = useState('');
    const [theme, setTheme] = useState('');

    useEffect(() => {
        checkLogin();
    }, []);

    const handleClick = (e: any) => {
        setCurrent(e.key)
    };

    const checkLogin = () => {
        authApi.getProfileApi().then(res => {
            if(!res.data.success) {
                return router.push('/login')
            }
            setUsername(res.data.data.username)
            setCover(res.data.data.cover_image)
            setTheme(res.data.data.theme);
        }).catch(err => {
            console.log(err);
            router.push('/login')
        })
    }

    const logout = () => {
        authApi.logoutApi().then(res => {
            CookieService.remove('access_token');
            CookieService.remove('token_type');
            window.localStorage.removeItem('userInfo');
            return res
        }).then(res => {
            if(res.data.success) {
                router.push('/login')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return(
        <div id={stylesThemes[theme]}>
            <div>
            
                <div className={`${styles["page-container"]} ${stylesThemes["theme---background-image-page"]}`} data-page="main" style={cover ?{background: `url(${cover}) no-repeat`, backgroundSize: 'cover'} : {}}>
                    
                    <header className={`${styles["page-header"]} ${stylesThemes["theme---header"]}`}>	
                        <div className={`${styles["header__inner"]}`}>	
                            <div className={`${styles["header__logo"]}`}>
                                <a href="/">
                                    <img className={`${styles["header__logo-custom"]}`} src="/images/logo-linktooo.png"/>    
                                </a>
                            </div>	
                            <div className={`${styles["header__icon-logout"]}`} data-panel="right">
                                <LogoutOutlined onClick={() => logout()} style={{fontSize: 20}}/>
                            </div>
                        </div>
                    </header>
                    
                    <div className={`${styles["page__content"]} ${stylesThemes["theme---admin-content"]}`} 
                        style={cover ? {background: '#f6f9fa00', paddingBottom: '300px'} : {paddingBottom: '300px'}}
                    >
                        <Menu onClick={(e) => handleClick(e)} selectedKeys={[current]} mode="horizontal">
                            <Menu.Item key="links" style={{width:"33.3%", textAlign: "center"}} className={`${stylesThemes["theme---menu"]} ${current=='links' || !current ? styles["selected"] + ' ' + stylesThemes["selected"] : ''}`}>
                                <h2>{t('common:links')}</h2>
                            </Menu.Item>
                            <Menu.Item key="socials" style={{width:"33.3%", textAlign: "center"}} className={`${stylesThemes["theme---menu"]} ${current=='socials' ? styles["selected"] + ' ' + stylesThemes["selected"] : ''}`}>
                                <h2>{t('common:socials')}</h2>
                            </Menu.Item>
                            <Menu.Item key="profile" style={{width:"33.3%", textAlign: "center"}} className={`${stylesThemes["theme---menu"]} ${current=='profile' ? styles["selected"] + ' ' + stylesThemes["selected"] : ''}`}>
                                <h2>{t('common:profile')}</h2>
                            </Menu.Item>
                        </Menu>
                        
                        {
                            (current == 'links' || !current) &&
                            <LinksManage/>
                        }

                        {
                            (current == 'socials') &&
                            <Socials/>
                        }

                        {
                            (current == 'profile') &&
                            <Profile/>
                        }
                        
                    </div>
                            
                </div>
            
            </div>
            <Footer className={`${styles["footer"]} ${stylesThemes["theme---admin-footer"]}`}>
                <a href={username} target="_blank" className={`${styles["link-admin"]} ${stylesThemes["theme---link-admin"]}`}>
                    {`linkt.ooo/${username}`}
                </a>
            </Footer>
        </div>
    )
}

export default AdminTemplate