const sendResponse = (res, data, code) =>
  res.status(code).send({ data, message: {} });

const sendError = (res, message, code) =>
  res.status(code).send({ data: {}, message });

const statusCodes = {
  success: {
    ok: 200,
    created: 201,
    noContent: 204,
  },

  error: {
    badRequest: 400,
    unAuthenticated: 401,
    unAuthorized: 403,
    notFound: 404,
    invalidMediaType: 415,
    invalidData: 422,
    serverError: 500,
  },
};

const errorMessages = {
  notFound: "Not found",
  missingParam: "Missing a required field",
  unAuthorized: "you don't have access to this resource",
};

module.exports = { errorMessages, sendError, sendResponse, statusCodes };
