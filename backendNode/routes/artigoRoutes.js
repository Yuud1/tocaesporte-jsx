const express = require("express");
const getConnection = require("../utils/connection");
const Artigo = require("../schemas/artigoSchema");
const router = express.Router();
const database = new getConnection();

router.get("/", async (req, res) => {
  try {
    await database.connect();

    const artigos = await Artigo.find({}).sort({ insertAt: -1 });

    return res.status(200).json({ message: "Artigos encontrados", artigos });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao conectar-se com servidor", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    await database.connect();

    const id = req.params.id;

    const artigo = await Artigo.findOne({ _id: id });

    return res.status(200).json({ message: "Artigo encontrado", artigo });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao conectar-se com servidor", error });
  }
});

router.get("/category/:category", async (req, res) => {
  try {
    await database.connect();

    const category = req.params.category;

    const artigo = await Artigo.find({ category: category });

    return res.status(200).json({ message: "Artigo encontrado", artigo });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao conectar-se com servidor", error });
  }
});

router.get("/buscar/:term", async (req, res) => {
  try {
    await database.connect();

    const term = req.params.term;

    const artigo = await Artigo.find({ title: new RegExp(term, "i") });

    return res.status(200).json({ message: "Artigo encontrado", artigo });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao conectar-se com servidor", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      title,
      subtitle,
      actor,
      description,
      category,
      urlimage,
      imageSource,
    } = req.body;

    if (
      !title ||
      !subtitle ||
      !actor ||
      !description ||
      !category ||
      !urlimage ||
      !imageSource
    ) {
      return res.status(400).json({ message: "Campo faltando" });
    }

    await database.connect();

    const artigoToSave = new Artigo({
      actor,
      category,
      description,
      imageSource,
      subtitle,
      title,
      urlimage,
    });

    await artigoToSave.save();

    return res.status(200).json({ message: "Artigo salvo com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao conectar-se no servidor", error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {
      title,
      subtitle,
      actor,
      description,
      category,
      urlimage,
      imageSource,
    } = req.body;

    if (
      !title ||
      !subtitle ||
      !actor ||
      !description ||
      !category ||
      !urlimage ||
      !imageSource
    ) {
      return res.status(400).json({ message: "Campo faltando" });
    }

    if (!id) {
      return res
        .status(400)
        .json({ message: "É nescessário passar um id para edição" });
    }

    await database.connect();

    const artigoUpdated = await Artigo.findOneAndUpdate(
      { _id: id },
      {
        title,
        subtitle,
        actor,
        description,
        category,
        urlimage,
        imageSource,
      }
    );

    return res
      .status(200)
      .json({ message: "Post atualizado com sucesso", artigoUpdated });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao conectar-se com servidor", error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "É nescessário passar um id para deletar a publicação",
      });
    }

    await database.connect();

    const artigoToDelete = await Artigo.findOneAndDelete({ _id: id });

    if (!artigoToDelete) {
      return res.status(404).json({ message: "Artigo não encontrado" });
    }

    return res
      .status(200)
      .json({ message: "Post deletado com sucesso", deleted: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao conectar-se com o servidor", error });
  }
});

module.exports = router;
