import { DynamicIcon } from "lucide-react/dynamic";
const LoadingItem = ({ color, size }: { color: string; size: number }) => {
  return (
    <span className="animate-spin transition-all flex justify-center items-center">
      <DynamicIcon
        color={color ? color : "blue"}
        name="loader-circle"
        size={size ? size : 30}
      />
    </span>
  );
};

export default LoadingItem;
