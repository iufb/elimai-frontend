"use client";

import { Link } from "@/i18n/routing";
import { rLogin } from "@/shared/api/auth";
import { useAuth } from "@/shared/context";
import { showErrorNotification } from "@/shared/notifications";
import { Button, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { deleteCookie, setCookie } from "cookies-next/client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
type LoginDto = {
    email: string;
    password: string;
}
export const LoginForm = () => {
    const t = useTranslations()
    const router = useRouter()

    const { logged, refetch } = useAuth()
    const { mutate: login, isLoading } = useMutation({
        mutationKey: ["login"],
        mutationFn: rLogin,
        onSuccess: (data) => {
            console.log(data)
            setCookie('access', data.access)
            setCookie('refresh', data.refresh)
            setCookie('email', data.email)
            if (logged) logged()
            if (refetch) refetch()

            switch (data.role) {
                case 'volunteer': router.replace('/admin/qr/1')
                    break;
                default: router.replace('/')
            }

        },
        onError: (e) => {
            console.log(e)
            showErrorNotification({ title: t('errors.auth.login.title'), message: t('errors.auth.login.message') });
        }
    });

    const onSubmit = (data: LoginDto) => {
        console.log(data)
        login(data)
        deleteCookie('access')
        deleteCookie('refresh')
    };
    const {
        handleSubmit,
        register,
        watch,
        getValues,
        formState: { errors },
    } = useForm<LoginDto>({ mode: 'onChange' });

    const password = watch('password', '')
    return <form
        onSubmit={handleSubmit(onSubmit)}
    >
        <Stack px={20} py={10} miw={350} w={'100%'} gap={10} >
            <Title order={3}>{t('auth.login.title')}</Title>
            <TextInput
                type="email"
                label={t('auth.email')}
                error={errors["email"]?.message}
                {...register("email", { required: t('errors.required') })}
                placeholder={t('auth.email')}
                disabled={false}
            />
            <PasswordInput
                type="password"
                label={t('auth.password')}
                error={errors["password"]?.message}
                {...register("password", {
                    required: t('errors.required'),
                })}
                placeholder={t('auth.password')}
            />
            <Text size="sm" c={'slate.6'} >{t.rich('auth.login.restore', { a: (chunk) => <Link className="link" href={'/restore'}>{chunk}</Link> })}</Text>
            <Text size="sm" c={'slate.6'} >{t.rich('auth.login.register', { a: (chunk) => <Link className="link" href={'/register'}>{chunk}</Link> })}</Text>
            <Button loading={isLoading} disabled={isLoading} variant="base" type="submit" >{t('auth.login.btn')}</Button>

        </Stack>
    </form>

}
