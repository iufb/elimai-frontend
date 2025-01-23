'use client'
import { AuthProtectedButton } from "@/features/AuthProtectedBtn";
import { BuyTicketForm } from "@/features/forms/BuyTicketForm";
import { ButtonProps, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTranslations } from "next-intl";
interface BuyTicketBtnProps extends ButtonProps {
    gameId: number
}
export const BuyTicketBtn = ({ gameId, disabled, ...props }: BuyTicketBtnProps) => {
    const [opened, { open, close }] = useDisclosure(false);
    const t = useTranslations()
    return (
        <>
            <Modal centered size={'lg'} opened={opened} onClose={close} title={t('buy.ticketModal')}>
                <BuyTicketForm gameId={gameId} />
            </Modal>
            <AuthProtectedButton disabled={disabled} variant="base" label={
                t('buy.btn')
            } action={open} />
        </>
    );
};
