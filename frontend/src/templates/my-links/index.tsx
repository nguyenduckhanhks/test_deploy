import React, {useState, useEffect} from "react";
import  {Layout} from 'antd';
import {YoutubeOutlined, LinkedinOutlined} from '@ant-design/icons'
import Head from 'next/head'
import Icon from '@ant-design/icons';
import { useTranslation } from "next-i18next";
import adminApi from '../../api/adminApi';
import authApi from '../../api/authApi';
import styles from './my-links.module.scss';
import stylesThemes from '../../themes/index.module.scss';

const {Footer} = Layout;

const HOST = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

export const MyLinksTemplate = ({linksData, socialsData, profileData}:any) => {
    const { t } = useTranslation();

    const [email, setEmail] = useState(socialsData.email);
    const [facebook, setFacebook] = useState(socialsData.facebook);
    const [twitter, setTwitter] = useState(socialsData.twitter);
    const [instagram, setInstagram] = useState(socialsData.instagram);
    const [linkedin, setLinkedin] = useState(socialsData.linkedin);
    const [youtube, setYouTube] = useState(socialsData.youtube);
    const [tiktok, setTiktok] = useState(socialsData.tiktok);

    const [username, setUsername] = useState(profileData.username);
    const [profileTitle, setProfileTitle] = useState(profileData.profileTitle);
    const [description, setDescription] = useState(profileData.description);
    const [avatar, setAvatar] = useState(profileData.avatar);
    const [cover, setCover] = useState(profileData.cover);
    const [theme, setTheme] = useState(profileData.theme);

    const [listLinks, setListLinks] = useState<any[]>(linksData);

    useEffect(() => {
        getAllLinks();
        getSocials();
        getUserProfile();
    }, [linksData, socialsData, profileData])

    const getAllLinks = () => {
    //     adminApi.getLinksApi({username:_username}).then((res) => {
    //         if(res.data.success) {
    //             setListLinks(res.data.data)
    //         }
    //    }).catch()
        setListLinks(linksData)
    }

    const getSocials = () => {
        // adminApi.getSocialsApi({username: _username}).then((res) => {
        //     if(res.data.success) {
                setEmail(socialsData.email)
                setFacebook(socialsData.facebook)
                setTwitter(socialsData.twitter)
                setInstagram(socialsData.instagram)
                setLinkedin(socialsData.linkedin)
                setYouTube(socialsData.youtube)
                setTiktok(socialsData.tiktok)
        //     }
        // }).catch()
    }

    const getUserProfile = () => {
        // authApi.getUserApi({username: _username}).then(res => {
        //     if(res.data.success) {
                setUsername(profileData.username);
                setProfileTitle(profileData.profile_title);
                setDescription(profileData.description);
                setAvatar(profileData.avatar);
                setCover(profileData.cover_image);
                setTheme(profileData.theme);
        //     }
        // }).catch()
    }

    return (
        <div id={stylesThemes[theme]} className={styles["page-container"]}>
            <Head>
                <title>{profileTitle ? '@' + username + ' - ' + profileTitle + ' | Linktooo' : username }</title>
                <meta name="description" content={description} />
                <link rel="icon" href={HOST + avatar} />
                <meta property="og:title" content={profileTitle ? '@' + username + ' - ' + profileTitle + ' | Linktooo' : username} />
                <meta property="og:image" content={avatar && avatar != '#' ? HOST + avatar : '/images/avatar-default.jpg'}/>
            </Head>
            <div 
                className={`${stylesThemes["theme---page-links"]} ${styles["page-cover"]}`} 
                style={cover ? {background: `url(${HOST + cover}) no-repeat`, backgroundSize: 'cover'} : {}}
            >
            
                <div className={styles['page-body']} data-page="main">

                    <div className={styles["page-scroll-links"]}>
                        <div>
                            <div className={`${styles["user-profile_thumb"]} ${stylesThemes["theme---avatar"]}`}><img src={avatar && avatar != '#' ? HOST + avatar : '/images/avatar-default.jpg'} alt="" title=""/></div>
                            <div className={`${styles["user-profile__username"]} ${stylesThemes["user-profile__username"]}`}>@{username}</div>
                            <div className={`${styles["user-profile__name"]} ${stylesThemes["user-profile__username"]}`}>{profileTitle ? profileTitle : username}</div>

                            <div className={`${styles["user-profile__description"]} ${stylesThemes["user-profile__username"]}`}>{description}</div>
                        </div>
                        
                        <div className={`${styles['list-links']}`}>
                            {
                                listLinks && 
                                listLinks.map((link, index) => {
                                if(!link.title || !link.url) return;
                                return (
                                        
                                    <a href={link.url} className={`${styles["links-card"]} ${stylesThemes["theme---link-card"]} ${stylesThemes[index % 2 == 0 ? 'theme---card-0' : 'theme---card-1']}`} key={link.id}>
                                        <div className={`${styles["links-card-detail"]} ${stylesThemes["theme---link-card"]} ${stylesThemes["theme---link-card-parent"]} ${stylesThemes[index % 2 == 0 ? 'theme---card-0' : 'theme---card-1']}`}>
                                            {
                                                link && link.icon && 
                                                <div className={`${styles["img-links"]}`}>
                                                    <img src={HOST + link.icon} alt="" title="" className="br-10px"/>
                                                </div>
                                            }
                                            <div 
                                                className={`${styles["card-link-url"]} ${stylesThemes["theme---link-card"]} ${stylesThemes["theme---link-card-child"]} ${stylesThemes[index % 2 == 0 ? 'theme---card-0' : 'theme---card-1']}`}
                                                // style={!cover || cover == '#' ? {color: '#000', backgroundColor: '#e2e2e2'} : {}}
                                            >
                                                {link.title ? link.title : 'Title'}
                                            </div>
                                        </div>
                                    </a>
                                )})
                            }
                            
                        </div>
                    </div>
                            
                </div>
                <div style={{height: '100px'}}></div>

                <Footer className={`${styles["footer-links"]}`}>
                    <div className={`${styles["list-socials"]}`}>
                        {
                            email && 
                            <a href={"mailto:" + email} target="_blank" className={`${stylesThemes["theme---icon-social"]}`}>
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
                            <a href={facebook} className={`${stylesThemes["theme---icon-social"]}`}>
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
                            <a href={youtube} className={`${stylesThemes["theme---icon-social"]}`}>
                                <YoutubeOutlined className="custom-icon" style={{fontSize: '32px'}}/>
                            </a>
                        }

                        {
                            twitter && 
                            <a href={twitter} className={`${stylesThemes["theme---icon-social"]}`}>
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
                            <a href={instagram} className={`${stylesThemes["theme---icon-social"]}`}>
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
                            <a href={tiktok} className={`${stylesThemes["theme---icon-social"]}`}>
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
                            <a href={linkedin} className={`${stylesThemes["theme---icon-social"]}`}>
                                <LinkedinOutlined className="custom-icon" style={{fontSize: '32px'}}/>
                            </a>
                        }
                    </div>
                    <a href="/" className={`${stylesThemes["theme---footer"]} ${styles["footer-logo"]}`}>
                        <img className={styles["logo-footer"]} src="/images/logo-linktooo.png"/>    
                    </a>
                </Footer>
            
            </div>
        </div>
    )
}