'use client'
import { rResetPassword as rRestorePassword, rSendCode, rVerifyCode } from "@/shared/api/auth";
import { showErrorNotification } from "@/shared/notifications";
import { Button, Stack, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useMutation } from "react-query";

interface ConfirmFormProps {
    userData: { email: string, password: string }
    mode: 'register' | 'restore'
}
export const ConfirmForm = ({ mode, userData }: ConfirmFormProps) => {
    const [otp, setOtp] = useState('');
    const t = useTranslations()

    const router = useRouter();
    const { mutate: register, isLoading: registerIsLoading } = useMutation({
        mutationKey: ["register"],
        mutationFn: rVerifyCode,
        onSuccess: (data) => {
            router.replace('/login')
        },
        onError: (e) => {
            console.log(e)
            showErrorNotification({ title: t('errors.auth.otp.title'), message: t('errors.auth.otp.message') });
        }
    });
    const { mutate: restore, isLoading: restoreIsLoading } = useMutation({
        mutationKey: ["restore"],
        mutationFn: rRestorePassword,
        onSuccess: (data) => {
            router.replace('/login')
        },
        onError: (e) => {
            console.log(e)
            showErrorNotification({ title: t('errors.auth.otp.title'), message: t('errors.auth.otp.message') });
        }
    });


    const verify = () => {
        console.log(mode, "MODE")
        switch (mode) {
            case 'register': register({ ...userData, code: otp })
            case 'restore': restore({ email: userData.email, code: otp, new_password: userData.password })
        }
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
        <Button loading={registerIsLoading} onClick={verify} disabled={otp.length !== 6 || registerIsLoading} variant="base">{t('auth.confirm.btn')}</Button>
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
