'use client'
import { BuyTicketBtn } from "@/features/BuyTicketBtn";
import { Link } from "@/i18n/routing";
import { rGetGames } from "@/shared/api/games";
import { Game, GameStatus } from "@/shared/consts";
import { Alert, Box, Button, Center, Group, LoadingOverlay, Stack, Table, Tabs, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { AlertTriangle, CircleX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ReactNode, useMemo } from "react";
import { useQuery } from "react-query";


export const GamesTable = () => {
    const { data: games, isLoading, isError } = useQuery({
        queryKey: ['games'], queryFn: async () => {
            const data = await rGetGames()
            return data
        }
    })
    const { locale } = useParams()

    const t = useTranslations()


    const nextRows = useMemo(() => <GameRows games={games} locale={locale as string} isFuture={true} />, [games, locale]);
    const prevRows = useMemo(() => <GameRows games={games} locale={locale as string} isFuture={false} />, [games, locale]);
    if (isLoading) {
        return <Box w={'100%'} h={250} pos='relative'><LoadingOverlay loaderProps={{ color: 'elimai.6' }} visible={isLoading} zIndex={1000} /></Box>
    }
    if (!games) {
        return <Center h={250} maw={1200} mx={'auto'}><Alert
            icon={<CircleX />}
            variant="filled" color="red.4" my={20} title={t('gamesTable.error.title')}
        >
            {t('gamesTable.error.desc')}
        </Alert></Center>
    }
    if (games.length == 0) return <Center h={250} maw={1200} mx={'auto'}><Alert
        icon={<AlertTriangle />}
        variant="filled" color="elimai.4" my={20} title={t('gamesTable.notFound.title')}
    >
        {t('gamesTable.notFound.desc')}
    </Alert></Center>


    return (
        <Stack align="center" my={20} >
            <Group justify="space-between" w={'100%'} maw={1200}>
                <Title visibleFrom="md" order={2}>{t('gamesTable.title')}</Title>
                <Button w={{ xs: '100%', md: 'auto' }} variant="alert" href={'/'} component={Link}>
                    {t('buy.subBtn')}
                </Button>
            </Group>
            <Tabs mx={'auto'} maw={1200} w={'100%'} color={'elimai.6'} defaultValue="first">
                <Tabs.List grow justify="center" >
                    <Tabs.Tab value="first">{t('gamesTable.tabs.next')}</Tabs.Tab>
                    <Tabs.Tab value="second">{t('gamesTable.tabs.prev')}</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="first">
                    <CustomTable>{nextRows}</CustomTable>
                </Tabs.Panel>
                <Tabs.Panel value="second">
                    <CustomTable>{prevRows}</CustomTable>
                </Tabs.Panel>
            </Tabs>
        </Stack>
    );
}
const GameRows = ({ games, locale, isFuture }: { games?: Game[]; locale: string; isFuture: boolean }) => {
    const filteredGames = useMemo(
        () =>
            games?.filter(game =>
                isFuture ? new Date(game.event_date) > new Date() : new Date(game.event_date) < new Date()
            ).sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime()),
        [games, isFuture]
    );

    const formatEventDate = (date: Date | string) =>
        dayjs(date).locale(locale).format("DD.MM.YYYY HH:mm");

    const getTeamName = (game: Game) => {
        const elimai = locale == 'ru' ? 'Елимай' : "Елімай"
        const enemy = locale == 'ru' ? game.name_ru : game.name_kz
        return <Box>
            {elimai} <Text visibleFrom="md" component="span">—</Text>  {enemy}
        </Box>
    }
    return filteredGames?.map(game => (
        <Table.Tr bg={game.status !== GameStatus[0] ? 'gray.3' : ""} key={game.id}>
            <Table.Td ta="center">{formatEventDate(game.event_date)}</Table.Td>
            <Table.Td ta="center">{getTeamName(game)}</Table.Td>
            <Table.Td ta="center">
                <BuyTicketBtn
                    limit={game.ticket_count}
                    variant="base"
                    gameId={game.id}
                    disabled={game.status !== GameStatus[0]}
                />
            </Table.Td>
        </Table.Tr>
    ));
};
const CustomTable = ({ children }: { children: ReactNode }) => {
    const t = useTranslations('gamesTable')
    return <Table.ScrollContainer mt={20} mx={'auto'} maw={1200} minWidth={350} w={'100%'}>
        <Table stripedColor="slate.2" withTableBorder fz={{
            xs: 14, md: 16, lg: 18
        }} >
            <Table.Thead >
                <Table.Tr>
                    <Table.Th ta={'center'}>{t('date')}</Table.Th>
                    <Table.Th ta={'center'}>{t('game')}</Table.Th>
                    <Table.Th ta={'center'}>{t('buy')}</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {children}
            </Table.Tbody>
            <Table.Caption>{t('caption')}</Table.Caption>
        </Table>
    </Table.ScrollContainer>

}
