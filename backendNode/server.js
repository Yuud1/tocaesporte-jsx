const http = require("http");
const app = require("./app.js");
const server = http.createServer(app);

const PORT = process.env.PORT || 4040;
server.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});