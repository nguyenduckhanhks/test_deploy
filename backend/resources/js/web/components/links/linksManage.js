import React, {useState, useEffect} from 'react';
import ListLinks from './listLinks';
import adminApi from '../../api/adminApi';
import {useTranslation} from "react-i18next";

const LinksManage = () => {
    const {t} = useTranslation('common');
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
             <div className="login-form__row">
                <button 
                    className="login-form__submit button button--main button--full theme---add-new-link" 
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