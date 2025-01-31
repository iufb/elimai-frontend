import { useRouter } from "@/i18n/routing"
import { useAuth } from "@/shared/context"
import { Button } from "@mantine/core"
import { deleteCookie } from "cookies-next/client"
import { LogOutIcon } from "lucide-react"
import { useTranslations } from "next-intl"

export const LogoutBtn = () => {
    const router = useRouter()
    const { logout } = useAuth()
    const handleLogout = () => {
        deleteCookie("access")
        deleteCookie("refresh")
        deleteCookie("email")
        if (logout) logout()
        router.replace('/')
    }
    const t = useTranslations()
    return <Button variant={'base'} rightSection={<LogOutIcon size={14} />} onClick={handleLogout}>{t('auth.logout')}</Button>
}
