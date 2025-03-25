import axios from "axios";
import { env } from "../env";

interface generateWordsProps {
  language: string;
  length: number;
  theme: string;
}

export const generateWords = async ({
  length,
  theme,
  language,
}: generateWordsProps) => {
  const { data } = await axios.post(env.API_URL_LLAMA, {
    prompt: `Liste ${length} palavras relacionadas a ${theme},
      separadas por virgula e as palavras devem ser em ${language}. Nada mais.`,
    model: "llama3:latest",
    stream: false,
  });

  const words = data.response.split(",");

  return {
    words,
  };
};
