// Type Defintions
import type { Request, Response } from "express";

// Dependencies
import { RobloxAuth, CodeVerifier, State } from "@/utils/oauth";

// Export GET Route
export async function GET(req: Request, res: Response) {
    // Variables
    const scopes = ["openid", "profile"];
    let url;

    // Attempt URL Creation
    try {
        url = RobloxAuth.createAuthorizationURL(
            State(),
            CodeVerifier(),
            scopes
        );
    } catch (e) {
        return res.status(500).json({
            success: false,
            error: "Failed to create AuthorizationURL.",
        });
    }

    // Return URL
    return res.json({
        success: true,
        url: url,
    });
}
