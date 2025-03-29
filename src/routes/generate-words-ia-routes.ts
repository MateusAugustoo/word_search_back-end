import { z } from "zod";
import { generateWords } from "../functions/generate-words-ia";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const generateWordsIARoutes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/api/generate/words-search-ia",
    {
      schema: {
        tags: ["Generate-words"],
        description: `Generate words by search IA`,
        body: z.object({
          language: z.string(),
          length: z.number(),
          theme: z.string(),
        }),
        response: {
          200: z.object({
            message: z.string(),
            words: z.array(z.string()),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { length, theme, language } = request.body;

      const { words } = await generateWords({ length, theme, language });

      if (!words) {
        reply.code(400).send({
          message: "Error to generate words",
        });
        return;
      }

      const response = {
        message: "Words generated successfully",
        words,
      };

      reply.code(200).send(response);
    }
  );
};
