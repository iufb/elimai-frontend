'use client'
import { BuyTicketBtn } from "@/features/BuyTicketBtn";
import { rGetGames } from "@/shared/api/games";
import { GameStatus } from "@/shared/consts";
import { Box, LoadingOverlay, Stack, Table, Tabs, Title } from "@mantine/core";
import dayjs from "dayjs";
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

    const t = useTranslations('gamesTable')


    console.log(games)
    const nextRows = useMemo(() =>
        games?.filter(value => new Date(value.event_date) > new Date()).map((element, idx) => (
            <Table.Tr bg={element.status !== GameStatus[0] ? 'gray.3' : ""} key={element.id}>
                <Table.Td ta={'center'}>
                    {dayjs(element.event_date).locale(locale as string).format("DD-MM-YYYY HH:mm")}
                </Table.Td>
                <Table.Td ta={'center'}>
                    {locale == 'ru' ? "Елимай" : "Елімай"} - {element[locale == 'ru' ? `name_ru` : 'name_kz']}
                </Table.Td>
                <Table.Td ta={'center'}>
                    <BuyTicketBtn gameId={element.id} disabled={element.status !== GameStatus[0]} />
                </Table.Td>
            </Table.Tr>
        )),
        [games, locale]
    );
    const prevRows = useMemo(() =>
        games?.filter(value => new Date(value.event_date) < new Date()).map((element, idx) => (
            <Table.Tr bg={element.status !== GameStatus[0] ? 'gray.3' : ""} key={element.id}>
                <Table.Td ta={'center'}>
                    {dayjs(element.event_date).locale(locale as string).format("DD-MM-YYYY HH:mm")}
                </Table.Td>
                <Table.Td ta={'center'}>
                    {locale == 'ru' ? "Елимай" : "Елімай"} - {element[locale == 'ru' ? `name_ru` : 'name_kz']}
                </Table.Td>
                <Table.Td ta={'center'}>
                    <BuyTicketBtn gameId={element.id} disabled={element.status !== GameStatus[0]} />
                </Table.Td>
            </Table.Tr>
        )),
        [games, locale]
    );

    if (isLoading) {
        return <Box w={'100%'} h={400} pos='relative'><LoadingOverlay loaderProps={{ color: 'elimai.6' }} visible={isLoading} zIndex={1000} /></Box>
    }
    if (!games) { return <Title ta={'center'} my={100} c={'red.5'} order={3}>Ошибка загрузки...</Title> }


    return (
        <Stack align="center" my={20} >
            <Title order={2}>Матчи</Title>
            <Tabs mx={'auto'} maw={1200} w={'100%'} color={'elimai.6'} defaultValue="first">
                <Tabs.List grow justify="center" >
                    <Tabs.Tab value="first">{t('tabs.next')}</Tabs.Tab>
                    <Tabs.Tab value="second">{t('tabs.prev')}</Tabs.Tab>
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
const CustomTable = ({ children }: { children: ReactNode }) => {
    const t = useTranslations('gamesTable')
    return <Table.ScrollContainer mt={20} mx={'auto'} maw={1200} minWidth={500} w={'100%'}>
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
