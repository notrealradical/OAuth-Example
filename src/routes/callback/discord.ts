// Type Defintions
import type { Request, Response } from "express";

// Dependencies
import env from "@/utils/env";
import jwt from "jsonwebtoken";
import { DiscordAuth } from "@/utils/oauth";

// Export GET Route
export async function GET(req: Request, res: Response) {
    // Query Parameters
    const { code, state: returnedState } = req.query;
    const storedState = req.cookies.state;

    // Validate Query Params
    if (!code || !returnedState) {
        return res.status(400).json({
            success: false,
            error: "Missing required parameters.",
        });
    }

    // Verify State Match
    if (returnedState !== storedState) {
        return res.status(400).json({
            success: false,
            error: "Invalid state parameter.",
        });
    }

    // Remove State Cookie
    res.cookie("state", null);

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

    // Return Response
    return res.json({
        success: true,
        jwt: token,
    });
}
