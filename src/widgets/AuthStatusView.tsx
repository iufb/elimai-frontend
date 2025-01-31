import { LogoutBtn } from "@/features"
import { Link } from "@/i18n/routing"
import { useAuth } from "@/shared/context"
import { BoxProps, Button, Center, Skeleton } from "@mantine/core"
import { useTranslations } from "next-intl"

export const AuthStatusView = (props: BoxProps) => {
    const { isLogged, loading } = useAuth()
    const t = useTranslations()
    return <Center miw={80} {...props}>{loading ? <Skeleton width={80} height={35} /> : isLogged ? <LogoutBtn /> : <Button component={Link} href={'/login'} w={'100%'} variant="base">{t('auth.login.btn')}</Button>}</Center>
}
