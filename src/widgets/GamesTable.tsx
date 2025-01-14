'use client'
import { rGetGames } from "@/shared/api/games";
import { GameStatus } from "@/shared/consts";
import { Box, Button, LoadingOverlay, Stack, Table, Title } from "@mantine/core";
import jsPDF from "jspdf";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";

const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];
export const GamesTable = () => {
    const { data: games, isLoading, isError } = useQuery({
        queryKey: ['games'], queryFn: async () => {
            const data = await rGetGames()
            return data
        }
    })
    const { locale } = useParams()

    const t = useTranslations('gamesTable')

    if (isLoading) {
        return <Box w={'100%'} h={400} pos='relative'><LoadingOverlay loaderProps={{ color: 'elimai.6' }} visible={isLoading} zIndex={1000} /></Box>
    }
    if (!games) { return <Title c={'red.5'} order={3}>Ошибка загрузки</Title> }

    const createPDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape'
        });
        const img = new Image();
        img.onload = function () {
            // Add image to PDF
            doc.addImage(img, 'PNG', 10, 10, 300, 150); // x, y, width, height

            // Add some text
            doc.setFontSize(18);
            doc.text('This is a dynamic PDF with an image!', 10, 10);

            // Save PDF
            doc.save('generated-pdf.pdf');
        };
        img.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQvHik8qKAB20CDxw5SH-e7iyOTK4VJeWEioNXlkXkeXYaJ3ao_sBFT_4Eso2Vb3qBU6H_OOA1ggK46iLIQ39idWxsRYiQlBqgKMUzRsMhlQ'; // Replace with the image URL    }
    }
    const rows = games.map((element, idx) => (
        <Table.Tr key={element.id}>
            <Table.Td ta={'center'}>{element.event_date as string}</Table.Td>
            <Table.Td ta={'center'}>{element[locale == 'ru' ? `name_ru` : 'name_kz']}</Table.Td>
            <Table.Td ta={'center'}>
                <Button variant='base' disabled={element.status == GameStatus[0]} onClick={createPDF}>{t('btn')}</Button>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Stack align="center" my={20} >
            <Title order={2}>Матчи</Title>
            <Table maw={600} fz={{
                xs: 14, md: 16, lg: 18
            }} >
                <Table.Thead >
                    <Table.Tr>
                        <Table.Th ta={'center'}>{t('date')}</Table.Th>
                        <Table.Th ta={'center'}>{t('game')}</Table.Th>
                        <Table.Th ta={'center'}>{t('buy')}</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Stack>
    );
}
