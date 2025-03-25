import { fastify } from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import { env } from "./env";
import { generateWordsRoutes } from "./routes/generate-words-ia-routes";

const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// Temporary when production will be changed..
app.register(fastifyCors, {
  origin: true,
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Word Search API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(generateWordsRoutes)

app
  .listen({ port: env.PORT })
  .then(() => {
    console.log(`Server running on port ${env.PORT}`);
  })
  .catch((error) => {
    console.error(error);
  });
