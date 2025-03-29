import { eq } from "drizzle-orm";
import { db } from "../drizzle/client";
import { ulid } from "ulid";
import { wordSearches } from "../drizzle/schema/schema";

interface WordsSearchFunctionsProps {
  userId: string;
  title: string;
  words: string[];
  difficulty: string;
}

export const wordsSearchFunctions = {
  async register({
    userId,
    title,
    words,
    difficulty,
  }: WordsSearchFunctionsProps) {
    const id = ulid();

    await db.insert(wordSearches).values({
      id,
      user_id: userId,
      title,
      words,
      difficulty,
    });
  },

  async getAllByUserId(userId: string) {
    const searches = await db
      .select()
      .from(wordSearches)
      .where(eq(wordSearches.user_id, userId));

      return searches;
  },
};
