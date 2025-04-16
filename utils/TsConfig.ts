// export interface VocabType {
//   id: number;
//   word: string;
//   meaning: string;
//   example?: string[];
//   synonyms?: object[] | null | undefined;
//   similarwords?: number[];
//   status?: "UNKNOWN" | "KNOWN";
//   rate?: number;
// }

import { JsonValue } from "@prisma/client/runtime/library";

export interface VocabType {
  id: number;
  word: string;
  meaning: JsonValue;
  example: JsonValue;
  synonyms: JsonValue;
  similarwords: JsonValue;
  status: string;
  rate: number;
  favarable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type SynonymType = {
  value: string;
  status: "UNKNOWN" | "KNOWN" | undefined;
};

export const isSimilarWordsArrayOfObj = (
  data: unknown
): data is SynonymType[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "value" in item &&
        typeof item.value === "string" &&
        "status" in item
    )
  );
};
