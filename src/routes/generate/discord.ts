// Type Defintions
import type { Request, Response } from "express";

// Dependencies
import { DiscordAuth, State } from "@/utils/oauth";

// Export GET Route
export async function GET(req: Request, res: Response) {
    // Variables
    const scopes = ["identify"];
    let url;

    // Attempt URL Creation
    try {
        url = DiscordAuth.createAuthorizationURL(State, scopes);
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
