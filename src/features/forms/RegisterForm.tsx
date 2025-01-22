"use client";

import { useRouter } from "@/i18n/routing";
import { rSendCode, rVerifyCode } from "@/shared/api/auth";
import { showErrorNotification } from "@/shared/notifications";
import { Button, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import { useMutation } from "react-query";
type RegisterDto = {
    email: string;
    password: string;
    confirmPassword: string;

}
export const RegisterForm = () => {
    const [showConfirm, setShowConfirm] = useState(false)
    const t = useTranslations()
    const { mutate: sendCode, isLoading } = useMutation({
        mutationKey: ["send-code"],
        mutationFn: rSendCode,
        onSuccess: (data) => {
            setShowConfirm(true)
            // setCookie('token', data.token, { maxAge: 60 * 60 })
            // router.replace('/admin')
        },
        onError: (e) => {
            console.log(e)
            showErrorNotification({ title: t('errors.auth.code.title'), message: t('errors.auth.code.message') });
        }
    });

    const onRegisterFormSubmit = (data: RegisterDto) => {
        console.log(data)
        sendCode(data.email);
    };
    const {
        handleSubmit,
        register,
        watch,
        getValues,
        formState: { errors },
    } = useForm<RegisterDto>({ mode: 'onChange', defaultValues: { email: "bashirov3ld2@gmail.com", password: "19931991iuN", confirmPassword: "19931991iuN" } });

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
                <PasswordInput
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
                <PasswordInput
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

                <Button variant="base" type="submit" >{t('auth.register.btn')}</Button>

            </Stack>
        </form> : <ConfirmForm userData={{ email: getValues().email, password: getValues().password }} />
    );
};

interface ConfirmFormProps {
    userData: Omit<RegisterDto, "confirmPassword">
}
const ConfirmForm = ({ userData }: ConfirmFormProps) => {
    const [otp, setOtp] = useState('');
    const t = useTranslations()

    const router = useRouter();
    const { mutate: checkCode, isLoading, isError } = useMutation({
        mutationKey: ["check-code"],
        mutationFn: rVerifyCode,
        onSuccess: (data) => {
            router.replace('/login')
        },
        onError: (e) => {
            console.log(e)
            showErrorNotification({ title: t('errors.auth.otp.title'), message: t('errors.auth.otp.message') });
        }
    });
    const verify = () => {
        checkCode({ ...userData, code: otp })
    }
    return <Stack gap={20}>
        <Title order={2}>{t('auth.confirm.title')}</Title>
        <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputStyle={'otp'}
            containerStyle={'otp-container'}
            // renderSeparator={<span className="separator">-</span>}
            renderInput={(props) => <input  {...props} />}
        />
        <OtpTimer email={userData.email} />
        <Button loading={isLoading} onClick={verify} disabled={otp.length !== 6 || isLoading} variant="base">{t('auth.confirm.btn')}</Button>
    </Stack>
}
interface OtpTimerProps {
    email: string
}
const OtpTimer = ({ email }: OtpTimerProps) => {
    const [timer, setTimer] = useState(10)
    const { mutate: resendCode, isLoading } = useMutation({
        mutationKey: ["resend-code"],
        mutationFn: rSendCode,
        onSuccess: (data) => {
            setTimer(60)
        },
        onError: (e) => {
            console.log(e)
            showErrorNotification({ title: t('errors.auth.code.title'), message: t('errors.auth.code.message') });
        }
    });

    useEffect(() => {
        if (timer > 0) {
            const timer = setInterval(() => {
                setTimer((prevSeconds) => prevSeconds - 1);
            }, 1000); // Update every second
            return () => clearInterval(timer); // Cleanup on unmount
        }
    }, [timer]);
    const t = useTranslations()
    return <button onClick={() => resendCode(email)} disabled={timer > 0} className={timer > 0 ? 'disabled' : 'active'}>
        {t('auth.confirm.timer')}  {timer > 0 && t('timer', { timer })}
    </button>

}
