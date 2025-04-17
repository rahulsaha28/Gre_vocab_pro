import { updateVocabStatusByID } from "@/server/server-action";
import {
  isNumberArray,
  isSimilarWordsArray,
  VocabType,
} from "@/utils/TsConfig";
import { useCallback, useEffect, useState } from "react";
import FavorableContainer from "../miniui/FavorableContainer";
import TextRepresent from "../textComponent/TextRepresent";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { EachVocabState } from "./EachVocabState";
import PopupDialog from "./PopupDialog";

type WordStatus = "UNKNOWN" | "KNOWN" | undefined;

interface WordOption {
  value: string;
  status: WordStatus | string;
}

const ItemCard: React.FC<VocabType> = ({
  id,
  word,
  meaning,
  synonyms = [],
  similarwords,
  status,
  favarable,
}) => {
  const [option, setOption] = useState<WordOption>({ value: word, status });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOption({ value: word, status: status });
  }, [word, status, favarable]);

  const handelChangeStatus = useCallback(
    async (val: boolean) => {
      try {
        setLoading(true);
        const result = await updateVocabStatusByID(id, val);
        if (result?.status === 200) {
          setOption((pre) => ({ ...pre, status: result?.data?.status }));
        } else {
          throw Error("Some error happen");
        }
      } catch (error) {
        throw Error("Some error happen");
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  const hasSimilarWords =
    Array.isArray(similarwords) && similarwords.length > 0;

  const newSimilarWords: number[] = isNumberArray(similarwords)
    ? similarwords
    : [];

  const newSynonyms: WordOption[] = isSimilarWordsArray(synonyms)
    ? synonyms
    : [];

  return (
    <Card>
      <CardHeader>
        <FavorableContainer favour={favarable} id={id} size={15} />
        <CardTitle className="flex justify-between items-center">
          <TextRepresent
            handelChangeStatus={handelChangeStatus}
            synonym={Object(option)}
            id={id}
            loading={loading}
          />
          {hasSimilarWords && (
            <PopupDialog item={newSimilarWords} word={word} />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-muted-foreground">
          {String(meaning)}
        </div>
        {newSynonyms?.length > 0 &&
          newSynonyms?.map((synonym, index) => (
            <EachVocabState
              key={index}
              synonym={Object(synonym)}
              index={index}
              id={id}
            />
          ))}
      </CardContent>
    </Card>
  );
};

export default ItemCard;
