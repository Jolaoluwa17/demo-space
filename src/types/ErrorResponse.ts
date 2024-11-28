interface ErrorResponse {
  status: number;
  data: {
    error: string;
    response: string;
  };
}

export default ErrorResponse;
