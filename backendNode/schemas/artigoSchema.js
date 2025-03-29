const mongoose = require("mongoose");

const artigoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  actor: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  urlimage: {
    type: String,
    required: true,
  },
  imageSource: {
    type: String,
    required: true,
  },
  insertAt: {
    type: Date,
    default: () => new Date(),
  },
});

const Artigo = mongoose.model("Artigo", artigoSchema);

module.exports = Artigo;
