"use server";
import { Question, QuestionType, status } from "@prisma/client";
import { prisma } from "./client-config";

type VocabularyType = {
  id: number;
  word: string;
  meaning: string;
  synonyms: Array<{ value: string; status?: status }>;
  similarwords?: unknown[];
  status?: status;
  favarable: boolean;
};

// export const createAllVocab = async () => {
//   try {
//     const data = convertToFormData(Data);
//     console.log("Data", data);
//     const newData = await prisma.vocabulary.createMany({
//       data: data,
//     });
//     if (newData.count > 0) {
//       return {
//         status: 200,
//         message: "Vocab created successfully",
//         data: newData,
//       };
//     }
//     return {
//       status: 400,
//       message: "Vocab not created",
//     };
//   } catch (error) {
//     return {
//       status: 500,
//       message: "Error creating vocab",
//       error: error,
//     };
//   }
// };

export const getVocab = async (page: number, perPage: number) => {
  try {
    const [items, total] = await Promise.all([
      await prisma.vocabulary.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.vocabulary.count(),
    ]);

    return {
      status: 200,
      message: "Vocab fetched successfully",
      data: { items, total },
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error fetching vocab",
      error: error,
    };
  }
};

export const getVocabByID = async (id: number) => {
  try {
    const vocab = await prisma.vocabulary.findUnique({
      where: {
        id: id,
      },
    });
    return {
      status: 200,
      message: "Vocab fetched successfully",
      data: vocab,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error fetching vocab",
      error: error,
    };
  }
};

export const getVocabByIDs = async (ids: number[]) => {
  const newIds = ids.map((id) => parseInt(id.toString()) - 1);
  try {
    const vocab = await prisma.vocabulary.findMany({
      where: {
        id: {
          in: newIds,
        },
      },
    });
    return {
      status: 200,
      message: "Vocab fetched successfully",
      data: vocab,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error fetching vocab",
      error: error,
    };
  }
};

export const updateVocabStatusByID = async (
  id: number | undefined,
  val: boolean
) => {
  try {
    const result = await prisma.vocabulary.update({
      where: {
        id: id,
      },
      data: {
        status: val ? status.KNOWN : status.UNKNOWN,
      },
    });

    if (result) {
      return {
        status: 200,
        message: "update successful",
        data: { status: result.status },
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: "Error fetching vocab",
      error: error,
    };
  }
};

export const updateVocabSynonymStateByIDIndex = async (
  id: number,
  index: number,
  val: boolean
) => {
  try {
    const result = await prisma.vocabulary.findUnique({
      where: {
        id: id,
      },
    });

    if (result) {
      let copyArr = result?.synonyms as Array<{ status: string }> | null;
      if (copyArr) {
        copyArr[index] = {
          ...copyArr[index],
          status: val ? status.KNOWN : status.UNKNOWN,
        };
      } else {
        throw new Error("Synonyms array is null");
      }

      const updateData = await prisma.vocabulary.update({
        where: { id },
        data: {
          synonyms: copyArr,
        },
      });

      return {
        status: 200,
        message: "Update successfully",
        data: {
          status:
            (updateData?.synonyms as Array<{ status: string }> | null)?.[index]
              ?.status || null,
        },
      };
    }

    return {
      status: 400,
      message: "Update failed",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error fetching vocab",
      error: error,
    };
  }
};

export const updateVocabFavarableByID = async (id: number) => {
  try {
    const vocab = await prisma.vocabulary.findUnique({
      where: { id },
    });
    if (vocab) {
      const updateVocab = await prisma.vocabulary.update({
        where: {
          id,
        },
        data: {
          favarable: !vocab.favarable,
        },
      });

      if (updateVocab) {
        return {
          status: 200,
          message: "update successfully happen",
          data: { favarable: updateVocab.favarable },
        };
      }
    } else {
      return {
        status: 400,
        message: "Error happen",
      };
    }
  } catch (error) {
    return {
      status: 400,
      message: "Error happen",
      error,
    };
  }
};

export const getFavoriteVocab = async (page: number, perPage: number) => {
  try {
    const [result, total] = await Promise.all([
      await prisma.vocabulary.findMany({
        where: {
          favarable: true,
        },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.vocabulary.count({ where: { favarable: true } }),
    ]);

    if (result.length > 0) {
      return {
        status: 200,
        data: {
          vocabs: result,
          total,
        },
      };
    } else {
      return {
        status: 300,
        message: "No data found",
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: "Error happen",
      error,
    };
  }
};

// search
export const searchVocab = async (search: string) => {
  try {
    const AllResults = await prisma.vocabulary.findMany();

    const searchResult = AllResults.filter((item) => {
      const synonyms = (item.synonyms as Array<{ value: string }>) || [];
      console.log(
        synonyms.some((syn) =>
          syn?.value?.toLowerCase().includes(search.toLowerCase())
        )
      );
      if (
        item.word.toLowerCase().includes(search.toLowerCase()) ||
        synonyms.some((syn) =>
          syn?.value?.toLowerCase().includes(search.toLowerCase())
        )
      ) {
        return true;
      }
    });

    if (searchResult.length > 0) {
      return {
        status: 200,
        data: searchResult,
      };
    } else {
      return {
        status: 400,
        data: [],
      };
    }
  } catch (error) {}
};

// question
export const setQuestion = async (data: Question) => {
  try {
    const result = await prisma.question.create({
      data,
    });

    if (result) {
      return {
        status: 200,
        message: "Question created successfully",
        data: result,
      };
    }
    return {
      status: 400,
      message: "Question not created",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error happen",
      error,
    };
  }
};

export const getQuestion = async (
  page: number,
  perPage: number,
  type: QuestionType
) => {
  try {
    const [result, total] = await Promise.all([
      await prisma.question.findMany({
        where: {
          type,
        },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.question.count({ where: { type } }),
    ]);

    return {
      status: 200,
      data: {
        data: result,
        total,
      },
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error happen",
      error,
    };
  }
};
