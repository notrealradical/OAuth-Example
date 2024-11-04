// Dependencies
import env from "@/utils/env";
import { Discord, Roblox, generateState, generateCodeVerifier } from "arctic";

// Generators
export const State = generateState;
export const CodeVerifier = generateCodeVerifier;

// Discord OAuth
export const DiscordAuth = new Discord(
    env.DISCORD_CLIENT_ID as string,
    env.DISCORD_CLIENT_SECRET as string,
    `${env.BASE_URL}/callback/discord`
);
