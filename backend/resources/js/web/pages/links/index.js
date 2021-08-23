import React, {useState, useEffect} from 'react';
import  {Layout} from 'antd';
import Icon from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import adminApi from '../../api/adminApi';
import authApi from '../../api/authApi';
import defaultAvt from '../../assets/images/image-21.jpg';
import {YoutubeOutlined, FacebookOutlined, LinkedinOutlined, MailOutlined, TwitterOutlined, InstagramOutlined} from '@ant-design/icons'
import './links.style.scss';
import {useTranslation} from "react-i18next";

const {Footer} = Layout;

const LinksPage = () => {
    const {t} = useTranslation('common');
    const { _username } = useParams();
    const [email, setEmail] = useState('');
    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [youtube, setYouTube] = useState('');
    const [tiktok, setTiktok] = useState('');

    const [username, setUsername] = useState('');
    const [profileTitle, setProfileTitle] = useState('');
    const [description, setDescription] = useState('');
    const [avatar, setAvatar] = useState('');
    const [cover, setCover] = useState('');
    const [theme, setTheme] = useState('');

    const [listLinks, setListLinks] = useState([]);

    useEffect(() => {
        getAllLinks()
        getSocials()
        getUserProfile()
    }, [])

    const getFavicol = () => {
        return document.getElementById('favicon')
    }

    const getAllLinks = () => {
        adminApi.getLinksApi({username: _username}).then((res) => {
            if(res.data.success) {
                setListLinks(res.data.data)
            }
       }).catch(err => {
           console.log(err)
       })
    }

    const getSocials = () => {
        adminApi.getSocialsApi({username: _username}).then((res) => {
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

    const getUserProfile = () => {
        authApi.getUserApi({username: _username}).then(res => {
            if(res.data.success) {
                setUsername(res.data.data.username);
                setProfileTitle(res.data.data.profile_title);
                setDescription(res.data.data.description);
                setAvatar(res.data.data.avatar);
                setCover(res.data.data.cover_image);
                if(res.data.data.avatar && res.data.data.avatar != '#') { 
                    const favicon = getFavicol();
                    favicon.href = res.data.data.avatar
                }
                setTheme(res.data.data.theme);
                    document.title = res.data.data.profile_title ? '@' + res.data.data.username+ ' - ' + res.data.data.profile_title + ' | Linktooo' : res.data.data.username 
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return(
        <div id={theme} className="height100">
            <div className="theme---page-links height100" style={cover ? {background: `url(${cover}) no-repeat`} : {}}>
            
                <div className="page page-absolute page--main cover-bg" data-page="main">

                    <div className="page-scroll-links">
                        <div className="user-profile ml-0" style={{background: '#fff0'}}>
                            <div className="user-profile__thumb theme---avatar"><img src={avatar && avatar != '#' ? avatar : defaultAvt} alt="" title=""/></div>
                            <div className="user-profile__username">@{username}</div>
                            <div className="user-profile__name">{profileTitle ? profileTitle : username}</div>

                            <div className="description-custom">{description}</div>
                        </div>
                        
                        <div 
                            className="page__content page__content--with-header page__content--with-bottom-nav pt-0 height-scroll-link pt-5px"
                        >
                            {
                                listLinks && 
                                listLinks.map((link, index) => {
                                if(!link.title || !link.url) return;
                                return (
                                        
                                    <a href={link.url} className={`custom-card theme---link-card ${index % 2 == 0 ? 'theme---card-0' : 'theme---card-1'}`} key={link.id}>
                                        <div className={`custom-card-details flex mb-10 theme---link-card ${index % 2 == 0 ? 'theme---card-0' : 'theme---card-1'}`}>
                                            {
                                                link && link.icon && 
                                                <div className="card__icon ml-5px img-absolute">
                                                    <img src={link.icon} alt="" title="" className="br-10px"/>
                                                </div>
                                            }
                                            <div className="card-row-custom w-100 text-center theme---link-card">
                                                <div 
                                                    className={`card-title-link-custom theme---link-card theme---link-card-child ${index % 2 == 0 ? 'theme---card-0' : 'theme---card-1'}`}
                                                    style={!cover || cover == '#' ? {color: '#000', backgroundColor: '#e2e2e2'} : {}}
                                                >
                                                    {link.title ? link.title : 'Title'}
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                )})
                            }
                            
                        </div>
                    </div>
                            
                </div>

                <Footer className="footer-links">
                    <div className="list-socials">
                        {
                            email && 
                            <a href={"mailto:" + email} target="_blank" className="mr-10 theme---icon-social">
                                <Icon component={() =>
                                    <svg viewBox="0 -4 42 40" focusable="false" data-icon="tiktok" width="2em" height="2em" fill="currentColor" aria-hidden="true">
                                        <path d="M41.5 35h-40A1.5 1.5 0 010 33.5v-32A1.5 1.5 0 011.5 0h40A1.5 1.5 0 0143 1.5v32a1.5 1.5 0 01-1.5 1.5zM3 32h37V3H3z"/>
                                        <path d="M21.5 22a1.494 1.494 0 01-1.033-.412l-20-19A1.5 1.5 0 012.533.413L21.5 18.431 40.467.413a1.5 1.5 0 012.066 2.175l-20 19A1.494 1.494 0 0121.5 22z"/>
                                        <path d="M7.61 29.273a1.5 1.5 0 01-1.026-2.595l9.89-9.272a1.5 1.5 0 012.052 2.188l-9.891 9.273a1.494 1.494 0 01-1.025.406zM30.788 24.958a1.5 1.5 0 01-1.026-.406l-5.288-4.958a1.5 1.5 0 112.052-2.188l5.288 4.958a1.5 1.5 0 01-1.026 2.594zM35.39 29.27a1.358 1.358 0 01-.29-.03 2.288 2.288 0 01-.28-.08 2.148 2.148 0 01-.26-.14 2.11 2.11 0 01-.23-.19 1.5 1.5 0 01-.44-1.06 1.516 1.516 0 01.44-1.06 1.3 1.3 0 01.23-.18.939.939 0 01.26-.14 1.309 1.309 0 01.28-.09 1.5 1.5 0 11.29 2.97z"/>
                                    </svg>
                                } />
                            </a>
                        }

                        {
                            facebook && 
                            <a href={facebook} className="mr-10 theme---icon-social">
                                <Icon component={() =>
                                    <svg viewBox="0 0 45 40" focusable="false" data-icon="tiktok" width="2em" height="2em" fill="currentColor" aria-hidden="true">
                                        <path d="M37.5 43h-32A5.507 5.507 0 010 37.5v-32A5.507 5.507 0 015.5 0h32A5.507 5.507 0 0143 5.5v32a5.507 5.507 0 01-5.5 5.5zM5.5 3A2.5 2.5 0 003 5.5v32A2.5 2.5 0 005.5 40h32a2.5 2.5 0 002.5-2.5v-32A2.5 2.5 0 0037.5 3z"/>
                                        <path d="M23.5 37.439A1.5 1.5 0 0122.439 37 1.474 1.474 0 0122 35.939a1.371 1.371 0 01.03-.29 2.793 2.793 0 01.079-.29c.04-.089.091-.17.141-.259a2.1 2.1 0 01.189-.22 1.507 1.507 0 011.351-.41.869.869 0 01.279.08 2.225 2.225 0 01.261.139 1.422 1.422 0 01.23.191 2.113 2.113 0 01.19.22c.05.089.1.17.14.259a2.565 2.565 0 01.08.29 1.371 1.371 0 01.03.29A1.517 1.517 0 0124.56 37a1.5 1.5 0 01-1.06.439zM23.5 31.844a1.5 1.5 0 01-1.5-1.5V19.5a9.511 9.511 0 019.5-9.5 1.5 1.5 0 010 3 6.508 6.508 0 00-6.5 6.5v10.844a1.5 1.5 0 01-1.5 1.5z"/>
                                        <path d="M31.5 26h-12a1.5 1.5 0 010-3h12a1.5 1.5 0 010 3z"/>
                                    </svg>
                                } />
                            </a>
                        }

                        {
                            youtube && 
                            <a href={youtube} className="mr-10 theme---icon-social">
                                <YoutubeOutlined className="custom-icon" />
                            </a>
                        }

                        {
                            twitter && 
                            <a href={twitter} className="mr-10 theme---icon-social">
                                <Icon component={() =>
                                    <svg viewBox="0 -4 42 40" focusable="false" data-icon="tiktok" width="2em" height="2em" fill="currentColor" aria-hidden="true">
                                        <path d="M12.466 40.187a1.5 1.5 0 01-1.061-.44 1.5 1.5 0 010-2.119 1.547 1.547 0 012.121 0 1.481 1.481 0 01.44 1.059 1.519 1.519 0 01-.44 1.06 1.5 1.5 0 01-1.06.44z"/>
                                        <path d="M19.063 39.78a1.5 1.5 0 01-.226-2.982c8-1.23 14.361-5.269 17.018-10.806a21.785 21.785 0 00.463-16.676c-1.186-3-2.963-5.087-5-5.879a7.409 7.409 0 00-7.731 1.681c-1.964 2.117-2.325 5.555-.921 8.758a1.5 1.5 0 01-1.59 2.087 37.749 37.749 0 01-12.387-4.045 37.04 37.04 0 01-5.633-3.709c-.273 4.029.12 11.367 5.34 17.455a22.116 22.116 0 005.769 4.767 1.5 1.5 0 01.139 2.512 51.008 51.008 0 01-10.758 5.782 1.5 1.5 0 11-1.135-2.777 52.857 52.857 0 008.283-4.176 25.014 25.014 0 01-4.574-4.154C-1.64 18.568.023 7.165.435 4.971a1.5 1.5 0 012.492-.825A34.611 34.611 0 0010.1 9.272a34.421 34.421 0 009 3.287 10.567 10.567 0 012.288-9.482A10.411 10.411 0 0132.4.64c2.827 1.1 5.209 3.788 6.706 7.573a24.925 24.925 0 01-.548 19.076c-3.084 6.431-10.286 11.094-19.265 12.474a1.629 1.629 0 01-.23.017z"/>
                                        <path d="M13.138 26.085a16.891 16.891 0 01-1.757-.091 20.7 20.7 0 01-7.657-2.605 1.5 1.5 0 011.523-2.584 17.493 17.493 0 006.445 2.205 14.044 14.044 0 002.9 0 1.5 1.5 0 11.307 2.984 16.949 16.949 0 01-1.761.091zM38.077 11.275a1.483 1.483 0 01-.778-.219 1.5 1.5 0 01-.5-2.061L37.948 7.1l-1.712.114a1.5 1.5 0 01-.2-2.995l4.594-.3A1.5 1.5 0 0142.012 6.2l-2.652 4.355a1.5 1.5 0 01-1.283.72z"/>
                                    </svg>
                                } />
                            </a>
                        }

                        {
                            instagram && 
                            <a href={instagram} className="mr-10 theme---icon-social">
                                <Icon component={() =>
                                    <svg viewBox="0 0 43 40" focusable="false" data-icon="tiktok" width="2em" height="2em" fill="currentColor" aria-hidden="true">
                                        <path d="M41.5 28.5a1.558 1.558 0 01-.57-.11 1.527 1.527 0 01-.491-.33 1.5 1.5 0 010-2.121 1.566 1.566 0 01.231-.189 2.153 2.153 0 01.26-.141 2.423 2.423 0 01.28-.079 1.5 1.5 0 11.29 2.97z"/>
                                        <path d="M33.5 43h-24A9.511 9.511 0 010 33.5v-24A9.511 9.511 0 019.5 0h24A9.511 9.511 0 0143 9.5v11.208a1.5 1.5 0 01-3 0V9.5A6.508 6.508 0 0033.5 3h-24A6.508 6.508 0 003 9.5v24A6.508 6.508 0 009.5 40h24a6.508 6.508 0 006.5-6.5 1.5 1.5 0 013 0 9.511 9.511 0 01-9.5 9.5z"/>
                                        <path d="M21.5 33A11.5 11.5 0 1133 21.5 11.513 11.513 0 0121.5 33zm0-20a8.5 8.5 0 108.5 8.5 8.51 8.51 0 00-8.5-8.5zM34 12a2 2 0 112-2 2 2 0 01-2 2zm0-3a1 1 0 101 1 1 1 0 00-1-1z"/>
                                    </svg>
                                } />
                            </a>
                        }

                        {
                            tiktok && 
                            <a href={tiktok} className="mr-10 theme---icon-social">
                                <Icon component={() =>
                                    <svg viewBox="-32 0 512 512" focusable="false" data-icon="tiktok" width="2em" height="2em" fill="currentColor" aria-hidden="true">
                                        <path xmlns="http://www.w3.org/2000/svg" d="m432.734375 112.464844c-53.742187 0-97.464844-43.722656-97.464844-97.464844 0-8.285156-6.71875-15-15-15h-80.335937c-8.285156 0-15 6.714844-15 15v329.367188c0 31.59375-25.703125 57.296874-57.300782 57.296874-31.59375 0-57.296874-25.703124-57.296874-57.296874 0-31.597657 25.703124-57.300782 57.296874-57.300782 8.285157 0 15-6.714844 15-15v-80.335937c0-8.28125-6.714843-15-15-15-92.433593 0-167.632812 75.203125-167.632812 167.636719 0 92.433593 75.199219 167.632812 167.632812 167.632812 92.433594 0 167.636719-75.199219 167.636719-167.632812v-145.792969c29.855469 15.917969 63.074219 24.226562 97.464844 24.226562 8.285156 0 15-6.714843 15-15v-80.335937c0-8.28125-6.714844-15-15-15zm-15 79.714844c-32.023437-2.664063-62.433594-13.851563-88.707031-32.75-4.566406-3.289063-10.589844-3.742188-15.601563-1.171876-5.007812 2.5625-8.15625 7.71875-8.15625 13.347657v172.761719c0 75.890624-61.746093 137.632812-137.636719 137.632812-75.890624 0-137.632812-61.742188-137.632812-137.632812 0-70.824219 53.773438-129.328126 122.632812-136.824219v50.8125c-41.015624 7.132812-72.296874 42.984375-72.296874 86.011719 0 48.136718 39.160156 87.300781 87.296874 87.300781 48.140626 0 87.300782-39.164063 87.300782-87.300781v-314.367188h51.210937c6.871094 58.320312 53.269531 104.71875 111.589844 111.589844zm0 0"/>
                                    </svg>
                                } />
                            </a>
                        }
                        <Icon type="home" />

                        {  
                            linkedin && 
                            <a href={linkedin} className="mr-10 theme---icon-social">
                                <LinkedinOutlined className="custom-icon" />
                            </a>
                        }
                    </div>
                    <a href="/" className="theme---footer footer-logo">
                        <img className="logo-footer" src="/images/logo-linktooo.png"/>    
                    </a>
                </Footer>
            
            </div>
        </div>
    )
}

export default LinksPage