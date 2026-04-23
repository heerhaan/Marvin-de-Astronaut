// getJsonHttps.js
const https = require("https");

function getJsonHttps (url)
{
    return new Promise((resolve, reject) =>
    {
        if (typeof url !== "string")
        {
            return reject(new Error("URL must be a string"));
        }

        const match = url.match(/^https:\/\/([^/]+)(\/.*)?$/i);
        if (!match)
        {
            return reject(new Error("Invalid HTTPS URL"));
        }

        let host = match[1];
        let path = match[2] || "/";
        let port = 443;

        if (host.includes(":"))
        {
            const parts = host.split(":");
            host = parts[0];
            port = parseInt(parts[1], 10) || 443;
        }

        const options = {
            method: "GET",
            hostname: host,
            port,
            path,
            headers: {
                "Accept": "application/json",
                "User-Agent": "nodejs"
            }
        };

        const req = https.request(options, (res) =>
        {
            let data = "";

            res.on("data", (chunk) =>
            {
                data += chunk;
            });

            res.on("end", () =>
            {
                // Non-OK status → fail with metadata
                if (res.statusCode < 200 || res.statusCode >= 300)
                {
                    const err = new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`);
                    err.statusCode = res.statusCode;
                    err.statusMessage = res.statusMessage;
                    return reject(err);
                }

                try
                {
                    let result = JSON.parse(data);
                    resolve(result);
                } catch (parseErr)
                {
                    parseErr.message = "Invalid JSON response";
                    reject(parseErr);
                }
            });
        });

        req.on("error", reject);
        req.end();
    });
}

module.exports = getJsonHttps;
