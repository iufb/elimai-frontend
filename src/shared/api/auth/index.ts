import { backendUrl, customFetch } from "@/shared/api";

export const rLogin = (body: { email: string; password: string }) => {
    return customFetch({ method: "POST", path: 'login/', body: { json: body } });
};


export const rSendCode = (email: string) => {
    return customFetch({ method: "POST", path: 'send-code/', body: { json: { email } } })
}
export const rVerifyCode = (data: {
    email: string,
    code: string,
    password: string
}) => {
    return customFetch({ method: "POST", path: 'verify-code/', body: { json: { ...data, full_name: " " } } })
}

export const rRefreshToken = async (refresh: string): Promise<{ access: string } | undefined> => {
    console.log(refresh)
    const url = `${backendUrl}/api/token/refresh/`
    try {
        const response = await fetch(url, {
            method: "POST", body: JSON.stringify({ refresh }), headers: {
                'Content-type': 'application/json'
            }
        })
        if (!response.ok) {
            throw {
                message: "Error, can't refresh access token",
                status: response.status,
                url: response.url,
            }
        }
        const data = await response.json()
        console.log(data)
        return data
    } catch (e) {
        console.log(e)
    }
}
