'use client'
import { BuyTicketForm } from "@/features/forms/BuyTicketForm";
import { Button, ButtonProps, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTranslations } from "next-intl";
interface BuyTicketBtnProps extends ButtonProps {
    gameId: number
}
export const BuyTicketBtn = ({ gameId, ...props }: BuyTicketBtnProps) => {
    const [opened, { open, close }] = useDisclosure(false);
    const t = useTranslations()
    return (
        <>
            <Modal centered size={'lg'} opened={opened} onClose={close} title={t('buy.modal')}>
                <BuyTicketForm gameId={gameId} />
            </Modal>
            <Button variant="base" onClick={open} {...props}>
                {t('buy.btn')}
            </Button>
        </>
    );
};
