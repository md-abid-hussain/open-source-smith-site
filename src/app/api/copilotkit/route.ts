import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
  GoogleGenerativeAIAdapter,
} from "@copilotkit/runtime";
import { NextRequest } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env["GOOGLE_API_KEY"]);

const runtime = new CopilotRuntime();

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const serviceAdapter = new GoogleGenerativeAIAdapter({ model });

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};
