import axios from 'axios';

interface ExecuteCodeResponse {
  output: string;
  error?: string;
  status_code: number;
}

interface ExecuteCodeProps {
  language: string; // Specify the type for language
  sourceCode: string; // Specify the type for sourceCode
  version: string;
}

const API = axios.create({
  baseURL: 'https://emkc.org/api/v2/piston',
});

export const executeCode = async ({
  language,
  sourceCode,
  version,
}: ExecuteCodeProps): Promise<ExecuteCodeResponse> => {
  try {
    const response = await API.post('/execute', {
      language: language,
      version: version,
      files: [
        {
          content: sourceCode,
        },
      ],
    });
    // console.log(response.data);

    return response.data.run;
  } catch (error) {
    console.error('Error executing code:', error);

    // Check if the error is an AxiosError
    if (axios.isAxiosError(error)) {
      return {
        output: '',
        error:
          error.response?.data?.error ||
          'An error occurred while executing the code.',
        status_code: error.response?.status || 500,
      };
    }

    // Fallback for other types of errors
    return {
      output: '',
      error: 'An unexpected error occurred.',
      status_code: 500,
    };
  }
};
