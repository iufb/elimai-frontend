import { GamesTable } from '@/widgets';
import { BackgroundImage, Box, Stack, Text, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';


export default async function HomePage() {
    const t = await getTranslations();
    const formatter = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (<Box>
        <BackgroundImage pos={'relative'} w={'100%'} h={'30vh'} src='/e-team.webp' >
            <Box style={{ zIndex: 1 }} pos={'absolute'} inset={0} bg={'rgba(0,0,0,.4)'} />
            <Stack pos={'relative'} style={{ zIndex: 2 }} px={{ xs: 10, xl: 0 }} h={'100%'} maw={1200} mx={'auto'} justify='center' gap={10}>
                <Box>
                    <Text mr={10} fw={'bold'} tt={'uppercase'} py={3} px={10} fz={14} c='white' bg={'#ff8700'} component='span'>{t('hero.subtitle')}</Text>
                    <Text fw={'bold'} fz={14} c='white' component='span'>{formatter.format(new Date()).replace(/\//g, '.')}</Text>
                </Box>
                <Title order={1} c='white'>{t('hero.title')}</Title>
            </Stack>
        </BackgroundImage>
        <GamesTable />
    </Box>
    );
}



