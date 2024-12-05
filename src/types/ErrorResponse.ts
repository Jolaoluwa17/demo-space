interface ErrorResponse {
  status: number;
  data: {
    error: string;
    response?: string;
    message?: string;
  };
}

export default ErrorResponse;
