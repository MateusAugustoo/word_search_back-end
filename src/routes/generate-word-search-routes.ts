import { z } from 'zod'
import { generateWordSearch } from '../functions/generate-words-search' 
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const generateWordSearchRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post('', {}, async (request, reply) => {})
}