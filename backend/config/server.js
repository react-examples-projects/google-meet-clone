const { SERVER } = require("./variables");
const { message } = require("../helpers/utils");
const wrapServerErrors = require("../middlewares/errorsHandling");

async function startServer(app, routers) {
  try {
    console.clear();
    app.use("/api", routers);
    app.use((req, res, next) => {
      res.status(404).json({ status: 404, body: "Not Found" });
      next();
    });
    wrapServerErrors(app);

    const server = app.listen(SERVER.PORT, async () => {
      message.success(`Server has started in http://localhost:${SERVER.PORT}/`);
    });
  } catch (err) {
    message.error("Error Ocurred while starting the server", err);
  }
}

module.exports = startServer;
