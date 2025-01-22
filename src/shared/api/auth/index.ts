import { customFetch } from "@/shared/api";

const path = "api-token-auth/";
export const rLogin = (body: { username: string; password: string }) => {
    return customFetch({ method: "POST", path, body: { json: body } });
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
