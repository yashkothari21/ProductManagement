const userService = require("../service/userService");

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const loginUser = await userService.LoginUser(req.body);
    if (!loginUser) {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      res.json({ data: loginUser, status: "success" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports ={
    createUser,
    loginUser
}
