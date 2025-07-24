import jwt from "jsonwebtoken";

const default_user = {
  id: 1,
  email: "user@email.com",
  password: "strongPass1312",
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y password son requeridos" });
    }

    if (email === default_user.email && password === default_user.password) {
      const payload = { id: default_user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({ token });
    } else {
      return res.status(401).json({ message: "Email o password inválidos" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el login" });
  }
};
