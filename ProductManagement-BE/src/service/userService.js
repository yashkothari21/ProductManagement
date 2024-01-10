const UserModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Role = require("../helper/role");
const moment = require("moment");

const createUser = async (user) => {
  let userRole;
  if (user.role !== Role.Admin) {
    userRole = Role.User;
  }else{
     userRole = Role.Admin
  }
  const newUser = {
    name:user.name,
    email:user.email,
    password:user.password,
    role:userRole,
    created_date:moment(),
    modified_date:moment(),
    is_delete:false

  }
  return await UserModel.create(newUser);
};

const LoginUser = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return false;
  }
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return false;
  }

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET
  );
  return {
    email,
    token,
    role: user.role,
  };
};

module.exports = {
  createUser,
  LoginUser,
};
