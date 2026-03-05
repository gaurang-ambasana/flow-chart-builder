"use client";

import FlowCanvas from "@/components/FlowCanvas";
import JsonPreview from "@/components/JsonPreview";
import Sidebar from "@/components/Sidebar";
import { useFlowStore } from "@/store/useFlowStore";
import { Storage } from "@mui/icons-material";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import '@xyflow/react/dist/style.css';

export default function FlowBuilderPage() {
  const { addNode } = useFlowStore();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white text-black font-sans">
      <div className="w-20 border-r border-gray-200 flex flex-col items-center py-6 bg-gray-50 shadow-sm z-20 space-y-6">
        <div className="text-xs font-semibold text-gray-500 mb-2 tracking-wide uppercase">
          Shapes
        </div>

        <button
          onClick={() => addNode("rectangle")}
          className="w-12 h-12 bg-white text-gray-600 rounded-lg shadow-sm hover:text-blue-600 hover:border-blue-600 border border-gray-300 flex items-center justify-center transition-all hover:scale-105"
          title="Add Process (Rectangle)"
        >
          <CropSquareIcon fontSize="medium" />
        </button>

        <button
          onClick={() => addNode("diamond")}
          className="w-12 h-12 bg-white text-gray-600 rounded-lg shadow-sm hover:text-blue-600 hover:border-blue-600 border border-gray-300 flex items-center justify-center transition-all hover:scale-105 transform rotate-45 mt-4"
          title="Add Decision (Diamond)"
        >
          <CropSquareIcon fontSize="medium" />
        </button>

        <button
          onClick={() => addNode("oval")}
          className="w-12 h-12 bg-white text-gray-600 rounded-lg shadow-sm hover:text-blue-600 hover:border-blue-600 border border-gray-300 flex items-center justify-center transition-all hover:scale-105 mt-4"
          title="Add Terminator (Oval)"
        >
          <RadioButtonUncheckedIcon fontSize="medium" />
        </button>

        <button
          onClick={() => addNode("cylinder")}
          className="w-12 h-12 bg-white text-gray-600 rounded-lg shadow-sm hover:text-blue-600 border border-gray-300 flex items-center justify-center transition-all hover:scale-110"
          title="Add Data/Cylinder"
        >
          <Storage fontSize="medium" />
        </button>
      </div>

      <div className="flex-1 relative z-0 bg-gray-50">
        <FlowCanvas />
      </div>

      <Sidebar />
      <JsonPreview />
    </div>
  );
}
