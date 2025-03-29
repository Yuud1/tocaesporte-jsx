const express = require("express");
const getConnection = require("../utils/connection");
const Anuncio = require("../schemas/anuncioSchema.js");
const router = express.Router();
const database = new getConnection();

router.get("/topo/listar", async (req, res) => {
  try {
    await database.connect();

    const anuncios = await Anuncio.find({ placement: "main" })

    return res.status(200).json({ message: "anuncios encontrados", anuncios });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao conectar-se com servidor", error });
  }
});

router.get("/listar", async (req, res) => {
  try {
    await database.connect();

    const anuncios = await Anuncio.find({ placement: "sidebar" });    
    
    return res.status(200).json({ message: "anuncios encontrados", anuncios });
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

    const artigo = await Anuncio.findOne({ _id: id });

    return res.status(200).json({ message: "Artigo encontrado", artigo });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao conectar-se com servidor", error });
  }
});

router.post("/topo/criar", async (req, res) => {
  try {    
    const { title, subtitle, urlimage, enterprise, site, placement } = req.body;

    if ((!title || !subtitle || !urlimage || !enterprise || !placement, !site)) {
      return res.status(400).json({ message: "Campo faltando" });
    }

    await database.connect();

    const anuncioToSave = new Anuncio({
      title,
      subtitle,
      urlimage,
      enterprise,
      placement,
      site,
    });

    await anuncioToSave.save();

    return res.status(200).json({ message: "Anuncio salvo com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao conectar-se no servidor", error });
  }
});

router.post("/criar", async (req, res) => {
  try {
    const { urlimage, placement } = req.body;

    if (!urlimage || !placement) {
      return res.status(400).json({ message: "Campo faltando" });
    }

    await database.connect();

    const anuncioToSave = new Anuncio({      
      urlimage,
      placement,
    })

    await anuncioToSave.save();

    return res.status(200).json({ message: "Artigo salvo com sucesso" });
  } catch (error) {
    console.log(error)
    
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

    const artigoUpdated = await Anuncio.findOneAndUpdate(
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

    const artigoToDelete = await Anuncio.findOneAndDelete({ _id: id });

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
