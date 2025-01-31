import { Metadata } from 'next'
import Link from 'next/link'
import styles from './not-found.module.css'
export const metadata: Metadata = {
    title: "Страница не найдена"
}
export default function NotFound() {
    return <html>
        <body>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Страница не найдена.
                    </h1>
                    <Link className={styles.link} href={'/'}>На главную</Link>
                </div>
            </div>
        </body>
    </html >
}
