import { RestoreForm } from "@/features/forms";
import { Stack } from "@mantine/core";
import Image from "next/image";

export default function RestorePage() {
    return <Stack align='center' justify='center' mih={'100vh'}>
        <Image src='/logonew.png' width={100} height={100} alt="fcelimai logo" />
        <RestoreForm />
    </Stack>

}
