"use client";

import { rLogin } from "@/shared/api/auth";
import { notificationErrors } from "@/shared/consts";
import { showErrorNotification } from "@/shared/notifications";
import { Button, Stack, TextInput, Title } from "@mantine/core";
import { deleteCookie } from "cookies-next";
import { setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

export const AdminLoginForm = () => {
    const router = useRouter();
    const { mutate, isLoading, isError } = useMutation({
        mutationKey: ["login"],
        mutationFn: rLogin,
        onSuccess: (data) => {
            setCookie('token', data.token, { maxAge: 60 * 60 })
            router.replace('/admin')
        },
        onError: (e) => {
            console.log(e)
            showErrorNotification(notificationErrors.login);
        }
    });

    const onSubmit = (data: { username: string; password: string }) => {
        console.log(data)
        mutate(data);
        deleteCookie("token");
    };
    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm<{
        username: string;
        password: string;
    }>();
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack miw={350} w={'100%'} gap={10}>
                <Title order={3}>Авторизация</Title>
                <TextInput
                    error={errors["username"]?.message}
                    {...register("username", { required: "Обязательное поле" })}
                    placeholder={'Логин'}
                />
                <TextInput
                    type="password"
                    error={errors["password"]?.message}
                    {...register("password", { required: "Обязательное поле" })}
                    placeholder={'Пароль'}
                />
                <Button variant="base" disabled={isLoading} type="submit" >Войти</Button>

            </Stack>
        </form>
    );
};
