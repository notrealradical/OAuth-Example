// Type Defintions
import type { Request, Response } from "express";

// Dependencies
import { DiscordAuth, State } from "@/utils/oauth";

// Export GET Route
export async function GET(req: Request, res: Response) {
    const scopes = ["identify"];
    const url = DiscordAuth.createAuthorizationURL(State, scopes);

    return res.json({
        success: true,
        url: url,
    });
}
