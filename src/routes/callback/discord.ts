// Type Defintions
import type { Request, Response } from "express";

// Dependencies
import env from "@/utils/env";
import jwt from "jsonwebtoken";
import { DiscordAuth, State } from "@/utils/oauth";

// Export GET Route
export async function GET(req: Request, res: Response) {
    // Query Parameters
    const { code, state: returnedState } = req.query;

    // Validate Query Params
    if (!code || !returnedState) {
        return res.status(400).json({
            success: false,
            error: "Missing required parameters.",
        });
    }

    // Verify State Match
    if (returnedState !== State) {
        return res.status(400).json({
            success: false,
            error: "Invalid state parameter.",
        });
    }

    // Variables
    let userDetails;
    let authToken;

    // Attempt Auth Token Creation
    try {
        authToken = await DiscordAuth.validateAuthorizationCode(code as string);
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error,
        });
    }

    // Check Auth Token
    if (!authToken) {
        return res.status(500).json({
            success: false,
            error: "Failed to get authorization token.",
        });
    }

    // Get User Details
    try {
        const userResponse = await fetch("https://discord.com/api/users/@me", {
            headers: {
                Authorization: `Bearer ${authToken.accessToken()}`,
            },
        });
        userDetails = await userResponse.json();
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error,
        });
    }

    // Generate JWT
    const token = jwt.sign(
        {
            user: {
                id: userDetails.id,
                username: userDetails.username,
            },
        },
        env.JWT_SECRET as string
    );

    res.cookie("authtoken", token, {
        domain: "www.qvgk.org",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });

    // Return Response
    return res.redirect("https://www.qvgk.org");
}
