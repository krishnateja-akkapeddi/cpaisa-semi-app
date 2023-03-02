interface APIResponse<T> {
  error?: Error;
  response?: T;
}

export default APIResponse;
