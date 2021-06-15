const getComments = (req, res) => {
  res.send("getComments works");
};

const getComment = (req, res) => {
  res.send("getComment works");
};

const createComment = (req, res) => {
  res.send("createComment works");
};

const updateComment = (req, res) => {
  res.send("updateComment works");
};

const deleteComment = (req, res) => {
  res.send("deleteComment works");
};

module.exports = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
