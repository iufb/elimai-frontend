'use client'

import { Link } from "@/i18n/routing"
import { Box, Button, Center, LoadingOverlay, Stack, Text, Title } from "@mantine/core"
import jsPDF from "jspdf"
import { Ban, CircleHelp } from "lucide-react"
import { useTranslations } from "next-intl"
import { useParams, useSearchParams } from "next/navigation"
import QRCode from 'qrcode'
import { useEffect, useState } from "react"

import { rGetTicket } from "@/shared/api/games"
import dayjs from "dayjs"
import { useQuery } from "react-query"
import "/public/Nunito-Bold-normal.js"

export const ResultWindow = () => {
    const t = useTranslations()
    const query = useSearchParams()
    const order = query.get('order')
    const { locale } = useParams()
    const { data, isFetching, error, refetch } = useQuery({
        queryKey: ['getTicket'], queryFn: async () => {
            const data = await rGetTicket(order)
            const dateStr = dayjs(data.date).format('DD.MM.YYYY')
            const timeStr = dayjs(data.date).format('HH:mm')
            const enemy = locale == 'ru' ? data.name_ru : data.name_kz
            createTicket({ enemy, date: dateStr, time: timeStr, qrValue: data.code })

            return data
        },
        enabled: !!order,
        refetchOnWindowFocus: false
    })
    console.log(error, "ERROR")
    const createTicket = ({ enemy, date, time, qrValue }: { enemy: string, date: string, time: string, qrValue: string }) => {
        const elimai = locale == 'ru' ? "Елимай" : "Елімай"
        const doc = new jsPDF(); // Default is 'portrait', 'px' unit
        const qrImage = new Image();
        const templateImage = new Image();

        QRCode.toDataURL(qrValue, function (err, url) {
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
            const pageHalf = pageWidth / 2
            const qrDim = 100
            doc.setFont('Nunito-Bold', 'normal')
            // Add the template image, scaled to fill the entire page
            doc.addImage(templateImage, 'JPG', 0, 0, pageWidth, pageHeight);
            doc.addImage(qrImage, 'PNG', (pageWidth - qrDim) / 2, (pageHeight - qrDim - 30) / 2, qrDim, qrDim); // Bottom-right corner

            doc.setFontSize(20)
            doc.setTextColor('#697BD3')
            doc.text(enemy.toUpperCase(), pageHalf / 1.6, pageHeight / 2 + 52, { align: 'center' })
            doc.text(elimai.toUpperCase(), pageHalf + pageHalf / 2.8, pageHeight / 2 + 52, { align: 'center' })

            doc.setFontSize(18)
            doc.setTextColor('#fff')
            doc.text(date, pageHalf, pageHeight / 2 + 70, { align: 'center' })

            doc.setFontSize(26)
            doc.setTextColor('#ECE720')
            doc.text(time, pageHalf, pageHeight / 2 + 90, { align: 'center' })

            // Save the PDF
            doc.save(`Билет ${elimai} - ${enemy}.pdf`);
        };

        templateImage.src = '/ticket-template.jpg'; // Path to the template image
    };

    return <Box h={'50svh'}>
        <Center h={'100%'} pos={'relative'}>
            {isFetching ? <LoadingOverlay loaderProps={{ color: 'elimai.6' }} visible={isFetching} zIndex={1000} /> :
                !error ?
                    <Stack>
                        <NotDownloadedView refetch={() => {
                            refetch()
                        }} />
                    </Stack>
                    :
                    <Stack align="center">
                        <Ban size={100} color="red" />
                        <Title order={2} c={'red.5'}>{t('result.error')}</Title>

                        <Button variant="base" onClick={() => refetch()}>{t('result.again')}</Button>
                        <Button variant="outline"><Link href={'/'}>{t('result.link')}</Link></Button>
                    </Stack>}

        </Center>
    </Box>

}

const NotDownloadedView = ({ refetch }: { refetch: () => void }) => {
    const [timer, setTimer] = useState(10)
    const t = useTranslations()
    useEffect(() => {
        if (timer > 0) {
            const timer = setInterval(() => {
                setTimer((prevSeconds) => prevSeconds - 1);
            }, 1000); // Update every second
            return () => clearInterval(timer); // Cleanup on unmount
        }
    }, [timer]);
    const onClick = () => {
        refetch()
        setTimer(10)
    }
    return <Stack justify="center" align="center">
        <CircleHelp size={80} color="var(--mantine-color-elimai-6)" />
        <Title ta={'center'} order={3} c={"slate.4"}>
            {t('result.notStarted.title')} <button disabled={timer !== 0} onClick={onClick}>
                <Text fw={'bold'} size="lg" c={timer > 0 ? "slate.4" : "elimai.6"}>
                    {t('result.notStarted.timer.text')} {timer > 0 && t('result.notStarted.timer.time', { timer })}
                </Text>
            </button>
        </Title>
        <Button variant="base"><Link href={'/'}>{t('result.link')}</Link></Button>
    </Stack>


}
