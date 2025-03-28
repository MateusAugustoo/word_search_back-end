import { env } from "./env";
import { fastify } from "fastify";
import fastifyCors from "@fastify/cors";
import { userRoutes } from "./routes/user.routes";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { generateWordsIARoutes } from "./routes/generate-words-ia-routes";
import { generateWordSearchRoutes } from "./routes/generate-word-search-routes";

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

app.register(userRoutes);
app.register(generateWordSearchRoutes);
app.register(generateWordsIARoutes);

app
  .listen({ port: env.PORT })
  .then(() => {
    console.log(`Server running on port ${env.PORT}`);
  })
  .catch((error) => {
    console.error(error);
  });
