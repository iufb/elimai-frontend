'use client'

import { Link } from "@/i18n/routing"
import { useAuth } from "@/shared/context"
import { Button, Modal, Text, Title, UnstyledButton } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useTranslations } from "next-intl"

interface AuthProtectedButtonProps<T> {
    label: string
    action: () => void
    variant?: string
    className?: string
    disabled?: boolean
    btnProps?: T
}
export function AuthProtectedButton<T>({ label, btnProps, className, action, variant, disabled, ...props }: AuthProtectedButtonProps<T>) {
    const [opened, { open, close }] = useDisclosure(false);
    const { isLogged } = useAuth()
    const handleClick = () => {
        if (isLogged) {
            action()
            return
        }
        open()
    }
    const t = useTranslations()
    return <>
        <Modal data-id='AuthProtectedModal' size={'lg'} opened={opened} onClose={close} >
            <Title order={3}></Title>
            <Text>{t.rich('auth.protected.desc', { login: chunk => <Link className="link" href={'/login'}>{chunk}</Link>, register: chunk => <Link className="link" href={'/register'}>{chunk}</Link>, })}</Text>
        </Modal>
        {variant ?
            <Button variant={variant} onClick={handleClick} disabled={disabled} {...btnProps}>{label}</Button> :
            <UnstyledButton onClick={handleClick} className={className} {...btnProps}>{label}</UnstyledButton>
        }</>
}
