import { createToken } from "../../lib";
import { User } from "../../models";
import { findOrCreateAuth } from "../auth";

export const findOrCreateUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const user = await User.create({
      fullname,
      email,
    });
    if (!user) {
      return res.status(500).send({ error: "Error while creating the user" });
    }
    const userId = user.get("id");
    const { auth, authId } = await findOrCreateAuth({
      email,
      password,
      userId,
    });
    if (auth) {
      const token = createToken(authId);
      res.send({ token, authId, userId });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.send(users);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// auth middleware
export const getMe = async (req, res, token) => {
  try {
    const { userId } = req.body;
    const me = await User.findByPk(userId);
    return res.send(me);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
