const sendErrorResponse = (res, code, errorMessage) => {
  res.status(code).json({
    status: 'error',
    error: errorMessage,
  });
};

export default sendErrorResponse;
