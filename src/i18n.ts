// import { getRequestConfig } from 'next-intl/server';
import {getRequestConfig} from './i18n/request';
import {getUserLocale} from './services/locale';

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
