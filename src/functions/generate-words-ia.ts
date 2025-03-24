import axios from "axios";
import { env } from '../env'

interface generateWordsProps {
  length: string;
  theme: string
}

export const generateWords = async ({ length, theme }: generateWordsProps) => {
  const { response } = await axios.post(env.URL_API_LLAMA, {
    prompt: `Liste ${length} palavras relacionadas a ${theme}, separadas por virgula. Nada mais.`,
    model: 'llama3:latest',
    stream: false
  })

  const words = response.split(',')

  return {
    words
  }
}