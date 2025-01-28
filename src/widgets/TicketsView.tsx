'use client'
import { Ticket } from "@/shared/types";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import QrCode from "qrcode";
import { useEffect, useRef } from "react";

interface TicketsViewProps {
    tickets: Ticket[]
}
const RATIO = 1.416666667
export const TicketsView = ({ tickets }: TicketsViewProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { locale } = useParams()

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = width * RATIO;
        const qrDim = width / 3;
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

                        ctx.drawImage(qrImage, width / 2 - qrDim / 2, idx * height + height / 3, qrDim, qrDim);

                        ctx.textAlign = 'center';
                        ctx.font = 'bold 16px Nunito';
                        ctx.fillStyle = '#697BD3';

                        ctx.fillText(enemy, width / 2 / 1.6, idx * height + height / 2 + 110);
                        ctx.fillText(elimai, width / 2 + width / 2 / 2.8, idx * height + height / 2 + 110);

                        ctx.font = 'bold 16px Nunito';
                        ctx.fillStyle = '#fff';
                        ctx.fillText(dateStr, width / 2, idx * height + height / 2 + 140);

                        ctx.font = 'bold 22px Nunito';
                        ctx.fillStyle = '#ECE720';
                        ctx.fillText(timeStr, width / 2, idx * height + height / 2 + 170);
                    };

                    image.src = '/4.PNG';
                };
            });
        })
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={350}
            height={350 * tickets.length * RATIO}
            style={{
                width: 350,
                margin: '0 auto'
            }}
        />
    );
}
