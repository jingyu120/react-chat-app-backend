const bcrypt = require("bcrypt");
const UserModel = require("../models/User");

export const createUser = async (data) => {
  const user = await UserModel.findOne({ username: data.username });
  if (user) {
    return null;
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const newUser = await new UserModel({
      name: data.name,
      username: data.username,
      email: data.email,
      password: hashedPassword,
    }).save();
    return newUser;
  }
};

export const verifyByUsername = async (data) => {
  const { username, password } = data;
  const user = await UserModel.findOne({ username });
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  } else {
    return null;
  }
};

export const findUserByID = async (userID) => {
  try {
    const user = await UserModel.findById(userID);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const findUserByName = async (username) => {
  const users = await UserModel.find({
    name: { $regex: username, $options: "i" },
  });
  return users;
};

export const findUserByEmail = async (email) => {
  const users = await UserModel.find({
    email,
  });
  return users;
};

export const addFollowUserByID = async (body) => {
  const user = await UserModel.findById(body.userID);
  const reqUser = await UserModel.findById(body.reqID);
  const id = user._id.toString();
  if (!reqUser.following.includes(id)) {
    await reqUser.following.push(user._id.toString());
    await user.followers.push(reqUser._id.toString());
    await reqUser.save();
    await user.save();
  }

  return reqUser;
};
