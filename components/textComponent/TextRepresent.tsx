"uae client";
import LoadingItem from "../basic/LoadingItem";
import { Checkbox } from "../ui/checkbox";

type propsType = {
  synonym: { value: string; status: "UNKNOWN" | "KNOWN" | undefined };
  id?: number | undefined;
  index?: number | undefined;
  handelChangeStatus: (val: boolean) => void;
  loading?: boolean;
};
const TextRepresent = ({
  handelChangeStatus,
  synonym,
  id,
  index,
  loading,
}: propsType) => {
  return (
    <div className="flex items-center gap-2">
      {id && <span className="text-start text-chart-1">{id}. </span>}
      {loading ? (
        <LoadingItem color="red" size={20} />
      ) : (
        <Checkbox
          className="checked:border-blue-500! checked:bg-blue-500"
          checked={synonym["status"] === "UNKNOWN" ? false : true}
          onCheckedChange={(e: boolean) => {
            handelChangeStatus(e);
          }}
        />
      )}
      <label
        className={`text-gray-700 dark:text-gray-200 text-lg font-semibold ${
          synonym["status"] === "KNOWN"
            ? "line-through decoration-orange-500 decoration-2"
            : ""
        }`}
      >
        {synonym["value"]}
      </label>
    </div>
  );
};

export default TextRepresent;
