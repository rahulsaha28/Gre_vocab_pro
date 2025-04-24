import { convertMathToHTML } from "@/utils/convertion";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import "@/app/math.css";

const PopupSolution = ({ solution }: { solution: string | null }) => {
  const result = convertMathToHTML(solution || "");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Solution</DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto">
          {solution && <div dangerouslySetInnerHTML={{ __html: result }} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopupSolution;
