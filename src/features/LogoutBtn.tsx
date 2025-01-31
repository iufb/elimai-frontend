import { useRouter } from "@/i18n/routing"
import { useAuth } from "@/shared/context"
import { ActionIcon } from "@mantine/core"
import { deleteCookie } from "cookies-next/client"
import { LogOutIcon } from "lucide-react"

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
    return <ActionIcon bg={'elimai.6'} aria-label="Logout" onClick={handleLogout}><LogOutIcon /></ActionIcon>
}
