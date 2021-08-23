import React, {useState, useRef, useEffect} from 'react';
import {Input, Button, Switch, Upload, notification} from 'antd';
import ImgCrop from 'antd-img-crop';
import { EditOutlined, DeleteOutlined, FileImageOutlined, CloseOutlined } from '@ant-design/icons';
import adminApi from '../../api/adminApi';
import {useTranslation} from "react-i18next";

import './links.style.scss';

const validURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

const CardLink = ({link, canEdit, getAllLinks, classCss=''}) => {
    const {t} = useTranslation('common');
    const [isEditTitle, setIsEditTitle] = useState(false);
    const [isEditUrl, setIsEditUrl] = useState(false);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const inputTitle = useRef(null);
    const inputUrl = useRef(null);
    const thumnailImage = useRef(null);

    const [menu, setMenu] = useState('');
    useEffect(() => {
        setTitle(link.title)
        setUrl(link.url)
    }, [])

    const updateLink = (title, value) => {
        if(title == 'url' && ( !validURL(value) || !value.includes('http'))) {
            getAllLinks();
            notification['error']({
                message: t('common:notification'),
                description: t('common:urlError')
            });
            setUrl('');
            return setIsEditUrl(false)
        }
        adminApi.updateLinksApi({
            link_id: link.id,
            title,
            value,
        }).then((res) => {
            getAllLinks()
            if(title == 'title') setIsEditTitle(false);
            if(title == 'url') setIsEditUrl(false);
            if(!res.data.success) {
                notification['error']({
                    message: t('common:notification'),
                    description: res.data.message
                });
            }
        }).catch(err => {
            console.log(err);
            getAllLinks()
            if(title == 'title') setIsEditTitle(false);
            if(title == 'url') setIsEditUrl(false);
        })
    }

    const keypressHandler = (event, title) => {
        if (event.key === "Enter") {
            if(title == 'title') inputTitle.current.blur();
            if(title == 'url') inputUrl.current.blur();
        }
    };

    const updateStatusLink = (checked) => {
        adminApi.updateLinksApi({
            link_id: link.id,
            title: 'is_delete',
            value: !checked,
        }).then().catch(err => {
            console.log(err);
        })
    }

    const removeLinks = () => {
        adminApi.removeLinkApi({
            link_id: link.id,
        }).then((res) => {
            if(res.data.success) {
                getAllLinks()
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const changeThumbnail = (files) => {
        if(files.status == 'uploading') {
            return;
        }
        let formData = new FormData();
        formData.append('image', files.originFileObj);
        formData.append('link_id', link.id);
        adminApi.updateThumbnailApi(formData).then((res) => {
            if(res.data.success) {
                getAllLinks()
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const removeThumbnail = () => {
        adminApi.updateLinksApi({
            link_id: link.id,
            title: 'icon',
            value: '#',
        }).then(res => {
            if(res.data.success) {
                getAllLinks()
                if(title == 'title') setIsEditTitle(false);
                if(title == 'url') setIsEditUrl(false);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className={`w-100 mt-40 ${classCss}`}>
            <div className="card card--style-inline card--style-inline-bg card--style-round-corners mb-0 my-card theme---card-link-admin" style={{display: 'inherit'}}>
                {
                    link && link.icon && 
                    <div className="card__icon">
                    </div>
                }
                <div className="card__details">
                    <div className="group-flex-custom1 mb-5px">
                        <div>
                            <Input placeholder="Title"
                                className="title-link-custom input-60vw"
                                ref={inputTitle}
                                hidden={!isEditTitle}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onBlur={(e) => {
                                    updateLink('title', e.target.value);
                                }}
                                onKeyPress={event => keypressHandler(event, 'title')}
                            />
                            <div className="row-custom" hidden={isEditTitle}>
                                <div className="title-link-custom theme---title-input">{link.title ? link.title : t('common:title')}</div>
                                {canEdit &&
                                    <Button 
                                        shape="circle" 
                                        icon={<EditOutlined />} 
                                        className="button-edit-custom theme---buttom-edit"
                                        onClick={async() => {
                                            await setIsEditTitle(true)
                                            inputTitle.current.focus({
                                                cursor: 'end',
                                            })
                                        }}
                                    />
                                }
                            </div>
                        </div>

                        <Switch defaultChecked={!link.is_delete} className="switch-custom theme---switch" onChange={updateStatusLink}/>
                    </div>

                    <Input placeholder="Url"
                        className="url-link-custom input-60vw"
                        ref={inputUrl}
                        hidden={!isEditUrl}
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onBlur={(e) => {
                            updateLink('url', e.target.value);
                        }}
                        onKeyPress={event => keypressHandler(event, 'url')}
                    />
                    <div className="row-custom" hidden={isEditUrl}>
                        <div className="url-link-custom theme---title-input">{link.url ? link.url : 'Url'}</div>
                        {canEdit && 
                            <Button 
                                shape="circle" 
                                icon={<EditOutlined />} 
                                className="button-edit-custom theme---buttom-edit"
                                onClick={async() => {
                                    await setIsEditUrl(true)
                                    inputUrl.current.focus({
                                        cursor: 'end',
                                    })
                                }}
                            />
                        }
                    </div>

                    <div className="group-flex-custom1 mt-5px">
                        <div>
                            <Button
                                icon={<FileImageOutlined />}
                                className="button-icon-custom theme---buttom-edit"
                                onClick={() => setMenu('thumnail')}
                            />  
                        </div>
                        <div>
                            <Button
                                icon={<DeleteOutlined />}
                                className="button-icon-custom theme---buttom-edit"
                                onClick={() => setMenu('delete')}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {
                menu == 'thumnail' &&
                <div className="theme---submenu">
                    <div className="custom-header mt-5px theme---sub-menu-header">
                        <h2 className="custom-title"> {t('common:addThumbnail')} </h2>
                        <Button icon={<CloseOutlined />} className="close-button theme---close-button" onClick={() => setMenu('')}/>
                    </div>
                    {
                        (!link || !link.icon || link.icon == '#') &&
                        <div className="group-card-custom theme---sub-menu-body">
                            <h3 className="custom-des">{t('common:addThumbnailDes')}</h3>
                            <ImgCrop rotate>
                                <Upload
                                    ref={thumnailImage}
                                    beforeUpload={() => {return true}}
                                    className="update-cpn"
                                    onChange={(e) => {
                                        changeThumbnail(e.file)
                                    }}
                                >
                                    <button 
                                        className="button--custom theme---button-primary"
                                    >
                                        {t('common:setThumbnail')}
                                    </button>
                                </Upload>
                            </ImgCrop>
                        </div>
                    }

                    {
                        link && link.icon && link.icon != '#' &&
                        <div className="group-card-custom theme---sub-menu-body" style={{minHeight: '140px'}}>
                            <img src={link.icon} style={{width: '96px', position: 'absolute'}}/>
                            <div style={{width: 'calc(100% - 120px)', float: 'right'}}>
                                <ImgCrop rotate>
                                    <Upload
                                        ref={thumnailImage}
                                        beforeUpload={() => {return true}}
                                        className="update-cpn"
                                        onChange={(e) => {
                                            changeThumbnail(e.file)
                                        }}
                                    >
                                        <button 
                                            className="button--custom theme---button-primary"
                                        >
                                            {t('common:change')}
                                        </button>
                                    </Upload>
                                </ImgCrop>
                                <button 
                                    className="button--custom mt-10 black-imp theme---button-remove" 
                                    onClick={() => removeThumbnail()}
                                >
                                    {t('common:remove')}
                                </button>
                            </div>
                        </div>
                    }
                </div>
            }

            {
                menu == 'delete' &&
                <div className="theme---submenu">
                    <div className="custom-header mt-5px theme---sub-menu-header">
                        <h2 className="custom-title">{t('common:delete')}</h2>
                        <Button icon={<CloseOutlined />} className="close-button theme---close-button" onClick={() => setMenu('')}/>
                    </div>
                    {
                        <div className="group-card-custom theme---sub-menu-body">
                            <h3 className="custom-des">{t('common:deleteForever')}</h3>
                            <button 
                                className="button--custom--cancel" 
                                onClick={() => setMenu('')}
                            >
                                {t('common:cancel')}
                            </button>
                            <button 
                                className="button--custom--delete theme---button-danger" 
                                onClick={() => removeLinks()}
                            >
                                {t('common:delete')}
                            </button>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

const ListLinks = ({listLinks, getAllLinks=null, canEdit=false}) => {
    return (
        <div>
            <div className="cards cards--11">
            {
                listLinks && 
                listLinks.map((link, index) => (
                        
                    <CardLink
                        classCss={index % 2 == 0 ? 'theme---admin-card-0' : 'theme---admin-card-1'}
                        key={link.id}
                        canEdit={canEdit}
                        link={link}
                        getAllLinks={getAllLinks}
                    />
                ))
            }
            </div>
        </div>
    )
}

export default ListLinks