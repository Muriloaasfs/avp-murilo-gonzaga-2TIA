import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Raças de Gatos",
      version: "1.0.0",
      description: "API escolar para consultar e cadastrar raças de gatos."
    },
    tags: [{ name: "Raças de Gatos", description: "Operações com raças de gatos" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "Token"
        }
      },
      schemas: {
        Raca: {
          type: "object",
          additionalProperties: false,
          required: ["id", "nome", "origem", "temperamento", "pelagem", "tamanho", "expectativaVidaAnos"],
          properties: {
            id: { type: "integer", example: 1 },
            nome: { type: "string", example: "Persa" },
            origem: { type: "string", example: "Irã" },
            temperamento: { type: "string", example: "Calmo e carinhoso" },
            pelagem: { type: "string", example: "Longa" },
            tamanho: { type: "string", example: "Médio" },
            expectativaVidaAnos: { type: "string", example: "12 a 17 anos" }
          }
        },
        NovaRaca: {
          type: "object",
          required: ["nome", "origem", "temperamento", "pelagem", "tamanho", "expectativaVidaAnos"],
          additionalProperties: false,
          properties: {
            nome: { type: "string", example: "Siamês" },
            origem: { type: "string", example: "Tailândia" },
            temperamento: { type: "string", example: "Sociável e ativo" },
            pelagem: { type: "string", example: "Curta" },
            tamanho: { type: "string", example: "Médio" },
            expectativaVidaAnos: { type: "string", example: "15 a 20 anos" }
          }
        },
        AtualizacaoRaca: {
          type: "object",
          additionalProperties: false,
          properties: {
            nome: { type: "string", example: "Siamês" },
            origem: { type: "string", example: "Tailândia" },
            temperamento: { type: "string", example: "Muito carinhoso" },
            pelagem: { type: "string", example: "Curta" },
            tamanho: { type: "string", example: "Médio" },
            expectativaVidaAnos: { type: "string", example: "15 a 20 anos" }
          }
        }
      }
    }
  },
  apis: ["./routes/*.js"]
};

export default swaggerJSDoc(options);