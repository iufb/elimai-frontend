'use client'
import { rGetGames } from "@/shared/api/games";
import { Box, Button, LoadingOverlay, Stack, Table, Title } from "@mantine/core";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import QRCode from 'qrcode';
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
    if (!games) { return <Title ta={'center'} my={100} c={'red.5'} order={3}>Ошибка загрузки...</Title> }


    const createPDF = () => {
        const doc = new jsPDF(); // Default is 'portrait', 'px' unit
        const qrImage = new Image();
        const templateImage = new Image();

        QRCode.toDataURL("Hello", function (err, url) {
            if (err) {
                console.error("Error generating QR code:", err);
                return;
            }
            qrImage.src = url; // Set QR code image source
        });

        templateImage.onload = function () {
            // Get page dimensions
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            // Add the template image, scaled to fill the entire page
            doc.addImage(templateImage, 'JPEG', 0, 0, pageWidth, pageHeight);
            doc.setTextColor('red')
            doc.text("Your Ticket", pageWidth / 2, 40, { align: "center", });
            doc.setTextColor('green')
            doc.text("GREEN Your Ticket", pageWidth / 2, 40, { align: "center", });

            // doc.addImage(qrImage, 'PNG', pageWidth - 60 - 10, pageHeight - 60 - 10, 60, 60); // Bottom-right corner

            // Save the PDF
            doc.save('generated-pdf.pdf');
        };

        templateImage.src = '/ticket-template.jpeg'; // Path to the template image
    };

    const rows = games.map((element, idx) => (
        <Table.Tr key={element.id}>
            <Table.Td ta={'center'}>{dayjs(element.event_date).locale(locale as string).format("DD-MM-YYYY HH:mm")}</Table.Td>
            <Table.Td ta={'center'}>{element[locale == 'ru' ? `name_ru` : 'name_kz']}</Table.Td>
            <Table.Td ta={'center'}>
                <Button onClick={createPDF}>pdf</Button>
                {/* <BuyTicketBtn gameId={element.id} disabled={element.status !== GameStatus[0]} /> */}
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Stack align="center" my={20} >
            <Title order={2}>Матчи</Title>
            <Table.ScrollContainer mx={'auto'} maw={1200} minWidth={500} w={'100%'}>
                <Table striped stripedColor="slate.2" withTableBorder fz={{
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
                    <Table.Caption>{t('caption')}</Table.Caption>
                </Table>
            </Table.ScrollContainer>
        </Stack>
    );
}
