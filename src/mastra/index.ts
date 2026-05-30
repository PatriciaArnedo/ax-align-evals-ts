import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
// Import orchestrator/worker agents - this is the only workflow pattern now
import { weatherOrchestratorAgent } from './agents/weather-orchestrator-agent';

import {
  isOpenInferenceSpan,
  OpenInferenceOTLPTraceExporter,
} from "@arizeai/openinference-mastra";

export const mastra = new Mastra({
  // No workflows - using pure orchestrator/worker agent pattern
  agents: { 
    // Orchestrator agent that coordinates the entire workflow
    weatherOrchestratorAgent
  },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  telemetry: {
    enabled: true,
    serviceName: "mastra-orchestrator-workflow",
    export: {
      type: "custom",
      tracerName: "mastra-orchestrator-workflow",
      exporter: new OpenInferenceOTLPTraceExporter({
        url: "https://otlp.arize.com/v1/traces",
        headers: {
          "arize-space-id": process.env.ARIZE_SPACE_ID,
          "arize-api-key": process.env.ARIZE_API_KEY,
        },
        spanFilter: isOpenInferenceSpan,
      }),
    },
  },
});
