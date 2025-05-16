import { z } from "zod";
import { wordsSearchFunctions } from "../functions/words-search-functions";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authMiddleware } from "../middlewares/authTokenUser";

export const wordsSearchRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/wordsSearch",
    {
      preHandler: [authMiddleware],
      schema: {
        tags: ["wordsSearch"],
        description: "Words Search",
        querystring: z.object({
          userId: z.string(),
        }),
        response: {
          200: z.object({
            response: z.object({
              searches: z.array(z.any()),
              total: z.number(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = request.query.userId;

      const { searches, total } = await wordsSearchFunctions.getAllByUserId(
        userId
      );

      const response = {
        searches,
        total,
      };

      return reply.code(200).send({ response });
    }
  );
};
