import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isSimilarWordsArrayOfObj } from "@/utils/TsConfig";
import { Vocabulary } from "@prisma/client";
import { BookmarkMinus } from "lucide-react";
import ShowHorizontalItems from "../miniui/ShowHorizontalItems";

function isSimilarWordsArray(data: unknown): data is [] {
  return (
    Array.isArray(data) &&
    data.every((item) => typeof item === "string" && item !== null)
  );
}

const FavoriteCard = ({
  synonym,
  handelFavoriteList,
}: {
  synonym: Vocabulary;
  handelFavoriteList: (id: number) => void;
}) => {
  // Parse the example if it's a string
  const examples =
    synonym.example && isSimilarWordsArray(synonym.example)
      ? synonym.example
      : [];

  const synonyms =
    synonym?.synonyms && isSimilarWordsArrayOfObj(synonym.synonyms)
      ? synonym?.synonyms
      : [];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{synonym.word}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {<ShowHorizontalItems items={synonyms} />}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm font-medium">Definition:</p>
          <p className="text-sm text-muted-foreground">
            {String(synonym?.meaning)}
          </p>
          {examples.length > 0 && (
            <div className="space-y-2 overflow-y-auto max-h-[200px] scrollbar-hide">
              <p className="text-sm font-medium">Examples:</p>
              {examples.map((item: string, index: number) => (
                <p
                  key={index}
                  className="text-lg text-muted-foreground italic mb-2"
                >
                  "{item}"
                </p>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={() => handelFavoriteList(synonym.id)}
          variant="ghost"
          size="sm"
        >
          <BookmarkMinus className="h-4 w-4 mr-2" />
          Remove from Favorites
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FavoriteCard;
