import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import translationEn from "./locales/en-US.json";

const resources = {
  "en-US": { translation: translationEn },
};

const initI18n = async () => {
  let savedLanguage: string | undefined = undefined;

  if (!savedLanguage || savedLanguage != null) {
    const languageCodes = Localization.getLocales();
    if (languageCodes.length > 0)
      savedLanguage = Localization.getLocales()[0].languageTag || "en-US";
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    lng: savedLanguage,
    resources,
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
