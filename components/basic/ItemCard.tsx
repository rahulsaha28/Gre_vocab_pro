import useVocabStatus from "@/hooks/useVocabStatus";
import {
  hasSimilarWords,
  isNumberArray,
  isSimilarWordsArray,
  SynonymType,
  VocabType,
} from "@/utils/TsConfig";
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
  const {
    status: vocabStatus,
    loading,
    error,
    updateStatus,
  } = useVocabStatus(id, status);

  const newSimilarWords: number[] = isNumberArray(similarwords)
    ? similarwords
    : [];

  const newSynonyms: WordOption[] = isSimilarWordsArray(synonyms)
    ? synonyms
    : [];

  const option: SynonymType = { value: word, status: vocabStatus };

  return (
    <Card>
      <CardHeader>
        <FavorableContainer favour={favarable} id={id} size={15} />
        <CardTitle className="flex justify-between items-center">
          <TextRepresent
            handelChangeStatus={updateStatus}
            synonym={Object(option)}
            id={id}
            loading={loading}
          />
          {hasSimilarWords(newSimilarWords) && (
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
