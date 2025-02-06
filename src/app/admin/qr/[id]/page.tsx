import { QRScanner } from "@/features/QRScanner";
import { Image, Stack } from "@mantine/core";

export default function Page() {
    return <Stack mih={'100svg'} align="center" px={10}>
        <Image src={'/qr.jpg'} alt="qr" w={'100%'} height={400} />
        <QRScanner />
    </Stack>
}
