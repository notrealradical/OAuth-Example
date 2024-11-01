// Type Defintions
import type { Request, Response } from "express";

// Dependencies
import { RobloxAuth, CodeVerifier, State } from "@/utils/oauth";

// Export GET Route
export async function GET(req: Request, res: Response) {
    // Variables
    const authScopes = ["openid", "profile"];
    const generatedState = State();
    const generatedCodeVerifier = CodeVerifier();
    let url;

    // Set State and CodeVerifier Cookie
    res.cookie("state", generatedState);
    res.cookie("codeverifier", generatedCodeVerifier);

    // Attempt URL Creation
    try {
        url = RobloxAuth.createAuthorizationURL(
            generatedState,
            generatedCodeVerifier,
            authScopes
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
