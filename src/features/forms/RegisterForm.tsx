"use client";

import { notificationErrors } from "@/shared/consts";
import { showErrorNotification } from "@/shared/notifications";
import { Box, Button, Stack, TextInput, Title } from "@mantine/core";
import { deleteCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
type RegisterDto = {
    email: string;
    password: string;
    confirmPassword: string;

}
export const RegisterForm = () => {
    const [showConfirm, setShowConfirm] = useState(false)
    const t = useTranslations()
    const router = useRouter();
    const { mutate, isLoading, isError } = useMutation({
        mutationKey: ["register"],
        mutationFn: async () => { },
        onSuccess: (data) => {
            // setCookie('token', data.token, { maxAge: 60 * 60 })
            // router.replace('/admin')
        },
        onError: (e) => {
            console.log(e)
            showErrorNotification(notificationErrors.login);
        }
    });
    const onRegisterFormSubmit = (data: RegisterDto) => {
        console.log(data)
        setShowConfirm(true)
        // mutate(data);
        deleteCookie("token");
    };
    const {
        handleSubmit,
        register,
        watch,
        getValues,
        formState: { errors },
    } = useForm<RegisterDto>({ mode: 'onChange' });

    const password = watch('password', '')
    return (!showConfirm ?
        <form
            onSubmit={handleSubmit(onRegisterFormSubmit)}
        >
            <Stack px={20} py={10} miw={350} w={'100%'} gap={10} >
                <Title order={3}>{t('auth.register.title')}</Title>
                <TextInput
                    type="email"
                    label={t('auth.email')}
                    error={errors["email"]?.message}
                    {...register("email", { required: t('errors.required') })}
                    placeholder={t('auth.email')}
                />
                <TextInput
                    type="password"


                    label={t('auth.password')}
                    error={errors["password"]?.message}
                    {...register("password", {
                        required: t('errors.required'), validate: {
                            hasNumber: (value) =>
                                /\d/.test(value) || t('errors.auth.hasNumber'),
                            hasUpperCase: (value) =>
                                /[A-Z]/.test(value) ||
                                t('errors.auth.hasUpperCase'),
                            hasMinimumLength: (value) =>
                                value.length >= 8 ||
                                t('errors.auth.hasMinimumLength'),
                        }
                    })}
                    placeholder={t('auth.password')}
                />
                <TextInput
                    type="password"

                    label={t('auth.confirmPassword')}
                    error={errors["confirmPassword"]?.message}
                    {...register("confirmPassword", {
                        required: t('errors.required'), validate: {
                            isEqual: (value) => value == password ||
                                t('errors.auth.not-equal'),

                        }
                    })}
                    placeholder={t('auth.password')}
                />

                <Button variant="base" disabled={isLoading} type="submit" >{t('auth.register.btn')}</Button>

            </Stack>
        </form> : <ConfirmForm />
    );
};


const ConfirmForm = () => {
    return <Box></Box>
}
