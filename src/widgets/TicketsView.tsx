'use client'
import { Ticket } from "@/shared/types";
import { Center, Loader } from "@mantine/core";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import QrCode from "qrcode";
import { useEffect, useRef, useState } from "react";

interface TicketsViewProps {
    tickets: Ticket[]
    type: 'ticket' | 'sub'
}
const RATIO = 1.416666667
export const TicketsView = ({ type, tickets }: TicketsViewProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { locale } = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const showSub = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const width = canvas.width;
            const height = width * RATIO;
            const qrDim = width / 2.5;
            const image = new Image();
            const qrImage = new Image();

            tickets.forEach((ticket, idx) => {
                const enemy = locale == 'ru' ? tickets[0].name_ru : tickets[0].name_kz
                const dateStr = dayjs(ticket.date).format('DD.MM.YYYY')
                const timeStr = dayjs(ticket.date).format('HH:mm')

                const image = new Image();
                const qrImage = new Image();

                QrCode.toDataURL(ticket.code, function (err, url) {
                    if (err) {
                        console.error("Error generating QR code:", err);
                        return;
                    }
                    qrImage.src = url;

                    qrImage.onload = () => {
                        image.onload = () => {
                            setLoading(false)
                            ctx.drawImage(image, 0, idx * height, width, height);

                            ctx.drawImage(qrImage, width / 2 - qrDim / 2, height / 2 - qrDim / 2, qrDim, qrDim);

                        };

                        setLoading(false)
                        image.src = '/2.PNG';
                    };
                });
            })
        }
        const showTickets = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const width = canvas.width;
            const height = width * RATIO;
            const qrDim = width / 2.5;
            const elimai = locale == 'ru' ? "Елимай" : "Елімай"


            tickets.forEach((ticket, idx) => {
                const enemy = locale == 'ru' ? tickets[0].name_ru : tickets[0].name_kz
                const dateStr = dayjs(ticket.date).format('DD.MM.YYYY')
                const timeStr = dayjs(ticket.date).format('HH:mm')

                const image = new Image();
                const qrImage = new Image();

                QrCode.toDataURL(ticket.code, function (err, url) {
                    if (err) {
                        console.error("Error generating QR code:", err);
                        return;
                    }
                    qrImage.src = url;

                    qrImage.onload = () => {
                        image.onload = () => {
                            ctx.drawImage(image, 0, idx * height, width, height);

                            ctx.drawImage(qrImage, width / 2 - qrDim / 2, idx * height + height / 2.8, qrDim, qrDim);

                            ctx.textAlign = 'center';
                            ctx.font = 'bold 16px Nunito';
                            ctx.fillStyle = '#697BD3';

                            ctx.fillText(enemy, width / 2 / 1.6, idx * height + height / 2 + 110);
                            ctx.fillText(elimai, width / 2 + width / 2 / 2.8, idx * height + height / 2 + 110);

                            ctx.font = 'bold 16px Nunito';
                            ctx.fillStyle = '#fff';
                            ctx.fillText(dateStr, width / 2, idx * height + height / 2 + 142);

                            ctx.font = 'bold 22px Nunito';
                            ctx.fillStyle = '#ECE720';
                            ctx.fillText(timeStr, width / 2, idx * height + height / 2 + 170);
                        };

                        setLoading(false)
                        image.src = '/4.PNG';
                    };
                });
            })

        }
        type == 'ticket' ? showTickets() : showSub()
    }, []);
    console.log(loading, type)

    return <>
        {loading && <Center mih={200}> <Loader /></Center>}
        <canvas
            ref={canvasRef}
            width={350}
            height={350 * tickets.length * RATIO}
            style={{
                width: 350,
                opacity: loading ? 0 : 1,
                margin: '0 auto'
            }}
        />
    </>

}
