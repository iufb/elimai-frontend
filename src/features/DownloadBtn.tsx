'use client'
import { Ticket } from "@/shared/types"

import { Button } from "@mantine/core"

import "/public/Nunito-Bold-normal.js"

import { useCreatePdf } from "@/shared/hooks"
import { useTranslations } from "next-intl"

interface DownloadBtnProps {
    tickets: Ticket[]
    type: 'ticket' | 'sub'
}
export const DownloadBtn = ({ type, tickets }: DownloadBtnProps) => {
    const { createTicket, createSub } = useCreatePdf()
    const download = () => {
        if (tickets) {
            type == 'ticket' ? createTicket(tickets) : createSub(tickets[0].code)
        }
    }

    const t = useTranslations()
    return <Button variant="base" onClick={download}>{t('result.download')}</Button>
}
