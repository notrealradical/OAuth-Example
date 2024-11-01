// Dotenv
import dotenv from "dotenv";
dotenv.config();

// Variables
const env = process.env;

// Export Env
export default {
    PORT: env.PORT || 3000,
    BASE_URL: env.BASE_URL,

    JWT_SECRET: env.JWT_SECRET,

    DISCORD_CLIENT_ID: env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: env.DISCORD_CLIENT_SECRET,

    ROBLOX_CLIENT_ID: env.ROBLOX_CLIENT_ID,
    ROBLOX_CLIENT_SECRET: env.ROBLOX_CLIENT_SECRET,
};
