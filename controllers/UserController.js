import {
  findUserByID,
  findUserByName,
  findUserByEmail,
  addFollowUserByID,
} from "../services/UserService.js";

export const FindUser = async (req, res) => {
  const response = await findUserByID(req.params.userid);
  res.json(response);
};

export const SearchUsers = async (req, res) => {
  const username = req.query.username;
  const email = req.query.email;
  const users = username
    ? await findUserByName(username)
    : await findUserByEmail(email);
  res.json(users);
};

export const AddFriend = async (req, res) => {
  try {
    const user = await addFollowUserByID(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
