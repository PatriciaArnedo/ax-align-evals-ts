# 🌦️  Align LLM Judge Evals (Mastra & Arize AX)

A Mastra orchestrator agent with Arize AX evaluation pipeline for weather-based activity planning.

## 📋 Prerequisites

- [**Node.js**]((https://nodejs.org)) (v18+)
- **Deno**

  ```bash
  curl -fsSL https://deno.land/install.sh | sh
  ```

- **Jupyter**

  ```bash
  pip install jupyter notebook
  ```

## 🚀 Quick Start

### 1. Setup & Run Agent (Generate Traces First)

```bash
# Install dependencies
npm install
deno install

# Set environment variables
export OPENAI_API_KEY="your-openai-api-key"
export ARIZE_API_KEY="your-arize-api-key"
export ARIZE_SPACE_ID="your-arize-space-id"

# Start Mastra agent GUI 
npm start
```

**Make requests to generate traces with tool calls** - this is essential for the evaluation pipeline.

### 2. Run Evaluation Notebook

Register the Deno kernel:

  ```bash
  deno jupyter --install
  ```

Then run the Jupyter notebook and select `aligning_evals_mastra.ipynb`.

```bash
# Start Jupyter with Deno kernel
jupyter notebook
```

To run the notebook:

- Press **Shift + Enter** to run a cell and advance to the next one
- Or use **Run → Run All Cells** from the menu to run everything at once

Run cells in order top to bottom.

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
- [Arize AX Documentation](https://arize.com/docs/ax/)
- [OpenInference Tracing](https://github.com/Arize-ai/openinference)
