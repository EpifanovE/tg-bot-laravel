import i18n from "i18next";
import {initReactI18next} from "react-i18next";
// import backend from 'i18next-http-backend';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import ru from './ru/app';
import en from './en/app';

i18n
    // .use(backend)
    .use(intervalPlural)
    .use(initReactI18next)
    .init({
        // initImmediate: false,
        // backend: {
        //     loadPath: "../lang/{{lng}}/{{ns}}.json"
        // },
        resources: {
            ru: {
                translation: ru
            },
            en: {
                translation: en
            }
        },
        lng: "ru",
        fallbackLng: "ru",
        interpolation: {
            escapeValue: false
        }
    });
