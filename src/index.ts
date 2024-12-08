#!/usr/bin/env node
import { MCPServer } from "mcp-framework";

const server = new MCPServer({
  name: "fiscal-data-mcp",
  version: "0.0.1",
  toolsDir: "./dist/tools",
});

server.start().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
