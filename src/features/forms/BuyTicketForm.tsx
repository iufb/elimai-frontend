'use client'
import { rBuyTicket } from "@/shared/api/games";
import { showErrorNotification } from "@/shared/notifications";
import { Button, Input, Stack, TextInput } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { useMutation } from "react-query";

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
    } = useForm<{ tel: string, email: string }>();
    const { mutate, isLoading, isError } = useMutation({
        mutationKey: [`buyTicket ${gameId}`],
        mutationFn: rBuyTicket,
        onSuccess: (data) => {
            const { url } = JSON.parse(data)
            console.log(data)
            router.push(url)
        },
        onError: (e) => {
            console.log(e)
            showErrorNotification({ title: t('buy.errors.post.title'), message: t('buy.errors.post.description') })

        }
    });
    const onSubmit: SubmitHandler<{ tel: string, email: string }> = (data) => {
        console.log(data)
        mutate({ data: { TELEPHONE: data.tel.replace(/[()\s-]/g, ""), EMAIL: data.email ? data.email : " ", EVENT_ID: gameId }, locale: locale as string })

    };
    return <form onSubmit={handleSubmit(onSubmit)}>
        <Stack p={10}>
            <Controller
                name="tel"
                control={control}
                rules={{ required: t('buy.errors.required') }}
                render={({ field: { value, onChange } }) => <Input
                    required
                    component={IMaskInput}
                    mask="+7 (000) 000-00-00"
                    value={value}
                    onChange={onChange}
                    error={errors["tel"]?.message}
                    placeholder={t('buy.form.tel')}
                    label={t('buy.form.tel')}

                />} />
            <TextInput
                error={errors["email"]?.message}
                type="email"
                {...register("email")}
                placeholder={t('buy.form.email')}
                label={t('buy.form.email')}
            />
            <Button
                loading={isLoading}
                variant="base"
                disabled={isLoading}
                type="submit" >{t('buy.form.btn')}</Button>
        </Stack>
    </form >
}
