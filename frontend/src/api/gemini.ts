import axios from 'axios';

const apiUrl = '/api/gemini'; // Proxy API route from Vite to backend

// Define the types for the input (prompt) and the response
interface GeminiResponse {
  response: string;
}

export const generateGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await axios.post<GeminiResponse>(apiUrl, { prompt });
    return response.data.response;
  } catch (error) {
    console.error('Error generating Gemini response:', error);
    throw error;
  }
};
