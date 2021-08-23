import React, {useState, useRef, useEffect} from 'react';
import {Input, Button, Switch, Upload, notification} from 'antd';
import ImgCrop from 'antd-img-crop';
import { EditOutlined, DeleteOutlined, FileImageOutlined, CloseOutlined } from '@ant-design/icons';
import adminApi from '../../../api/adminApi';
import { useTranslation } from "next-i18next";
import styles from './link-management.module.scss';
import stylesThemes from '../../../themes/index.module.scss';
import 'antd/dist/antd.css';

const HOST = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

const validURL = (str: any) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

const CardLink = ({link, canEdit, getAllLinks, classCss=''}: any) => {
    const {t} = useTranslation();
    const [isEditTitle, setIsEditTitle] = useState(false);
    const [isEditUrl, setIsEditUrl] = useState(false);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const inputTitle = useRef<any>(null);
    const inputUrl = useRef<any>(null);
    const thumnailImage = useRef(null);

    const [menu, setMenu] = useState('');
    useEffect(() => {
        setTitle(link.title)
        setUrl(link.url)
    }, [])

    const updateLink = (title: any, value: any) => {
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

    const keypressHandler = (event:any, title:any) => {
        if (event.key === "Enter") {
            if(title == 'title') inputTitle?.current?.blur();
            if(title == 'url') inputUrl.current.blur();
        }
    };

    const updateStatusLink = (checked:any) => {
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

    const changeThumbnail = (files:any) => {
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
        <div className={`${styles["card-links"]} ${stylesThemes[classCss]}`}>
            <div className={`${styles["main-card"]} ${stylesThemes["theme---card-link-admin"]}`} style={{display: 'inherit'}}>
                <div className={`${styles["card__details"]}`}>
                    <div className={`${styles["card__title"]}`}>
                        <div>
                            <Input placeholder="Title"
                                className={`${styles["title_input"]}`}
                                ref={inputTitle}
                                hidden={!isEditTitle}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onBlur={(e) => {
                                    updateLink('title', e.target.value);
                                }}
                                onKeyPress={event => keypressHandler(event, 'title')}
                            />
                            <div className={`${styles["row"]}`} hidden={isEditTitle}>
                                <div className={`${styles["title_link"]} ${stylesThemes["theme---title-input"]}`}>{link.title ? link.title : t('common:title')}</div>
                                {canEdit &&
                                    <Button 
                                        shape="circle" 
                                        icon={<EditOutlined />} 
                                        className={`${styles["button-edit"]} ${stylesThemes["theme---buttom-edit"]}`}
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

                        <Switch defaultChecked={!link.is_delete} className={`${styles["switch-custom"]} ${stylesThemes["theme---switch"]}`} onChange={updateStatusLink}/>
                    </div>

                    <Input placeholder="Url"
                        className={`${styles["url-input"]}`}
                        ref={inputUrl}
                        hidden={!isEditUrl}
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onBlur={(e) => {
                            updateLink('url', e.target.value);
                        }}
                        onKeyPress={event => keypressHandler(event, 'url')}
                    />
                    <div className={`${styles["row"]}`} hidden={isEditUrl}>
                        <div className={`${styles["url_link"]} ${stylesThemes["theme---title-input"]}`}>{link.url ? link.url : 'Url'}</div>
                        {canEdit && 
                            <Button 
                                shape="circle" 
                                icon={<EditOutlined />} 
                                className={`${styles["button-edit"]} ${stylesThemes["theme---buttom-edit"]}`}
                                onClick={async() => {
                                    await setIsEditUrl(true)
                                    inputUrl.current.focus({
                                        cursor: 'end',
                                    })
                                }}
                            />
                        }
                    </div>

                    <div className={`${styles["card-menu"]}`}>
                        <div>
                            <Button
                                icon={<FileImageOutlined />}
                                className={`${styles["button-edit"]} ${stylesThemes["theme---buttom-edit"]}`}
                                onClick={() => setMenu('thumnail')}
                            />  
                        </div>
                        <div>
                            <Button
                                icon={<DeleteOutlined />}
                                className={`${styles["button-edit"]} ${stylesThemes["theme---buttom-edit"]}`}
                                onClick={() => setMenu('delete')}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {
                menu == 'thumnail' &&
                <div className={`${stylesThemes["theme---submenu"]} ${styles["theme---submenu"]}`}>
                    <div className={`${styles["header-submenu"]} ${stylesThemes["theme---sub-menu-header"]}`}>
                        <h2 className={`${styles["title-submenu"]}`}> {t('common:addThumbnail')} </h2>
                        <Button icon={<CloseOutlined />} className={`${styles["close-button"]} ${stylesThemes["theme---close-button"]}`} onClick={() => setMenu('')}/>
                    </div>
                    {
                        (!link || !link.icon || link.icon == '#') &&
                        <div className={`${styles["sub-menu-body"]} ${stylesThemes["theme---sub-menu-body"]}`}>
                            <h3 className={`${styles["custom-des"]}`}>{t('common:addThumbnailDes')}</h3>
                            <ImgCrop rotate>
                                <Upload
                                    ref={thumnailImage}
                                    beforeUpload={() => {return true}}
                                    className={`${styles["update-cpn"]}`}
                                    onChange={(e) => {
                                        changeThumbnail(e.file)
                                    }}
                                >
                                    <button 
                                        className={`${styles["button-set"]} ${stylesThemes["theme---button-primary"]}`}
                                    >
                                        {t('common:setThumbnail')}
                                    </button>
                                </Upload>
                            </ImgCrop>
                        </div>
                    }

                    {
                        link && link.icon && link.icon != '#' &&
                        <div className={`${styles["sub-menu-body"]} ${stylesThemes["theme---sub-menu-body"]}`} style={{minHeight: '140px'}}>
                            <img src={HOST + link.icon} style={{width: '96px'}}/>
                            <div style={{width: 'calc(100% - 120px)', float: 'right'}}>
                                <ImgCrop rotate>
                                    <Upload
                                        ref={thumnailImage}
                                        beforeUpload={() => {return true}}
                                        className={`${styles["update-cpn"]}`}
                                        onChange={(e) => {
                                            changeThumbnail(e.file)
                                        }}
                                    >
                                        <button 
                                            className={`${styles["button-set"]} ${stylesThemes["theme---button-primary"]}`}
                                        >
                                            {t('common:change')}
                                        </button>
                                    </Upload>
                                </ImgCrop>
                                <button 
                                    className={`${styles["button-remove"]} ${stylesThemes["theme---button-remove"]}`}
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
                <div className={`${stylesThemes["theme---submenu"]} ${styles["theme---submenu"]}`}>
                    <div className={`${styles["header-submenu"]} ${stylesThemes["theme---sub-menu-header"]}`}>
                        <h2 className={`${styles["title-submenu"]}`}>{t('common:delete')}</h2>
                        <Button icon={<CloseOutlined />} className={`${styles["close-button"]} ${stylesThemes["theme---close-button"]}`} onClick={() => setMenu('')}/>
                    </div>
                    {
                        <div className={`${styles["sub-menu-body"]} ${stylesThemes["theme---sub-menu-body"]}`}>
                            <h3 className={`${styles["custom-des"]}`}>{t('common:deleteForever')}</h3>
                            <button 
                                className={`${styles["button--custom--cancel"]} ${stylesThemes["theme---button-cancel"]}`}
                                onClick={() => setMenu('')}
                            >
                                {t('common:cancel')}
                            </button>
                            <button 
                                className={`${styles["button--custom--delete"]} ${stylesThemes["theme---button-danger"]}`}
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

const ListLinks = ({listLinks, getAllLinks=null, canEdit=false}:any) => {
    return (
        <div>
            <div className={`${styles["list-card"]}`}>
            {
                listLinks && 
                listLinks.map((link:any, index:any) => (
                        
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