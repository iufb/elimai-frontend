import { revalidateToken } from "@/shared/api/auth";
import { getCookie } from "cookies-next";
export const backendUrl = process.env.NEXT_PUBLIC_BACKENDURL;
interface CRequest {
    path: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "UPDATE";
    token?: string;
    query?: URLSearchParams | Record<string, any>;
    body?: { json?: unknown; multipart?: Record<string, string | Blob> };
    returnType?: "json" | "blob"
}

export async function customFetch<T>({ returnType = "json", ...params }: CRequest): Promise<T> {
    const url = new URL(`/api/${params.path}`, backendUrl);

    if (params.query) {
        url.search =
            params.query instanceof URLSearchParams
                ? params.query.toString()
                : new URLSearchParams(params.query).toString();
    }

    let body: BodyInit | undefined;
    if (params.body) {
        if (params.body.json) {
            body = JSON.stringify(params.body.json);
        } else if (params.body.multipart && typeof params.body.multipart === "object") {
            const formData = new FormData();
            Object.entries(params.body.multipart).forEach(([key, value]) => {
                formData.append(key, value as string | Blob);
            });
            body = formData;
        }
    }

    const headers = new Headers();
    if (params.body?.json) {
        headers.set("Content-Type", "application/json");
    }
    const token = getCookie("access");
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const executeFetch = async () => {
        console.log(headers)
        return fetch(url, {
            method: params.method,
            body,
            cache: "no-store",
            headers,
        });
    };

    const handleResponse = async (response: Response) => {
        const isJson =
            response.headers.get("content-type")?.includes("application/json") &&
            params.method !== "DELETE" && returnType == 'json'

        if (response.ok) {
            return isJson ? response.json() : returnType == 'blob' ? response.blob() : response.text();
        }

        throw {
            message: response.statusText,
            status: response.status,
        };
    };

    let response = await executeFetch();

    if (response.status === 401) {
        const newAccessToken = await revalidateToken();
        if (newAccessToken) {
            headers.set("Authorization", `Bearer ${newAccessToken}`);
            response = await executeFetch();
            return handleResponse(response);
        } else {
            console.log("Refresh Failed")
            throw {
                message: response.statusText,
                status: response.status,
            };

        }
    }

    return handleResponse(response);
};


