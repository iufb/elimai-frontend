import { rRefreshToken } from "@/shared/api/auth";
import { getCookie } from "cookies-next";
import { setCookie } from "cookies-next/client";
export const backendUrl = process.env.NEXT_PUBLIC_BACKENDURL;
interface CRequest {
    path: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "UPDATE";
    token?: string;
    query?: URLSearchParams | Record<string, any>;
    body?: { json?: unknown; multipart?: Record<string, string | Blob> };
}

export const customFetch = async (params: CRequest) => {
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
    const token = getCookie("token");
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const executeFetch = async () => {
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
            params.method !== "DELETE";

        if (response.ok) {
            return isJson ? response.json() : response.text();
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
            throw new Error("Token refresh failed");
        }
    }

    return handleResponse(response);
};

const revalidateToken = async (): Promise<string | null> => {
    try {
        const refresh = getCookie('refresh');
        if (!refresh) {
            console.log('No refresh token available');
            return null;
        }
        const response = await rRefreshToken(refresh as string);
        if (response && response.access) {
            // Optionally, store the new access token
            setCookie('access', response.access);
            return response.access;
        }
        return null;
    } catch (error) {
        console.log('Token revalidation error:', error);
        return null;
    }
};
