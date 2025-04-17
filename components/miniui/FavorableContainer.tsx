import { updateVocabFavarableByID } from "@/server/server-action";
import { DynamicIcon } from "lucide-react/dynamic";
import { useEffect, useState } from "react";
import LoadingItem from "../basic/LoadingItem";

const FavorableContainer = ({
  size,
  id,
  favour,
}: {
  size: number;
  id: number;
  favour: boolean;
}) => {
  const [favorite, setFavorite] = useState<boolean | undefined>(favour);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFavorite(favour);
  }, [favour, id]);
  const handelOnChange = async () => {
    try {
      setLoading(true);
      const result = await updateVocabFavarableByID(id);
      if (result?.status === 200) {
        setFavorite(result?.data?.favarable);
      } else {
        throw Error("The error has happen.");
      }
    } catch (error) {
      throw Error("Error happen");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-end">
      {loading ? (
        <LoadingItem color="red" size={15} />
      ) : (
        <DynamicIcon
          className="cursor-pointer"
          onClick={handelOnChange}
          fill={`${favorite ? "red" : "white"}`}
          name="heart"
          color="red"
          size={size ? size : 15}
        />
      )}
    </div>
  );
};

export default FavorableContainer;
