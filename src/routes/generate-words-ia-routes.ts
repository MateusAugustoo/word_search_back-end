import { z } from "zod";
import { generateWords } from "../functions/generate-words-ia";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const generateWordsRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post('/generate/words-search-ia', {
    schema: {
      tags: ['generate-words'],
      description: `Generate words by search IA`,
      body: z.object({
        length: z.number(),
        theme: z.string(),
      })
    }
  }, async (request, reply) => {
    const { length, theme } = request.body
    
  });
}