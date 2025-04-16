import { updateVocabSynonymStateByIDIndex } from "@/server/server-action";
import React, { useCallback, useState } from "react";
import TextRepresent from "../textComponent/TextRepresent";

type SynonymStatus = "UNKNOWN" | "KNOWN" | undefined;

interface Synonym {
  value: string;
  status: SynonymStatus;
}

interface PropsType {
  synonym: Synonym;
  index: number;
  id: number;
}

export const EachVocabState: React.FC<PropsType> = React.memo(
  ({ synonym, index, id }) => {
    const [option, setOption] = useState<Synonym>(synonym);
    const [loading, setLoading] = useState(false);

    const handelchangeState = useCallback(
      async (val: boolean) => {
        try {
          setLoading(true);
          const result = await updateVocabSynonymStateByIDIndex(id, index, val);
          if (result?.status === 200 && result?.data?.status) {
            setOption((pre) => ({
              ...pre,
              status: result?.data?.status as SynonymStatus,
            }));
          }
        } catch (error) {
          throw Error("Something went wrong");
        } finally {
          setLoading(false);
        }
      },
      [id, index]
    );
    return (
      <div className="flex items-center gap-2">
        <TextRepresent
          handelChangeStatus={handelchangeState}
          synonym={option}
          loading={loading}
        />
      </div>
    );
  }
);
