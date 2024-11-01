// Dependencies
import env from "@/utils/env";
import express from "express";
import createRouter, { router } from "express-file-routing";
import path from "path";
import c from "chalk";

// Application
const app = express();
await createRouter(app, {
    directory: path.join(__dirname, "routes"),
});

// Variables
const PORT = env.PORT;

// Start server
app.listen(PORT, () => {
    console.log(c.greenBright(`Listening on port: ${c.bold(PORT)}`));
});

// Export App
export default app;
