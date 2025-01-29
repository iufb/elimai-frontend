'use client'
import { AuthProtectedButton } from "@/features/AuthProtectedBtn";
import { BuyTicketForm } from "@/features/forms/BuyTicketForm";
import { rGetGame } from "@/shared/api/games";
import { ButtonProps, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTranslations } from "next-intl";
import { useQuery } from "react-query";
interface BuyTicketBtnProps extends ButtonProps {
    gameId: number
    limit?: number
    variant: string
    again?: boolean
}
export const BuyTicketBtn = ({ again = false, variant, gameId, limit, disabled, ...props }: BuyTicketBtnProps) => {
    const [opened, { open, close }] = useDisclosure(false);
    const t = useTranslations()
    const { data: game, isLoading, isError } = useQuery({ queryKey: [`limit ${gameId}`], queryFn: async () => rGetGame(gameId) })
    return (
        <>
            <Modal centered size={'lg'} opened={opened} onClose={close} title={t('buy.ticketModal')}>
                <BuyTicketForm gameId={gameId} limit={limit ? limit : game?.ticket_count} />
            </Modal>
            <AuthProtectedButton disabled={disabled || isLoading || isError} variant={variant} label={
                again ? t('buy.again') : t('buy.btn')
            } action={open} />
        </>
    );
};
