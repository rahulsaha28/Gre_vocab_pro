import { updateVocabStatusByID } from "@/server/server-action";
import { SynonymType, useStatusVocabReturnType } from "@/utils/TsConfig";
import { useCallback, useState } from "react";

const useVocabStatus = (
  id: number,
  initialStatus?: SynonymType["status"]
): useStatusVocabReturnType => {
  const [status, setStatus] = useState<SynonymType["status"]>(
    initialStatus || "UNKNOWN"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = useCallback(
    async (val: boolean) => {
      try {
        setLoading(true);
        setError(null);
        const result = await updateVocabStatusByID(id, val);
        if (result?.status === 200) {
          setStatus(result.data?.status);
        } else {
          throw Error("Failed to update status");
        }
      } catch (error) {
        throw Error("Failed to update status");
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  return {
    status,
    loading,
    error,
    updateStatus,
  };
};

export default useVocabStatus;
