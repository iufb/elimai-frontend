import { BaseLayout } from "@/widgets"
import { getTranslations } from "next-intl/server"

export default async function Layout({ params, children }: { params: { locale: string }, children: any }) {
    const t = await getTranslations()
    return <BaseLayout>{children}</BaseLayout>
}

//     return <><nav style={{
//         position: 'sticky',
//         top: 0,
//         zIndex: 1000,
//         backgroundColor: 'white'
//     }} >
//         <Box style={{
//             borderBottom: '1px solid var(--mantine-color-slate-3)'
//         }}
//         >
//             <Flex px={{ xs: 10, xl: 0 }} maw={1200} mx={'auto'} h={70} align={'center'} justify={'space-between'}  >
//                 <HeaderLink />
//                 <LocaleSwitcher />
//             </Flex>
//         </Box>
//     </nav>
//         <main className="main">
//             {children}
//             <Box maw={1200} mx={'auto'}>
//                 <Links />
//                 <Link href={'/policy'}>
//                     <Text px={{ xs: 10, xl: 0 }} className={'policy'} fw={'bold'} fz={'lg'}>
//                         {t('policy.title')}
//                     </Text>
//                 </Link>
//             </Box>
//         </main>
//         <footer>
//             <Text py={10} fz={14} ta={'center'} c={'gray.4'}>© {new Date().getFullYear()} {t('footer')}</Text>
//         </footer>
//     </>
//
// }
// const links =
//     [
//         { img: "/logonew.png", href: "/" },
//         { img: "/it-hub.png", href: "https://www.instagram.com/abai_it?igsh=MWU3MmIyNTdnMG05aQ==" },
//
//         { img: "/abu.png", href: "https://www.instagram.com/bokeikhan_university?igsh=MXBpaG43djVoZ3dxMA==" },
//         { img: "/abai-it.png", href: "https://www.instagram.com/abai_it_school?igsh=MWtrOHc2eWkzb2JwOQ==" }
//     ]
//
// const Links = () => {
//     return <Flex wrap={'wrap'} gap={10} justify={'center'} align={'center'} py={40} >
//         {links.map(link =>
//             <Center pos={'relative'} w={120} h={120} key={link.href} style={{
//                 border: '1px solid var(--mantine-color-gray-3)',
//                 borderRadius: 100
//             }}>
//                 <Link style={{ margin: 10 }} href={link.href} target='_blank'>
//                     <Image fill src={link.img} alt='logo' />
//                 </Link></Center>)}
//     </Flex>
// 

