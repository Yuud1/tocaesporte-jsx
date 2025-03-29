const express = require("express");
const getConnection = require("../utils/connection");
const User = require("../schemas/userSchema");
const router = express.Router();
const database = new getConnection();
const validator = require("validator");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    await database.connect();

    const users = await User.find({});

    return res.status(200).json({ message: "Usuarios encontrado", users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao conectar-se com servidor", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "É nescessário informar email ou senha" });
    }
    await database.connect();

    const userFound = await User.findOne({ email });

    const passwordIsRight = await bcrypt.compare(password, userFound.password);

    if (!passwordIsRight) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    return res
      .status(200)
      .json({ message: "funcionou sapoha", access: userFound.access });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao conectar-se com servidor", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { email, password, user, access } = req.body;

    if ((!email, !password, !user, !access)) {
      return res
        .status(400)
        .json({ message: "Campo Faltando", created: false });
    }

    await database.connect();

    const existingUser = await User.findOne({
      $or: [{ email }, { user }],
    });

    if (existingUser != null) {
      if (existingUser.user == user) {
        return res.status(400).send({
          message: "Nome de usuário já está em uso. Por favor, escolha outro.",
        });
      }
      if (existingUser.email == email) {
        return res.status(400).send({ message: "E-mail já está em uso." });
      }
    }

    const isValidEmail = validator.isEmail(email);

    if (!isValidEmail) {
      return res.status(400).send({
        message:
          "Email inválido, digite um tipo de email válido exemplo@gmail.com",
      });
    }

    // Criptografando a senha

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      access,
      email,
      password: hashedPassword,
      user,
    });

    // Salvando usuário no banco de dados
    await newUser.save();

    return res.status(200).json({
      message: "Usuário cadastrado com sucesso",
      created: true,
    });
  } catch (error) {
    console.log("Deu erro nessa porra:", error);
    return res
      .status(500)
      .json({ message: "Erro ao conectar-se com o servidor", created: false });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res
      .status(400)
      .json({ message: "É nescessário passar o id de exclusão" });
  }

  await database.connect();

  const userDeleted = await User.findOneAndDelete({ _id: id });

  return res.status(200).json({ message: "funcionou sapoha", userDeleted });
});

module.exports = router;
