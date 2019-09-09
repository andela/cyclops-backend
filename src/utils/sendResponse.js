export const sendErrorResponse = (res, code, errorMessage) => res.status(code).send({
  status: 'error',
  error: errorMessage,
});
export const sendSuccessResponse = (res, code, data) => res.status(code).send({
  status: 'success',
  data
});

export const successResponse = (res, code, successMessage) => {
  res.status(code).json({
    status: 'Success',
    message: successMessage,
  });
};
