import React, {useState, useEffect} from 'react';
import { Menu, Layout } from 'antd';
import {LogoutOutlined} from '@ant-design/icons';
import { useParams, useHistory } from 'react-router-dom';
import LinksManage from '../../components/links/linksManage';
import Socials from '../../components/socials';
import Profile from '../../components/profile';
import authApi from '../../api/authApi';
import CookieService from '../../cookies';
import {useTranslation} from "react-i18next";

const { SubMenu } = Menu;
const { Footer } = Layout;

const AdminPage = () => {
    const {t} = useTranslation('common');
    const { _current } = useParams();
    const [current, setCurrent] = useState('');
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [cover, setCover] = useState('');
    const [theme, setTheme] = useState('');

    useEffect(() => {
        setCurrent(_current);
        checkLogin();
    }, []);

    const handleClick = e => {
        setCurrent(e.key)
    };

    const checkLogin = () => {
        authApi.getProfileApi().then(res => {
            if(!res.data.success) {
                return history.push('/login')
            }
            setUsername(res.data.data.username)
            setCover(res.data.data.cover_image)
            setTheme(res.data.data.theme);
        }).catch(err => {
            console.log(err);
            history.push('/login')
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
                history.push('/login')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return(
        <div id={theme}>
            <div>
            
                <div className="page page--main theme---background-image-page" data-page="main" style={cover ?{background: `url(${cover}) no-repeat`, backgroundSize: 'cover'} : {}}>
                    
                    <header className="header header--page header--fixed theme---header">	
                        <div className="header__inner">	
                            <Menu expandIcon={<div/>} className="menu-custom" mode="inline">
                                {/* <SubMenu icon={<MenuOutlined />} key="1">
                                    <Menu.Item key="9" onClick={() => logout()}>Logout</Menu.Item>
                                </SubMenu> */}
                            </Menu>
                            <div className="header__logo header__logo__admin header__logo--text">
                                <a href="/">
                                    <img className="logo-custom" src="/images/logo-linktooo.png"/>    
                                </a>
                            </div>	
                            <div className="header__icon header__icon__admin open-panel" data-panel="right">
                                <LogoutOutlined onClick={() => logout()} style={{fontSize: 20}}/>
                            </div>
                        </div>
                    </header>
                    
                    <div className="page__content page__content--with-header page__content--with-bottom-nav height-scroll-link-admin theme---admin-content" 
                        style={cover ? {background: '#f6f9fa00', paddingBottom: '300px'} : {paddingBottom: '300px'}}
                    >
                        <Menu onClick={(e) => handleClick(e)} selectedKeys={[current]} mode="horizontal">
                            <Menu.Item key="links" style={{width:"33.3%", textAlign: "center"}} className="theme---menu">
                                <h2 className="p0">{t('common:links')}</h2>
                            </Menu.Item>
                            <Menu.Item key="socials" style={{width:"33.3%", textAlign: "center"}} className="theme---menu">
                                <h2 className="p0">{t('common:socials')}</h2>
                            </Menu.Item>
                            <Menu.Item key="profile" style={{width:"33.3%", textAlign: "center"}} className="theme---menu">
                                <h2 className="p0">{t('common:profile')}</h2>
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
            <Footer className="footer theme---admin-footer">
                <a href={username} target="_blank" className="result-link theme---link-admin">
                    {`linkt.ooo/${username}`}
                </a>
            </Footer>
        </div>
    )
}

export default AdminPage