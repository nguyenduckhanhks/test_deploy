import React, {useState, useEffect, useRef} from 'react';
import {notification, Button, Upload} from 'antd';
import ImgCrop from 'antd-img-crop';
import { EditOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import authApi from '../../../api/authApi';
import adminApi from '../../../api/adminApi';
import { useTranslation } from "next-i18next";
import styles from './profile.module.scss';
import stylesThemes from '../../../themes/index.module.scss';

const { TextArea } = Input;
const HOST = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

const Profile = () => {
    const {t} = useTranslation();
    const [username, setUsername] = useState('');
    const [profileTitle, setProfileTitle] = useState('');
    const [description, setDescription] = useState('');
    const [avatar, setAvatar] = useState('');
    const [cover, setCover] = useState('');
    const [userTheme, setUserTheme] = useState('');
    const [themes, setThemes] = useState([]);

    const profileTitleRef = useRef<any>(null);
    const usernameRef = useRef<any>(null);
    const bioRef = useRef<any>(null);

    useEffect(() => {
        getProfile()
        getAllThemes()
    }, [])

    const getProfile = () => {
        authApi.getProfileApi().then(res => {
            if(res.data.success) {
                setUsername(res.data.data.username);
                setProfileTitle(res.data.data.profile_title);
                setDescription(res.data.data.description);
                setAvatar(res.data.data.avatar);
                setCover(res.data.data.cover_image);
                setUserTheme(res.data.data.theme);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const changeTheme = (theme:any) => {
        adminApi.changeThemeApi({theme}).then(res => {
            if(res.data.success) {
                window.location.reload();
            }
        })
    }

    const getAllThemes = () => {
        adminApi.getAllThemesApi().then(res => {
            if(res.data.success) {
                setThemes(res.data.data)
            }
        })
    }

    const updateProfile = (title:any, value:any) => {
        adminApi.updateProfileApi({title, value}).then(res => {
            if(res.data.success) {
                getProfile()
            } else {
                notification['error']({
                    message: t('common:notification'),
                    description: t('common:inputNotEmpty')
                });
                getProfile()
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const updateAvt = (files:any) => {
        if(files.status == 'uploading') {
            return;
        }
        let formData = new FormData();
        formData.append('image', files.originFileObj);
        adminApi.updateAvtApi(formData).then(res => {
            if(res.data.success) {
                getProfile()
            }
        }).catch(err => {
            console.log(err)
        });
    }

    const updateCover = (files:any) => {
        if(files.status == 'uploading') {
            return;
        }
        let formData = new FormData();
        formData.append('image', files.originFileObj);
        adminApi.updateCoverApi(formData).then(res => {
            if(res.data.success) {
                window.location.reload();
            }
        }).catch(err => {
            console.log(err)
        });
    }

    // const removeAvt = () => {
    //     adminApi.updateProfileApi({
    //         title: 'avatar',
    //         value: '#'
    //     }).then(res => {
    //         if(res.data.success) {
    //             getProfile()
    //         }
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

    return(
        <div>
            <div className={`${styles["user-profile-container"]} ${stylesThemes["theme---profile-edit"]}`} style={cover ? {background: '#f6f9fa00'} : {}}>
                <div className={`${styles["user-profile__thumb"]} ${stylesThemes["theme---avatar"]}`}>
                    <img src={(avatar && avatar != '#') ? HOST + avatar : '/images/avatar-default.jpg'} alt="" title=""/>
                </div>
                <div className={`${styles["group-btn"]}`}>
                    <ImgCrop rotate>
                        <Upload
                            beforeUpload={() => {return true}}
                            className={`${styles["update-cpn"]}`}
                            onChange={(e) => {
                                updateAvt(e.file)
                            }}
                        >
                            <button 
                                className={`${styles["button--custom"]} ${stylesThemes["theme---button-primary"]}`}
                            >
                                {t('common:changeAvatar')}
                            </button>
                        </Upload>
                    </ImgCrop>
                    <Upload
                        beforeUpload={() => {return true}}
                        className={`${styles["update-cpn"]}`}
                        onChange={(e) => {
                            updateCover(e.file)
                        }}
                        accept=".png,.jpg,,.jpeg"
                    >
                        <button 
                            className={`${styles["button--custom"]} ${stylesThemes["theme---button-primary"]}`}
                        >
                            {t('common:changeBackground')}
                        </button>
                    </Upload>
                </div>

                <div className={`${styles["profile-form-row"]}`}>
                    <div>
                        <label className={`${styles["profile-title"]} ${stylesThemes["profile-title"]}`}>{t('common:profileTitle')}</label>
                        <Button 
                            shape="circle" 
                            icon={<EditOutlined />} 
                            className={`${styles["button-edit-custom-1"]} ${stylesThemes["theme---buttom-edit"]}`}
                            onClick={() => {
                                profileTitleRef.current.focus({
                                    cursor: 'end',
                                })
                            }}
                        />
                    </div>
                    <input 
                        type="text" 
                        name="profile title" 
                        value={profileTitle}
                        onChange={(e) => setProfileTitle(e.target.value)} 
                        className={`${styles["profile-form__input"]}`}
                        onBlur={e => {
                            updateProfile('profile_title', e.target.value)
                        }}
                        required
                        onFocus={e => {}}
                        ref={profileTitleRef}
                    />
                </div>
                <div className={`${styles["profile-form-row"]}`}>
                    <div>
                        <label className={`${styles["profile-title"]} ${stylesThemes["profile-title"]}`}>{t('common:username')}</label>
                        <Button 
                            shape="circle" 
                            icon={<EditOutlined />} 
                            className={`${styles["button-edit-custom-1"]} ${stylesThemes["theme---buttom-edit"]}`}
                            onClick={() => {
                                usernameRef.current.focus({
                                    cursor: 'end',
                                })
                            }}
                        />
                    </div>
                    <input 
                        type="text" 
                        name="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value.split(' ').join(''))} 
                        className={`${styles["profile-form__input"]}`}
                        onBlur={e => {
                            updateProfile('username', e.target.value.split(' ').join(''))
                        }}
                        required
                        onFocus={e => {}}
                        ref={usernameRef}
                    />
                </div>
                <div className={`${styles["profile-form-row"]}`}>
                    <div>
                        <label className={`${styles["profile-title"]} ${stylesThemes["profile-title"]}`}>{t('common:bio')}</label>
                        <Button 
                            shape="circle" 
                            icon={<EditOutlined />} 
                            className={`${styles["button-edit-custom-1"]} ${stylesThemes["theme---buttom-edit"]}`}
                            onClick={() => {
                                bioRef.current.focus({
                                    cursor: 'end',
                                })
                            }}
                        />
                    </div>
                    <TextArea 
                        rows={4} 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        className={`${styles["profile-form__textarea"]}`}
                        onBlur={e => {
                            updateProfile('description', e.target.value)
                        }}
                        required
                        onFocus={e => {}}
                        ref={bioRef}
                    />
                </div>

                <div className={`${styles["profile-form-row"]}`}>
                    <div>
                        <label className={`${styles["profile-title"]} ${stylesThemes["profile-title"]}`}>{t('common:themes')}</label>
                    </div>
                    <div className={`${styles["list--themes-button"]}`}>
                    {
                        themes.map((theme:any) => 
                            <button 
                                key={theme.id} 
                                className={`${styles["button-theme"]} ${styles[theme.name == userTheme ? 'active' : '']}`}
                                onClick={() => changeTheme(theme.name)}
                            >
                                <img src={HOST+theme.image} className={`${styles["image-theme"]}`}/>
                            </button>    
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile