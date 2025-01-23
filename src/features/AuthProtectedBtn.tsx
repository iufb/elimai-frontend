'use client'

import { useAuth } from "@/shared/hooks"
import { Modal, UnstyledButton, UnstyledButtonProps } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

interface AuthProtectedButtonProps extends UnstyledButtonProps {
    label: string
    action: () => void
}
export const AuthProtectedButton = ({ label, action, className, ...props }: AuthProtectedButtonProps) => {
    const [opened, { open, close }] = useDisclosure(false);
    const { isLogged } = useAuth()
    const handleClick = () => {
        console.log('clicked')
        if (isLogged) {
            action()
            return
        }
        open()
    }
    return <>
        <Modal size={'lg'} opened={opened} onClose={close} title={'Вы не авторизованны'}>
            modal
        </Modal>
        <UnstyledButton className={className} onClick={handleClick} {...props}>{label}</UnstyledButton></>
}
