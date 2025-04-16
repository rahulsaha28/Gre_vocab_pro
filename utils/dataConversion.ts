import { status } from "@prisma/client";
import { VocabType } from "./TsConfig";

export const convertToFormData = (data: any): VocabType[] => {
  const newData = data.map((item: any) => ({
    word: item["Word"],
    meaning: item["Meaning"],
    example: item["Sentence"]?.split(";"),
    synonyms: item["Synonym"]?.split(";")?.map((e: any) => ({
      value: e.trim(),
      status: status.UNKNOWN,
    })),
    similarwords:
      typeof item["similarWord"] === "number"
        ? [item["similarWord"]]
        : item["similarWord"]?.split(";")?.map((e: string) => parseInt(e)),
    rate: item["rate"],
  }));
  return newData;
};
