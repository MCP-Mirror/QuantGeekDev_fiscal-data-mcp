import { BaseToolImplementation } from "mcp-framework";
import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const TREASURY_URL =
  "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/dts/operating_cash_balance?filter=record_date:eq:";

class GetDailyTreasuryStatement extends BaseToolImplementation {
  name = "get_daily_treasury_statement";
  toolDefinition: Tool = {
    name: this.name,
    description: "Get the daily treasury statement for a specific day",
    inputSchema: {
      type: "object",
      properties: {
        date: {
          type: "string",
          description:
            "Date of the statement strictly in this format: `2024-02-06` `2023-02-26`",
        },
      },
    },
  };

  async toolCall(request: z.infer<typeof CallToolRequestSchema>) {
    try {
      const date = request.params.arguments?.date;
      if (!date) {
        throw new Error("Missing date");
      }
      const url = TREASURY_URL + date;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error fetching treasury data");
      }

      const body = await response.json();
      return this.createSuccessResponse(body.data);
    } catch (error) {
      return this.createErrorResponse((error as Error).message);
    }
  }
}

export default GetDailyTreasuryStatement;
