import React, {useState, useEffect} from 'react';
import ListLinks from './listLinks';
import adminApi from '../../../api/adminApi';
import { useTranslation } from "next-i18next";
import stylesThemes from '../../../themes/index.module.scss';
import styles from './link-management.module.scss';

const LinksManage = () => {
    const {t} = useTranslation();
    const [listLinks, setListLinks] = useState([])  
    useEffect(() => {
       getAllLinks()
    }, [])  

    const getAllLinks = () => {
        adminApi.getAllLinksApi().then((res) => {
            if(res.data.success) {
                setListLinks(res.data.data)
            }
       }).catch(err => {
           console.log(err)
       })
    }

    const addLinks = () => {
        adminApi.addLinkApi().then(res => {
            if(res.data.success) {
                getAllLinks()
            }
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div>
             <div className={`${styles["page-container"]}`}>
                <button 
                    className={`${styles["add-links"]} ${stylesThemes["theme---add-new-link"]}`}
                    onClick={() => addLinks()}
                >
                    {t('common:addNewLink')}
                </button>

                <ListLinks
                    listLinks={listLinks}
                    canEdit={true}
                    getAllLinks={getAllLinks}
                />
            </div>
        </div>
    )
}

export default LinksManage