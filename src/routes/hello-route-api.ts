import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const helloRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    "/hello",
    {
      schema: {
        tags: ["hello"],
        description: "Hello world",
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    (_, reply) => {
      reply.code(200).send({
        message: "Hello World",
      });
    }
  );
}