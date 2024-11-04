// Type Defintions
import type { Request, Response } from "express";

// Dependencies
import env from "@/utils/env";
import jwt from "jsonwebtoken";

// Export GET Route
export async function GET(req: Request, res: Response) {
    // Auth Header
    const auth_header = req.headers.authorization;
    if (!auth_header || !auth_header.startsWith("Bearer")) {
        return res.status(401).json({
            success: false,
            error: "No Bearer Auth Token present.",
        });
    }

    // Auth Token
    const auth_token = auth_header.split(" ")[1];
    if (!auth_token) {
        return res.status(401).json({
            success: false,
            error: "No Auth Token present.",
        });
    }

    // Verify Token Variable
    let verify_token;

    // Attempt Token Verification
    try {
        verify_token = jwt.verify(auth_token, env.JWT_SECRET as string);
    } catch (e) {
        verify_token = false;
    }

    // Check Token Valid
    if (!verify_token) {
        return res.status(403).json({
            success: false,
            error: "Token is invalid.",
        });
    }

    // Return Success
    return res.status(200).json({
        success: true,
    });
}
