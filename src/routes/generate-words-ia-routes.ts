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
          500: z.object({
            message: z.string(), 
          })
        },
      },
    },
    async (request, reply) => {
      const { length, theme, language } = request.body;

      if (length <= 0) {
        reply.code(400).send({
          message: "Length must be a positive number",
        });
        return;
      }

      if (length > 20) {
        reply.code(400).send({
          message: "Length cannot exceed 20 words",
        });
        return;
      }

      if (!theme || theme.trim() === "") {
        reply.code(400).send({
          message: "Theme cannot be empty",
        });
        return;
      }

      if (!language || language.trim() === "") {
        reply.code(400).send({
          message: "Language cannot be empty",
        });
        return;
      }

      try {
        const { words } = await generateWords({ length, theme, language });

        if (!words || words.length === 0) {
          reply.code(400).send({
            message: "Failed to generate words",
          });
          return;
        }

        const response = {
          message: "Words generated successfully",
          words,
        };

        reply.code(200).send(response);
      } catch (error) {
        console.error("Error generating words:", error);
        reply.code(500).send({
          message: "Internal server error while generating words",
        });
      }
    }
  );
};
