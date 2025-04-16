import { SynonymType } from "@/utils/TsConfig";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const ShowHorizontalItems = ({ items }: { items: SynonymType[] | [] }) => {
  const [showItems, setShowItems] = useState(false);
  if (items?.length > 0) {
    return (
      <div className=" flex flex-row space-x-2 py-2 px-4">
        <Button
          className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
          onClick={() => setShowItems(!showItems)}
        >
          {showItems ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
        <div className="flex flex-row overflow-x-scroll scrollbar-hide w-[200px] space-x-2">
          {showItems &&
            items.map((item, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 bg-gray-100 rounded-lg text-gray-700"
              >
                {item?.value}
              </span>
            ))}
        </div>
      </div>
    );
  }
};

export default ShowHorizontalItems;
