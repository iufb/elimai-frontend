import { AddGameBtn } from "@/features";
import { AdminGamesTable } from "@/widgets";
import { Stack } from "@mantine/core";

export default function Page() {
    return <Stack >
        <AddGameBtn />
        <AdminGamesTable />
    </Stack>
}
