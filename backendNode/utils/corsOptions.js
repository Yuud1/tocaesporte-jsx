const corsOptions = {
  origin: [
    "https://tocaesporte.com",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  // allowedHeaders: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
  // credentials: true,
};

module.exports = corsOptions;