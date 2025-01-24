'use client'
import { SelectTicketCount } from "@/features/SelectTicketCount";
import { rBuyTicket, rGetTicketsCount } from "@/shared/api/games";
import { showErrorNotification } from "@/shared/notifications";
import { Box, Button, Input, Stack, Text } from "@mantine/core";
import { getCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { useMutation, useQuery } from "react-query";

export const BuyTicketForm = ({ gameId }: { gameId: number }) => {
    const t = useTranslations()
    const { locale } = useParams()
    const router = useRouter()
    const {
        handleSubmit,
        register,
        getValues,
        control,
        formState: { errors },
    } = useForm<{ tel: string, count: string }>();
    const { mutate, isLoading: mutateLoading, isError } = useMutation({
        mutationKey: [`buyTicket ${gameId}`],
        mutationFn: rBuyTicket,
        onSuccess: (data) => {
            const { url } = JSON.parse(data)
            console.log(data)
            router.push(url)
        },
        onError: (e) => {
            console.log(e)
            showErrorNotification({ title: t('errors.post.title'), message: t('errors.post.description') })

        }
    });
    const { data: ticketsCount, isLoading } = useQuery({ queryKey: [`tickets count ${gameId}`], queryFn: () => rGetTicketsCount(gameId) })
    const count = 7000 - (ticketsCount ? parseInt(ticketsCount.message) : 0)
    const onSubmit: SubmitHandler<{ tel: string, count: string }> = (data) => {
        mutate({ data: { TELEPHONE: data.tel.replace(/[()\s-]/g, ""), EMAIL: getCookie('email'), COUNT: parseInt(data.count), EVENT_ID: gameId }, locale: locale as string })

    };
    return <form onSubmit={handleSubmit(onSubmit)}>
        <Stack p={10}>
            <Controller
                name="tel"
                control={control}
                rules={{ required: t('errors.required') }}
                render={({ field: { value, onChange } }) => <Box>
                    <label htmlFor="tel" ><Text fz={14} fw={500}>{t('buy.form.tel')}</Text></label>
                    <Input
                        id="tel"
                        required
                        component={IMaskInput}
                        mask="+7 (000) 000-00-00"
                        value={value}
                        onChange={onChange}
                        error={errors["tel"]?.message}
                        placeholder={t('buy.form.tel')}
                        label={t('buy.form.tel')}

                    /></Box>} />
            <Controller
                control={control}
                name="count"
                rules={{ required: t('errors.required') }}
                render={({ field: { value, onChange } }) => <SelectTicketCount value={value} onChange={onChange} gameId={gameId} />}
            />
            <Text c="slate.6">{t('buy.form.count', { count })} </Text>
            <Button
                loading={mutateLoading || isLoading}
                variant="base"
                disabled={mutateLoading || isLoading || count == 0}
                type="submit" >{t('buy.form.btn')}</Button>
        </Stack>
    </form >
}
