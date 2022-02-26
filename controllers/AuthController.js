import { createUser, verifyByUsername } from "../services/UserService";

export const UserLogin = async (req, res) => {
  const user = await verifyByUsername(req.body);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(500).json(user);
  }
};

export const UserRegistration = async (req, res) => {
  const response = await createUser(req.body);
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(500).json(response);
  }
};
