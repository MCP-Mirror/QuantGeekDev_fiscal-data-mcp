#!/usr/bin/env node
import { MCPServer } from "mcp-framework";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = new MCPServer({
  name: "fiscal-data-mcp",
  version: "0.0.1",
  toolsDir: join(__dirname, "tools"),
});

server.start().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
