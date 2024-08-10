import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json"
import ch from "../locales/ch.json"
import sp from "../locales/sp.json"

export const languageResources = {
    en: {translation: en},
    ch: {translation: ch},
    sp: {translation: sp}
}

// integrating i18next to our Expo application
i18next.use(initReactI18next).init({
    compatibilityJSON:"v3",
    lng: 'en',
    fallBackLng: 'en',
    resources: languageResources
})

export default i18next
