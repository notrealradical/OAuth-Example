// Type Defintions
import type { Request, Response } from "express";

// Dependencies
import { RobloxAuth, CodeVerifier, State } from "@/utils/oauth";

// Export GET Route
export async function GET(req: Request, res: Response) {
    const scopes = ["openid", "profile"];
    const url = RobloxAuth.createAuthorizationURL(State, CodeVerifier, scopes);

    return res.json({
        success: true,
        url: url,
    });
}
