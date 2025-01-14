'use client'
import { EditGameForm } from "@/features/forms";
import { Game } from "@/shared/types";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Edit } from "lucide-react";

export const EditGameBtn = ({ game }: { game: Game }) => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Modal size={'lg'} opened={opened} onClose={close} title={'Добавить матч'}>
                <EditGameForm game={game} close={close} />
            </Modal>
            <Button maw={300} variant="base" onClick={open}>
                <Edit />
            </Button>
        </>
    );
};
