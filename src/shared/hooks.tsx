'use client'

import { customFetch } from "@/shared/api"
import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"

export const useAuth = () => {
    const [authStatus, setAuthStatus] = useState({ isLogged: false, isAdmin: false })
    useEffect(() => {
        const token = getCookie('access')
        customFetch({ method: "GET", path: "is-admin/" }).then(() => {
            setAuthStatus({ isLogged: true, isAdmin: true })
        }).catch(e => { })
    }, [])
    console.log(authStatus)
    return authStatus
}
