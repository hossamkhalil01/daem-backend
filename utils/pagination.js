const DEFAULT_LIMIT = 5;

const extractPaginationInfo = (queryParams) => {

  // extract pagination info
  let page = queryParams.page
  if (!page || page < 1) page = 1

  const offset = page - 1;
  const limit = queryParams.limit ? queryParams.limit : DEFAULT_LIMIT;

  // copy the object
  extractedObj = { ...queryParams };

  // remove pagination info from the object
  delete extractedObj.page
  delete extractedObj.limit

  return [{ offset, limit }, extractedObj]
}

module.exports = { extractPaginationInfo }