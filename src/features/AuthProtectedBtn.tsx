'use client'

import { Link } from "@/i18n/routing"
import { useAuth } from "@/shared/context"
import { Button, Modal, Text, Title, UnstyledButton } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useTranslations } from "next-intl"

interface AuthProtectedButtonProps {
    label: string
    action: () => void
    variant?: string
    className?: string
    disabled?: boolean
}
export function AuthProtectedButton({ label, className, action, variant, disabled, ...props }: AuthProtectedButtonProps) {
    const [opened, { open, close }] = useDisclosure(false);
    const { isLogged } = useAuth()
    const handleClick = () => {
        // const token = getCookie('access')
        // if (!token) {
        //     open()
        //     return;
        // }
        // customFetch({ method: "GET", path: "is-admin/" }).then(() => {
        //     action()
        // }).catch(e => {
        //     if (e.status == 403) {
        //         action()
        //     } else {
        //         open()
        //     }
        // })
        //
        console.log('clicked')
        if (isLogged) {
            action()
            return
        }
        open()
    }
    const t = useTranslations()
    return <>
        <Modal size={'lg'} opened={opened} onClose={close} >
            <Title order={3}></Title>
            <Text>{t.rich('auth.protected.desc', { login: chunk => <Link className="link" href={'/login'}>{chunk}</Link>, register: chunk => <Link className="link" href={'/register'}>{chunk}</Link>, })}</Text>
        </Modal>
        {variant ?
            <Button variant={variant} onClick={handleClick} disabled={disabled}>{label}</Button> :
            <UnstyledButton onClick={handleClick} className={className}>{label}</UnstyledButton>
        }</>


        }
