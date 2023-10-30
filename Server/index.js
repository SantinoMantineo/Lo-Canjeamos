const server = require("./serverConfig");
const { conn } = require("./src/DB_config");

const PORT = process.env.PORT || 3001;

conn
  .sync({ force: true })
  .then(async () => {
    server.listen(PORT, async () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
