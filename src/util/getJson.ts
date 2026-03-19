
export default async function getJsonHttps(url: string): Promise<unknown> {
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol !== "https:") {
        throw new Error("Invalid HTTPS URL");
    }

    const response = await fetch(parsedUrl.toString(), {
        method: "GET",
        headers: {
            Accept: "application/json",
            "User-Agent": "nodejs"
        }
    });

    if (!response.ok) {
        const err = new Error(`HTTP ${response.status}: ${response.statusText}`) as Error & {
            statusCode?: number;
            statusMessage?: string;
        };

        err.statusCode = response.status;
        err.statusMessage = response.statusText;

        throw err;
    }

    try {
        return await response.json();
    } catch {
        throw new Error("Invalid JSON response");
    }
}