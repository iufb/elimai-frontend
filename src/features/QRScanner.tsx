'use client'
import { Box, Button, Loader, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useParams } from "next/navigation";
import { useState } from "react";

export const QRScanner = () => {

    return <>
        <Ticket />
        <Sub />
    </>

}

const Ticket = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [res, setRes] = useState<boolean>()
    const onScan = (result: IDetectedBarcode[]) => {
        if (!result[0] && !id) {
            return;
        }
        const code = result[0].rawValue
        console.log(`Event : ${id} -- Code : ${code}`)
        setLoading(true)
        setTimeout(() => {
            setRes(true)
            setLoading(false)
        }, 3000)
    }
    return (
        <>
            <Modal fullScreen opened={opened} onClose={close} title={'QR Сканнер'}>
                <Scanner allowMultiple scanDelay={5000} onScan={onScan} />
                {loading ? <Loader /> : res ? <Box>Success</Box> : <Box>Error</Box>}
            </Modal>
            <Button w={'100%'} variant="base" onClick={open}>
                Скан билета
            </Button>
        </>
    );
}
const Sub = () => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Modal fullScreen opened={opened} onClose={close} title={'QR Сканнер'}>
                <Scanner onScan={(result) => console.log(result)} />
            </Modal>
            <Button w={'100%'} variant="alert" onClick={open}>
                Скан абонемента
            </Button>
        </>
    );
}
