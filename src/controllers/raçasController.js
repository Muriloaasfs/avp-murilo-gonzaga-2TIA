import * as raçaModels from "../models/raçaModels.js";

export async function criarRaça(req, res) {
  try {
    const raça = await raçaModels.criar(req.body);
    res.status(201).json(raça);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function listarRaças(req, res) {
  try {
    const raças = await raçaModels.listarTudo();
    res.json(raças);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
