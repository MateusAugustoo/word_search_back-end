import { z } from "zod";
import { generateWordSearch } from "../functions/generate-words-search";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const generateWordSearchRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/api/generate-word-search",
    {
      schema: {
        tags: ["Generate-words"],
        description: `This route is called to generate word searches, 
        where the request must pass the following data,
        the list of words, size of the search and the difficulty`,
        body: z.object({
          words: z.array(z.string()),
          size: z.number(),
          difficulty: z.enum(["easy", "medium", "difficult"]),
        }),
        response: {
          200: z.object({
            grid: z.array(z.array(z.string())),
            words: z.array(z.string()),
          }),
          400: z.object({
            error: z.string(),
          }),
          500: z.object({
            error: z.string(), 
          })
        },
      },
    },
    async (request, reply) => {
      const { words, size, difficulty } = request.body;

      if (words.length === 0) {
        reply.code(400).send({ error: "The list of submitted words is empty" });
        return;
      }

      if (size < 5) {
        reply.code(400).send({ error: "Grid size must be at last 5x5" });
        return;
      }

      if (size > 30) {
        reply.code(400).send({ error: "Grid size cannot exceed 30x30" });
        return;
      }

      const longestWord = Math.max(...words.map((word) => word.length));
      if (longestWord > size) {
        reply.code(400).send({
          error: `The longest word (${longestWord} characters) 
            exceeds the grid size (${size}x${size})`,
        });
        return;
      }

      const validCharRegex = /^[A-Za-z]+$/;
      const invalidWords = words.filter((word) => !validCharRegex.test(word));
      if (invalidWords.length > 0) {
        reply.code(400).send({
          error: `The word list contains invalid characters: 
          ${invalidWords.join(", ")}`,
        });
        return;
      }

      try {
        const wordSearch = generateWordSearch(words, size, difficulty);

        return {
          grid: wordSearch,
          words,
        };
      } catch (error) {
        reply.code(500).send({
          error: "Failed to generate word search",
        });
        return;
      }
    }
  );
};
