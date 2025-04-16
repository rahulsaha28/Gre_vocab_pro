import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface SearchResult {
  word: string;
  meaning: any;
  synonyms: any;
  similarwords: any;
}

export async function searchVocabulary(
  query: string,
  searchType: "word" | "meaning" | "synonyms" = "word"
): Promise<SearchResult[]> {
  try {
    let whereClause = {};

    switch (searchType) {
      case "word":
        whereClause = {
          word: {
            contains: query,
            mode: "insensitive",
          },
        };
        break;
      case "meaning":
        whereClause = {
          meaning: {
            string_contains: query,
            mode: "insensitive",
          },
        };
        break;
      case "synonyms":
        whereClause = {
          synonyms: {
            string_contains: query,
            mode: "insensitive",
          },
        };
        break;
    }

    const results = await prisma.vocabulary.findMany({
      where: whereClause,
      select: {
        word: true,
        meaning: true,
        synonyms: true,
        similarwords: true,
      },
    });

    return results;
  } catch (error) {
    console.error("Error searching vocabulary:", error);
    throw error;
  }
}
