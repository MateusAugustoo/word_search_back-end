import { auth } from "../firebase";
import { type FastifyRequest, type FastifyReply } from "fastify";

export const authMiddleware = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    reply.code(401).send({ message: 'Token not provided' })
    return
  }

  try {
    const decodedToken = await auth.verifyIdToken(token)
    req.user = decodedToken
  } catch (error) {
    reply.code(401).send({ message: 'Invalid Token' })
  }
};
