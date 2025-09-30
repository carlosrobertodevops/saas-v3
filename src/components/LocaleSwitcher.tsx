import {useLocale, useTranslations} from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      className={poppins.variable}
      defaultValue={locale}
      items={[
        {
          value: 'pt',
          label: t('pt')
        },
        {
          value: 'en',
          label: t('en')
        },
        {
          value: 'es',
          label: t('es')
        }
      ]}
      label={t('label')}
    />
  );
}
