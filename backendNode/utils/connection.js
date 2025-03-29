const Mongoose = require("mongoose");
const name = "tocaesporte7";
const password = "tocaesporteltda";
const uri = `mongodb+srv://${name}:${password}@tocaesporte.ukhlaln.mongodb.net/?retryWrites=true&w=majority&appName=tocaesporte`;

// Realizando a conexão pro banco
class getConnection {
  async connect() {
    Mongoose.connect(uri);
    const connection = Mongoose.connection;
    connection.once("open", () => console.log("DB funcionando"));
    return connection;
  }

  async close() {
    Mongoose.connection.close();
  }
}

module.exports = getConnection;
