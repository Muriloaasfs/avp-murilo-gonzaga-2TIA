import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import racasRouter from "./routes/racas.js";
import swaggerSpec from "./swagger.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/racas", racasRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({ mensagem: "API de Raças de Gatos funcionando!" });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Documentação em http://localhost:${port}/api-docs`);
});
