import { AdminLayout } from "@/widgets"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <AdminLayout>
        {children}
    </AdminLayout>
}
