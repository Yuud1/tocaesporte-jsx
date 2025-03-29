const express = require("express");
const cors = require("cors");
const corsOptions = require("./utils/corsOptions.js");

// Rotas
const userRoutes = require("./routes/userRoutes.js");
const artigoRoutes = require("./routes/artigoRoutes.js");
const adsRoutes = require("./routes/adsRoutes.js");

const app = express();

app.use(cors(corsOptions));

// Define o limite de tamanho do corpo da requisição
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));

app.use("/user", userRoutes);
app.use("/artigo", artigoRoutes);
app.use("/propaganda", adsRoutes);


module.exports = app;