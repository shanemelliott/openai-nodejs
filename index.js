const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Function to initialize an Azure OpenAI client
function initializeClient() {
  const apiKey = process.env.AZURE_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('API key is missing from environment variables.');
  }
  console.log(apiKey)
  const clientConfig = {
    apiKey,
    apiVersion: '2024-02-15-preview',  // Using the preview version for GPT-4o access
    azureEndpoint: 'https://spd-prod-openai-va-apim.azure-api.us/api/openai/deployments/gpt-4o/chat/completions?api-version=2024-02-15-preview'  // VA-specific endpoint
  };               
  console.log('Client initialized successfully');
  return clientConfig;
}

// Function to query the LLM model
async function queryLLM(client, message) {
  const url = `${client.azureEndpoint}`;

  try {
    const response = await axios.post(
      url,
       {messages: [
      {
        role: "user",
        content: message
      }
    ]},
      {
        headers: {
          'api-key': client.apiKey,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    if (error.response) {
      if (error.response.status === 429) {
        console.error('Rate limit exceeded. Please try again later.');
      } else if (error.response.status === 404) {
        console.error('Resource not found (404). Check if the endpoint URL and model name are correct.');
      } else {
        console.error(`HTTP error (${error.response.status}): ${error.response.statusText}`);
      }
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
}

// Main function to orchestrate the API call
async function main() {
  try {
    // Initialize client
    const client = initializeClient();
    
    // Test message
    const testMessage = "Hello! What was Lincoln's promise to veterans?";
    
    // Get response from LLM
    const response = await queryLLM(client, testMessage);
    
    // Print the response
    console.log('\nResponse from LLM:');
    console.log(response);
    
  } catch (error) {
    console.error('Error occurred:', error.message);
  }
}

// Run the main function
main();