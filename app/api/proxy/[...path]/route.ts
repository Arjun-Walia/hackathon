import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DEFAULT_BACKEND_URL = "http://127.0.0.1:8000";

function getBackendBaseUrl(): string {
    const url =
        process.env.VIGILO_BACKEND_URL ||
        process.env.NEXT_PUBLIC_VIGILO_BACKEND_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        DEFAULT_BACKEND_URL;
    return url.endsWith("/") ? url.slice(0, -1) : url;
}

async function handleRequest(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> },
): Promise<NextResponse> {
    const { path } = await params;

    // Reconstruct the backend path from the catch-all segments
    const backendPath = "/" + path.join("/");

    // Preserve query string
    const search = request.nextUrl.search;
    const targetUrl = `${getBackendBaseUrl()}${backendPath}${search}`;

    // Forward relevant headers (strip host to avoid conflicts)
    const forwardHeaders = new Headers();
    forwardHeaders.set("Accept", "application/json");
    forwardHeaders.set("Content-Type", "application/json");

    const authorization = request.headers.get("Authorization");
    if (authorization) {
        forwardHeaders.set("Authorization", authorization);
    }

    let body: BodyInit | undefined;
    if (request.method !== "GET" && request.method !== "HEAD") {
        try {
            body = await request.text();
        } catch {
            body = undefined;
        }
    }

    try {
        const backendResponse = await fetch(targetUrl, {
            method: request.method,
            headers: forwardHeaders,
            body,
            cache: "no-store",
        });

        const responseText = await backendResponse.text();

        return new NextResponse(responseText, {
            status: backendResponse.status,
            headers: {
                "Content-Type":
                    backendResponse.headers.get("Content-Type") || "application/json",
            },
        });
    } catch (error) {
        console.error("[proxy] Backend request failed:", targetUrl, error);
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error ? error.message : "Backend request failed",
            },
            { status: 502 },
        );
    }
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
export const PUT = handleRequest;
