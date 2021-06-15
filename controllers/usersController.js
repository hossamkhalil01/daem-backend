const getUsers = (req, res) => {
  res.send("getUsers works");
};

const getUser = (req, res) => {
  res.send("getUser works");
};

const createUser = (req, res) => {
  res.send("createUser works");
};

const updateUser = (req, res) => {
  res.send("updateUser works");
};

const deleteUser = (req, res) => {
  res.send("deleteUser works");
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
