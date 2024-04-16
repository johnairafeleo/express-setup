export const errorMessage = (message: string, status?: number) => {
  return {
    errors: [
      {
        statusCode: status,
        msg: message,
      },
    ],
  };
};
