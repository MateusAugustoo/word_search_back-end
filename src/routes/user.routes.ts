import { z } from "zod";
import { userFunctions } from "../functions/user-functions";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const userRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/api/user",
    {
      schema: {
        tags: ["User"],
        description: `Creating a new user... 
          the user registration will be via Firebase,
          but we will save some data in the SQL database,
          in order to maintain certain relationships,
          thus leaving the auth system only on the part of Firebase.`,
        body: z.object({
          id: z.string(),
          name: z.string(),
          username: z.string(),
        }),
        response: {
          201: z.object({
            id: z.string(),
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id, name, username } = request.body;

      const user = await userFunctions.create({
        id,
        name,
        username,
      });

      const response = {
        id: user.id,
        message: "User created successfully",
      };

      reply.code(201).send(response);
    }
  );
};
