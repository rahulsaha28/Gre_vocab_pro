import { getVocabByIDs } from "@/server/server-action";
import { SynonymType } from "@/utils/TsConfig";
import { DynamicIcon } from "lucide-react/dynamic";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import LoadingItem from "./LoadingItem";

const PopupDialog = ({ item, word }: { item: number[]; word: string }) => {
  const [vocab, setVocab] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    if (item) {
      setLoading(true);
      const { data } = await getVocabByIDs(item);
      /* @ts-ignore */
      setVocab(data);
      setLoading(false);
      console.log(data);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={handleClick}>
          <DynamicIcon name="keyboard-music" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Similar Words: <span className="text-amber-600">{word}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 overflow-y-scroll max-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <LoadingItem color="red" size={30} />
            </div>
          ) : (
            vocab.map((item: any) => (
              <div
                key={item.id}
                className="flex flex-col items-center gap-2 border-2 py-2 rounded-md"
              >
                <div className="flex items-center gap-2 p-2 overflow-hidden">
                  <DynamicIcon name="circle-dot" color="gray" size={20} />
                  <span className="text-gray-700 dark:text-gray-200 text-lg font-semibold">
                    {item.word}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                    {item.meaning}
                  </span>
                </div>
                {item.synonyms && (
                  <div className="flex items-center gap-2">
                    <div className="flex flex-wrap gap-1 border-2 p-2 rounded-md">
                      {item.synonyms?.map(
                        (synonym: SynonymType, index: number) => (
                          <span
                            key={index}
                            className="text-gray-700 dark:text-gray-200 text-sm font-semibold"
                          >
                            {synonym["value"]} ;
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopupDialog;
