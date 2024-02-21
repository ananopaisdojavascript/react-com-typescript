import app from "./app.js";

const port = 3000;

app.listen(port, () => {
  try {
    logger.info(`Servidor funcionando na porta ${port}`)
  } catch (error) {
    logger.error(error)
  }
})