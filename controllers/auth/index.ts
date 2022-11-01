import { createToken, getSHA256ofString } from "../../lib";
import { Auth } from "../../models/Auth";

export const findOrCreateAuth = async (data) => {
  const { email, password, userId } = data;
  try {
    const hashedPass = getSHA256ofString(password);
    const auth = await Auth.create({
      email,
      password: hashedPass,
      userId,
    });
    return { auth, authId: auth.get("id") };
  } catch (error) {
    return { error: error.message };
  }
};

export const checkPassword = async (req, res) => {
  const { password, email } = req.body;
  try {
    const result = await Auth.findOne({
      where: {
        password: getSHA256ofString(password),
        email,
      },
    });
    if (!result) {
      return res.status(404).send("Contraseña incorrecta");
    } else {
      const authId = result.get("id");
      const token = createToken(authId);
      return res.send({ token });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
