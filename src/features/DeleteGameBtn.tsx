'use client'
import { AddGameForm } from "@/features/forms";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export const AddGameBtn = () => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Modal size={'lg'} opened={opened} onClose={close} title={'Добавить матч'}>
                <AddGameForm close={close} />
            </Modal>
            <Button maw={300} variant="base" onClick={open}>
                Добавить матч
            </Button>
        </>
    );
};
