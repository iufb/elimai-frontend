import { getCookie } from "cookies-next";
const backendUrl = process.env.NEXT_PUBLIC_BACKENDURL;
interface CRequest {
    path: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "UPDATE";
    token?: string;
    query?: URLSearchParams | Record<string, any>;
    body?: { json?: unknown; multipart?: Record<string, string | Blob> };
}
export const customFetch = async (params: CRequest) => {
    const url = new URL(`/api/${params.path}`, backendUrl);
    url.search =
        params.query instanceof URLSearchParams
            ? params.query.toString()
            : new URLSearchParams(params.query).toString();
    let body;
    if (params.body) {
        if (params.body.json) {
            body = JSON.stringify(params.body?.json);
        }
        if (
            params.body.multipart &&
            typeof params.body.multipart === "object" &&
            Object.keys(params.body.multipart).length > 0
        ) {
            const formData = new FormData();
            Object.keys(params.body.multipart).forEach((key) => {
                if (params.body?.multipart) {
                    formData.append(key, params.body.multipart[key]);
                }
            });
            body = formData;
        }
    }
    const headers = new Headers();
    if (params.body?.json) {
        headers.set("Content-Type", "application/json");
    }
    const token = getCookie("token");
    if (token) {
        headers.set("authorization", `Token ${token}`);
    }

    const response = await fetch(url, {
        method: params.method,
        body,
        cache: "no-store",
        headers,
    });
    const isJson =
        response.headers.get("content-type")?.includes("application/json") &&
        params.method !== "DELETE";
    if (response.ok) {
        if (isJson) {
            return response.json();
        }
        return response.text();
    }
    throw {
        error: response.statusText,
        status: response.status
    }
};
