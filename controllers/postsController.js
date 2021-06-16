const getPosts = (req, res) => {
  res.send("getPosts works");
};

const getPost = (req, res) => {
  res.send("getPost works");
};

const createPost = (req, res) => {
  res.send("createPost works");
};

const updatePost = (req, res) => {
  res.send("updatePost works");
};

const deletePost = (req, res) => {
  res.send("deletePost works");
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
