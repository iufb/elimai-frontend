import { BackgroundImage, Box, Stack, Text, Title } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import styles from './page.module.css';
export async function generateMetadata({ params }: { params: { locale: string } }) {
    const { locale } = await params
    const t = await getTranslations();
    return {
        title: t('policy.title'),
        description: t('policy.description'),
    }
}

export default async function Page() {

    const t = await getTranslations();
    return (<Box>
        <BackgroundImage pos={'relative'} w={'100%'} h={'30vh'} src='/policy.jpg' >
            <Box style={{ zIndex: 1 }} pos={'absolute'} inset={0} bg={'rgba(0,0,0,.4)'} />
            <Stack pos={'relative'} style={{ zIndex: 2 }} px={{ xs: 10, xl: 0 }} h={'100%'} maw={1200} mx={'auto'} justify='center' gap={10}>
                <Title order={1} c='white'>{t('policy.title')}</Title>
            </Stack>
        </BackgroundImage>
        <Text my={20} mx={'auto'} maw={800} ta={'center'}>{t.rich('policy.value', { a: (chunk) => <a className={styles.link} href="https://tickets.fcelimai.kz/">{chunk}</a> })}</Text>
    </Box>
    );
}
