import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';
import './app.style.scss';
import './theme/index.scss';
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import { withTranslation, Trans } from 'react-i18next';
import common_en from './locales/en/common.json';
import common_vi from './locales/vi/common.json';

i18next.init({
    interpolation: { escapeValue: false }, 
    lng: 'vi',                             
    resources: {
        en: {
            common: common_en               
        },
        vi: {
            common: common_vi
        },
    },
});

const App = () => {
    return (
        <div className="height100">
            <Router>
                {routes}
            </Router>
        </div>
    );
}

export default withTranslation('common')(App); 

if (document.getElementById('app')) {
    ReactDOM.render(
        <I18nextProvider i18n={i18next}>
            <App />
        </I18nextProvider>
        , document.getElementById('app'));
}
