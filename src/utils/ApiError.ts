class ApiError extends Error {
    public statusCode: number;
    public data: null | any; // Adjust the type according to your needs
    public errors: any[]; // Adjust the type according to your needs
  
    constructor(statusCode: number, message = "Something went wrong", errors: any[] = [], stack = "") {
      super(message);
  
      this.statusCode = statusCode;
      this.data = null;
      this.message = message;
      this.errors = errors;
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  export { ApiError };
  