import { routing } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export function LocaleSwitcher() {
    const locale = useLocale();

    return (
        <LocaleSwitcherSelect locales={routing.locales} defaultValue={locale} />
    );
}
