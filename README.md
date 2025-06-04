# Azure OpenAI API Example

This project demonstrates how to connect to and interact with Azure OpenAI's GPT models using nodejs. The example code provides an  implementation for sending requests to the GPT-4o model, handling responses, and managing common API errors.

The LLM_API_Example demonstrates a way for working with Azure OpenAI services with nodejs:

- Secure loading of environment variables from a `.env` file
- Proper REST client initialization with error handling to call the Azure OpenAI API
- Efficient message sending to the GPT-4o model
- Response processing and display
- Comprehensive error handling, especially for rate limit (429) errors


## Installation

1. Clone this repository or navigate to the project directory
2. Install the required dependencies:

```
npm install
```

## Configuration

Create a `.env` file in the project directory with the following contents:

```
AZURE_OPENAI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual Azure OpenAI API key.

### Azure OpenAI Configuration

The example uses the following Azure OpenAI configuration:

- API Version: `2024-02-15-preview` (required for GPT-4o access)
- Azure Endpoint: VA-specific endpoint
- Model and deplopyment name: `gpt-4o`

## Usage

Run the example script:

```
npm . 
```

The script executes the following process:
1. Loads your API key from the .env file
2. makes a REST call to the Azure OpenAI API
3. Sends a test message to the GPT-4o model
4. Handles potential API errors, including rate limits
5. Displays the model's response
