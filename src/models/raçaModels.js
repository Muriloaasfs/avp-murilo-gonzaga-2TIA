//importar prisma client
import prisma from "../prisma/client.js";

export function criar({ nome, origem, personalidade, raça, tempo_de_vida,}) {
  return prisma.raça.create({
    data: {
      nome,
      origem,
      personalidade,
      raça,
      tempo_de_vida,
    },
  });
}


export function listarTudo() {
    return prisma.raça.findMany({
        orderBy: {
            id:"asc"
        }
    });
}

export function buscarPorId(id) {
    return prisma.raça.findUnique({
        where: {
            id: Number(id)
        }
    });
}

export function atualizar(id, { nome, origem, personalidade, raça, tempo_de_vida }) {
    return prisma.raça.update({
        where: {
            id: Number(id)
        },
        data: {
            nome,
            origem,
            personalidade,
            raça,
            tempo_de_vida
        }
    });
}

export function deletar(id) {
    return prisma.raça.delete({
        where: {
            id: Number(id)
        }
    });
}
