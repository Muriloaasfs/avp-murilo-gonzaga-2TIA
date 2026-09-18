import { Router } from "express";
import { autenticar } from "../middleware/auth.js";

const router = Router();
const campos = ["nome", "origem", "temperamento", "pelagem", "tamanho", "expectativaVidaAnos"];
const racas = [];

function validarDados(dados, parcial = false) {
  if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
    return "Envie um objeto JSON com os dados da raça";
  }
  const chavesInvalidas = Object.keys(dados).filter((campo) => !campos.includes(campo));
  if (chavesInvalidas.length || (!parcial && campos.some((campo) => typeof dados[campo] !== "string" || !dados[campo].trim()))) {
    return "Envie apenas os campos permitidos e preencha todos os campos como texto";
  }
  if (parcial && (!Object.keys(dados).length || Object.values(dados).some((valor) => typeof valor !== "string" || !valor.trim()))) {
    return "Envie pelo menos um campo válido preenchido como texto";
  }
  return null;
}

function encontrarRaca(id, res) {
  const raca = racas.find((item) => item.id === Number(id));
  if (!raca) {
    res.status(404).json({ message: "Raça não encontrada" });
    return null;
  }
  return raca;
}

/**
 * @swagger
 * /racas:
 *   get:
 *     tags: [Raças de Gatos]
 *     summary: Lista todas as raças
 *     description: Retorna a lista de raças cadastradas.
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Raca' }
 */
router.get("/", (req, res) => res.json(racas));

/**
 * @swagger
 * /racas/{id}:
 *   get:
 *     tags: [Raças de Gatos]
 *     summary: Busca uma raça pelo ID
 *     description: Retorna uma raça cadastrada usando seu ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Raça encontrada.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Raca' }
 *       404:
 *         description: Raça não encontrada.
 *         content:
 *           application/json:
 *             example: { message: "Raça não encontrada" }
 */
router.get("/:id", (req, res) => {
  const raca = encontrarRaca(req.params.id, res);
  if (raca) res.json(raca);
});

/**
 * @swagger
 * /racas:
 *   post:
 *     tags: [Raças de Gatos]
 *     summary: Cadastra uma raça
 *     description: Cria uma nova raça usando os dados enviados.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/NovaRaca' }
 *           example: { nome: "Siamês", origem: "Tailândia", temperamento: "Sociável e ativo", pelagem: "Curta", tamanho: "Médio", expectativaVidaAnos: "15 a 20 anos" }
 *     responses:
 *       201:
 *         description: Raça cadastrada.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Raca' }
 *       400:
 *         description: Dados inválidos.
 *         content:
 *           application/json:
 *             example: { message: "Envie apenas os campos permitidos e preencha todos os campos como texto" }
 *       401:
 *         description: Token ausente ou inválido.
 */
router.post("/", autenticar, (req, res) => {
  const erro = validarDados(req.body);
  if (erro) return res.status(400).json({ message: erro });
  const novaRaca = { id: racas.length ? Math.max(...racas.map((raca) => raca.id)) + 1 : 1, ...req.body };
  racas.push(novaRaca);
  res.status(201).json(novaRaca);
});

/**
 * @swagger
 * /racas/{id}:
 *   patch:
 *     tags: [Raças de Gatos]
 *     summary: Atualiza uma raça
 *     description: Altera um ou mais dados da raça.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/AtualizacaoRaca' }
 *           example: { temperamento: "Muito carinhoso" }
 *     responses:
 *       200:
 *         description: Raça atualizada.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Raca' }
 *             example: { id: 1, nome: "Siamês", origem: "Tailândia", temperamento: "Muito carinhoso", pelagem: "Curta", tamanho: "Médio", expectativaVidaAnos: "15 a 20 anos" }
 *       400:
 *         description: Dados inválidos.
 *         content:
 *           application/json:
 *             example: { message: "Envie pelo menos um campo válido preenchido como texto" }
 *       401:
 *         description: Token ausente ou inválido.
 *       404:
 *         description: Raça não encontrada.
 */
router.patch("/:id", autenticar, (req, res) => {
  const raca = encontrarRaca(req.params.id, res);
  if (!raca) return;
  const erro = validarDados(req.body, true);
  if (erro) return res.status(400).json({ message: erro });
  Object.assign(raca, req.body);
  res.json(raca);
});

/**
 * @swagger
 * /racas/{id}:
 *   delete:
 *     tags: [Raças de Gatos]
 *     summary: Exclui uma raça
 *     description: Remove uma raça usando seu ID.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Raça excluída.
 *         content:
 *           application/json:
 *             example: { message: "Raça excluída com sucesso" }
 *       401:
 *         description: Token ausente ou inválido.
 *       404:
 *         description: Raça não encontrada.
 */
router.delete("/:id", autenticar, (req, res) => {
  const indice = racas.findIndex((raca) => raca.id === Number(req.params.id));
  if (indice === -1) return res.status(404).json({ message: "Raça não encontrada" });
  racas.splice(indice, 1);
  res.json({ message: "Raça excluída com sucesso" });
});

export default router;