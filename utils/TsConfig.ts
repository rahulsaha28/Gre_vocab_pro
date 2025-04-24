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

export interface SynonymType {
  value: string;
  status: "UNKNOWN" | "KNOWN" | undefined | string;
}

/**
 * Type guard to check if the data is an array of SynonymType objects
 * @param data - The data to check
 * @returns true if data is an array of SynonymType objects, false otherwise
 */

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

/**
 * Type guard to check if the data is an array of SynonymType objects
 * @param data - The data to check
 * @returns true if data is an array of SynonymType objects, false otherwise
 */
export const isNumberArray = (data: unknown): data is number[] =>
  Array.isArray(data) && data.every((item) => typeof item === "number");

export const isSimilarWordsArray = (data: unknown): data is SynonymType[] =>
  Array.isArray(data) &&
  data.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      "value" in item &&
      typeof item.value === "string" &&
      "status" in item
  );

export interface useStatusVocabReturnType {
  status: SynonymType["status"];
  loading: boolean;
  error: string | null;
  updateStatus: (val: boolean) => Promise<void>;
}

export const hasSimilarWords = (similarWords: number[]) =>
  Array.isArray(similarWords) && similarWords.length > 0;

export interface PaginationType {
  visiblePages: number[];
  isFirstPage: boolean;
  isLastPage: boolean;
  goToNextPage: () => number;
  goToPreviousPage: () => number;
  goToPage: (page: number) => number;
}

export interface PaginationStateType {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export interface QuestionType {
  question: string;
  answer: string;
  solution: string | null;
  type: QuestionTypeOf;
}

type QuestionTypeOf = "Math" | "English" | "Bangla" | "GeneralKnowledge";
