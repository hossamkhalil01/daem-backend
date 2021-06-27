const getArticles = (req, res) => {
  res.send("getArticles works");
};

const getArticle = (req, res) => {
  res.send("getArticle works");
};

const createArticle = (req, res) => {
  res.send("createArticle works");
};

const updateArticle = (req, res) => {
  res.send("updateArticle works");
};

const deleteArticle = (req, res) => {
  res.send("deleteArticle works");
};

module.exports = {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
};
