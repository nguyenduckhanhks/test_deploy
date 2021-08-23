import React, {useState, useEffect, useRef} from 'react';
import {notification, Button, Upload} from 'antd';
import ImgCrop from 'antd-img-crop';
import { EditOutlined } from '@ant-design/icons';
import defaultAvt from '../../assets/images/image-21.jpg';
import { Input } from 'antd';
import authApi from '../../api/authApi';
import adminApi from '../../api/adminApi';
import {HOST} from '../../constants';
import './profile.style.scss'
import {useTranslation} from "react-i18next";

const { TextArea } = Input;

const Profile = () => {
    const {t} = useTranslation('common');
    const [username, setUsername] = useState('');
    const [profileTitle, setProfileTitle] = useState('');
    const [description, setDescription] = useState('');
    const [avatar, setAvatar] = useState('');
    const [cover, setCover] = useState('');
    const [userTheme, setUserTheme] = useState('');
    const [themes, setThemes] = useState([]);

    const imageAvt = useRef(null);
    const profileTitleRef = useRef(null);
    const usernameRef = useRef(null);
    const bioRef = useRef(null);

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

    const changeTheme = (theme) => {
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

    const updateProfile = (title, value) => {
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

    const updateAvt = (files) => {
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

    const updateCover = (files) => {
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
            <div className="user-profile mb-20 theme---profile-edit" style={cover ? {background: '#f6f9fa00'} : {}}>
                <div className="user-profile__thumb theme---avatar">
                    <img src={(avatar && avatar != '#') ? HOST + avatar : defaultAvt} alt="" title=""/>
                </div>
                <div className="group-btn">
                    <ImgCrop rotate>
                        <Upload
                            beforeUpload={() => {return true}}
                            className="update-cpn"
                            onChange={(e) => {
                                updateAvt(e.file)
                            }}
                        >
                            <button 
                                className="button--custom theme---button-primary"
                            >
                                {t('common:changeAvatar')}
                            </button>
                        </Upload>
                    </ImgCrop>
                    <Upload
                        beforeUpload={() => {return true}}
                        className="update-cpn"
                        onChange={(e) => {
                            updateCover(e.file)
                        }}
                        accept=".png,.jpg,,.jpeg"
                    >
                        <button 
                            className="button--custom theme---button-primary"
                        >
                            {t('common:changeBackground')}
                        </button>
                    </Upload>
                </div>

                <div className="login-form__row mw-90 ml-5">
                    <div>
                        <label className="login-form__label text-black inline-imp">{t('common:profileTitle')}</label>
                        <Button 
                            shape="circle" 
                            icon={<EditOutlined />} 
                            className="button-edit-custom-1 theme---buttom-edit"
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
                        className="login-form__input"
                        onBlur={e => {
                            updateProfile('profile_title', e.target.value)
                        }}
                        required
                        onFocus={e => {}}
                        ref={profileTitleRef}
                    />
                </div>
                <div className="login-form__row mw-90 ml-5">
                    <div>
                        <label className="login-form__label text-black inline-imp">{t('common:username')}</label>
                        <Button 
                            shape="circle" 
                            icon={<EditOutlined />} 
                            className="button-edit-custom-1 theme---buttom-edit"
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
                        className="login-form__input" 
                        onBlur={e => {
                            updateProfile('username', e.target.value.split(' ').join(''))
                        }}
                        required
                        onFocus={e => {}}
                        ref={usernameRef}
                    />
                </div>
                <div className="login-form__row mw-90 ml-5">
                    <div>
                        <label className="login-form__label text-black inline-imp">{t('common:bio')}</label>
                        <Button 
                            shape="circle" 
                            icon={<EditOutlined />} 
                            className="button-edit-custom-1 theme---buttom-edit"
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
                        className="mw-100"
                        onBlur={e => {
                            updateProfile('description', e.target.value)
                        }}
                        required
                        onFocus={e => {}}
                        ref={bioRef}
                    />
                </div>

                <div className="login-form__row mw-90 ml-5">
                    <div>
                        <label className="login-form__label text-black inline-imp">{t('common:themes')}</label>
                    </div>
                    <div className="list--themes-button">
                    {
                        themes.map(theme => 
                            <button 
                                key={theme.id} 
                                className={`button-theme ${theme.name == userTheme && 'active'}`}
                                onClick={() => changeTheme(theme.name)}
                            >
                                <img src={theme.image} className="image-theme"/>
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