import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { FlowNodeData } from "@/store/useFlowStore";
import { cn } from "@/lib/utils";

const CustomShapeNode = ({ data, selected }: NodeProps<FlowNodeData>) => {
  const shapeBase =
    "flex items-center justify-center transition-all duration-200 shadow-sm";

  const borderClasses = selected
    ? "border-2 border-primary ring-4 ring-primary/10"
    : "border border-slate-300";

  const colorClasses = cn(
    "bg-white text-slate-900",
    data.isStart && "bg-green-50 border-green-500 text-green-900",
    data.isEnd && "bg-red-50 border-red-500 text-red-900",
  );

  return (
    <div className="relative group">
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-slate-400 border-none hover:!bg-primary"
      />
      <div
        className={cn(
          shapeBase,
          borderClasses,
          colorClasses,
          data.shape === "diamond" && "w-24 h-24 rotate-45",
          data.shape === "oval" && "w-32 h-16 rounded-full",
          data.shape === "cylinder" && "w-28 h-20 rounded-[20% / 10%]",
          data.shape === "rectangle" && "w-32 h-16 rounded-md",
          !data.shape && "w-32 h-16 rounded-md", // Fallback
        )}
      >
        <div
          className={cn(
            "text-xs font-bold px-2 text-center select-none",
            data.shape === "diamond" && "-rotate-45",
          )}
        >
          {data.label}
          {data.isStart && (
            <span className="block text-[8px] bg-green-500 text-white mt-1 px-1 rounded uppercase tracking-tighter">
              Start
            </span>
          )}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-slate-400 border-none hover:!bg-primary"
      />
    </div>
  );
};

export default memo(CustomShapeNode);