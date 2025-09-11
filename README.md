# 🌦️ Mastra Weather Orchestrator with Phoenix Evaluation

A Mastra orchestrator agent with Phoenix evaluation pipeline for weather-based activity planning.

## 🚀 Quick Start

### 1. Setup & Run Agent (Generate Traces First)
```bash
# Install dependencies
npm install
deno install

# Set environment variables
export OPENAI_API_KEY="your-openai-api-key"
export PHOENIX_COLLECTOR_ENDPOINT="http://localhost:6006"

# Start Phoenix server (separate terminal)
phoenix serve

# Start Mastra agent GUI 
npm start
```

**Make requests to generate traces with tool calls** - this is essential for the evaluation pipeline.

### 2. Run Evaluation Notebook
```bash
# Start Jupyter with Deno kernel
jupyter notebook

# Open and run: aligning_evals_mastra.ipynb
```

## 🏗️ How It Works

**Orchestrator + Tools Pattern**: A single orchestrator agent coordinates three specialized tools:

```
📍 User Request → 🎯 Weather Orchestrator Agent
    ↓
🌤️ weatherTool (fetch weather data)
    ↓
🔍 weatherAnalysisTool (analyze patterns)  
    ↓
📅 activityPlanningTool (recommend activities)
    ↓
✅ Final Response
```

### Architecture:
- **🎯 Weather Orchestrator**: Single agent that enforces tool usage flow
- **🌤️ Weather Tool**: Direct API calls to fetch weather data
- **🔍 Analysis Tool**: AI-powered weather pattern analysis
- **📅 Planning Tool**: AI-powered activity recommendations

## 🛠️ Commands

```bash
npm start          # Start Mastra agent GUI
npm run verify     # Check setup
deno install       # Install Deno dependencies
jupyter notebook   # Start evaluation notebook
```

## 📚 Learn More

- [Mastra Documentation](https://mastra.ai)
- [Arize Phoenix](https://phoenix.arizeai.com)
- [OpenInference Tracing](https://github.com/Arize-ai/openinference)
