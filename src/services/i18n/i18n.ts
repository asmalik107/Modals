import 'intl-pluralrules';

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import common from './common.json';
import translations from './translation.json';

const defaultNS = 'common';
const resources = {
  en: {
    common,
    translations,
  },
};

i18n.use(initReactI18next).init({
  debug: true,
  defaultNS,
  fallbackLng: 'en',
  ns: ['common', 'translations'],
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});

export default i18n;
