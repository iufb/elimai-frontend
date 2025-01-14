'use client'
import { DeleteGameBtn, EditGameBtn } from "@/features";
import { rGetGames } from "@/shared/api/games";
import { Box, LoadingOverlay, Stack, Table, Title } from "@mantine/core";
import { useQuery } from "react-query";

const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];
export const AdminGamesTable = () => {
    const { data: games, isLoading, isError } = useQuery({
        queryKey: ['games'], queryFn: async () => {
            const data = await rGetGames()
            return data
        }
    })
    if (isLoading) {
        return <Box w={'100%'} h={400} pos='relative'><LoadingOverlay loaderProps={{ color: 'elimai.6' }} visible={isLoading} zIndex={1000} /></Box>
    }
    if (!games) { return <Title c={'red.5'} order={3}>Ошибка загрузки</Title> }
    const rows = games.map((element, idx) => (
        <Table.Tr key={element.id}>
            <Table.Td ta={'center'}>{element.event_date as string}</Table.Td>
            <Table.Td ta={'center'}>{element.name_ru}</Table.Td>
            <Table.Td ta={'center'}>{element.name_kz}</Table.Td>
            <Table.Td ta={'center'}>
                {element.status}
            </Table.Td>
            <Table.Td ta={'center'}>
                <EditGameBtn game={element} />
            </Table.Td>
            <Table.Td ta={'center'}>
                <DeleteGameBtn id={element.id} />
            </Table.Td>


        </Table.Tr>
    ));

    return (
        <Stack align="center" my={20} >
            <Title order={2}>Матчи</Title>
            <Table.ScrollContainer minWidth={500} w={'100%'}>
                <Table miw={390} fz={{
                    xs: 14, md: 16, lg: 18
                }}>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th ta={'center'}>Дата</Table.Th>
                            <Table.Th ta={'center'}>Матч RU</Table.Th>
                            <Table.Th ta={'center'}>Матч KZ</Table.Th>
                            <Table.Th ta={'center'}>Статус</Table.Th>
                            <Table.Th ta={'center'}>Изменить</Table.Th>
                            <Table.Th ta={'center'}>Удалить</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>

                </Table>
            </Table.ScrollContainer>
        </Stack>
    );
}
