'use client'
import { rScanSub, rScanTicket } from "@/shared/api/games";
import { Button, Loader, Modal, Notification, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { CheckIcon, XIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useMutation } from "react-query";

export const QRScanner = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const { id } = useParams()
    const [res, setRes] = useState<{ status: number, message: string } | null>(null)
    const { mutate: scanTicket, isLoading: isLoadingTicket } = useMutation({
        mutationKey: ["scan ticket"],
        mutationFn: rScanTicket,
        onSuccess: (data) => {
            setRes({ status: 200, message: "Ваш билет подтвержден. Добро пожаловать на мероприятие!" })
        },
        onError: (e: { status: number }) => {
            console.log(e)
            if (e.status == 403) {
                setRes({ status: 403, message: "Билет не другой матч" })
            } else {
                setRes({ status: 404, message: "Пожалуйста, проверьте номер билета или свяжитесь с организаторами." })
            }
        }
    })
    const { mutate: scanSub, isLoading: isLoadingSub } = useMutation({
        mutationKey: ["scan sub"],
        mutationFn: rScanSub,
        onSuccess: (data) => {
            setRes({ status: 200, message: "Ваш билет подтвержден. Добро пожаловать на мероприятие!" })
        },
        onError: (e: { message: string, status: number }) => {
            if (e.status == 409) {
                setRes({ status: 409, message: "Этот абонемент уже был применен для входа на данный матч." })
            } else {

                setRes({ status: 404, message: "Пожалуйста, проверьте номер билета или свяжитесь с организаторами." })
            }
        }
    })

    const onScan = (result: IDetectedBarcode[]) => {
        setRes(null)
        if (!result[0] && !id) {
            return;
        }
        const code = result[0].rawValue
        const type = code.split("-")[0]
        switch (type) {
            case 'ticket': scanTicket({ event_id: id as string, code })
                break;
            case 'aboniment': scanSub({ event_id: id as string, code })
                break;
            default:
                setRes({ status: 404, message: "Неправильный код билета! Пожалуйста, проверьте номер билета или свяжитесь с организаторами." })
        }
        console.log(`Event : ${id} -- Code : ${code}`)
    }
    return (
        <>
            <Modal fullScreen opened={opened} onClose={() => {
                setRes(null)
                close()
            }} title={'QR Сканнер'}>
                <Stack align="center" >
                    <Scanner allowMultiple scanDelay={5000} onScan={onScan} />
                    <ResultView loading={isLoadingTicket || isLoadingSub} result={res} />
                </Stack>
            </Modal >
            <Button w={'100%'} variant="base" onClick={open}> Скан билета
            </Button>
        </>
    );

}


const ResultView = ({ loading, result }: { loading: boolean, result: { status: number, message: string } | null }) => {
    if (loading) {
        return <Loader />
    }
    if (result?.status == 200) {
        return <Notification withCloseButton={false} color="green" icon={<CheckIcon size={20} />} title="Билет действителен!">
            {result.message}
        </Notification>
    } else if (result !== null) {
        return <Notification withCloseButton={false} icon={<XIcon size={20} />} color="red" title="Билет недействителен!">
            {result.message}
        </Notification>
    } else {
        return null
    }
} 
