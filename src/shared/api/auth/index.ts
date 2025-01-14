import { customFetch } from "@/shared/api";

const path = "api-token-auth/";
export const rLogin = (body: { username: string; password: string }) => {
    return customFetch({ method: "POST", path, body: { json: body } });
};


