import { timingSafeEqual } from "crypto"
import type { BaseContext } from "../utilities/api/baseContext.js"
import { Environment } from "../utilities/environment.js"
import { Exception } from "../utilities/exception.js"


export async function checkApiKeyMiddleware(parameters: {
    context: BaseContext
}) {
    try {
        const authorizationHeader = parameters.context.request.headers["authorization"]
        if (authorizationHeader === undefined) {
            throw new Exception({
                internalMessage: "Missing Authorization header",
                externalMessage: "Unauthorized",
                statusCode: 401,
            })
        }

        const parts = authorizationHeader.split(" ")
        if (parts.length !== 2 || parts[0] !== "Bearer") {
            throw new Exception({
                internalMessage: "Invalid Authorization header format",
                externalMessage: "Unauthorized",
                statusCode: 401,
            })
        }

        const providedKey = parts[1]
        const expectedKey = Environment.ADMIN_API_KEY

        if (providedKey.length !== expectedKey.length) {
            throw new Exception({
                internalMessage: "Invalid API key",
                externalMessage: "Unauthorized",
                statusCode: 401,
            })
        }

        const isValid = timingSafeEqual(
            Buffer.from(providedKey),
            Buffer.from(expectedKey),
        )

        if (!isValid) {
            throw new Exception({
                internalMessage: "Invalid API key",
                externalMessage: "Unauthorized",
                statusCode: 401,
            })
        }
    }
    catch (error: unknown) {
        throw new Exception({
            internalMessage: "API key verification failed",
            externalMessage: "Unauthorized",
            statusCode: 401,
            rawError: error,
        })
    }
}
