"use client";

import { useFlowStore } from "@/store/useFlowStore";
import { useCallback, useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { Download } from "@mui/icons-material";

export default function JsonPreview() {
  const { nodes, edges, startNodeId, importFlow } = useFlowStore();

  const [jsonText, setJsonText] = useState("");
  const [parseError, setParseError] = useState<string | null>(null);

  useEffect(() => {
    const formattedNodes = nodes.map((node) => {
      const nodeEdges = edges
        .filter((e) => e.source === node.id)
        .map((e) => ({
          to_node_id: e.target,
          condition: e.data?.condition || "",
        }));

      return {
        id: node.id,
        label: node.data.label,
        description: node.data.description,
        shape: node.data.shape,
        isStart: node.id === startNodeId ? true : undefined,
        isEnd: node.data.isEnd ?? undefined,
        edges: nodeEdges,
      };
    });

    setJsonText(JSON.stringify(formattedNodes, null, 2));
    setParseError(null);
  }, [nodes, edges, startNodeId]);

  const handleApplyJson = useCallback(() => {
    const success = importFlow(jsonText);
    if (!success) {
      setParseError(
        "Invalid JSON structure. Please check for missing commas or brackets.",
      );
    } else {
      setParseError(null);
    }
  }, []);

  const onDownloadJson = useCallback(() => {
    const blob = new Blob([jsonText], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "flowchart.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [jsonText]);

  const missingDescriptions = nodes.filter((n) => !n.data.description).length;
  const hasStartNode = !!startNodeId && nodes.some((n) => n.id === startNodeId);
  const disconnectedNodes = nodes.filter(
    (n) =>
      !edges.some((e) => e.source === n.id || e.target === n.id) &&
      nodes.length > 1,
  ).length;

  return (
    <div className="w-96 border-l border-border flex flex-col bg-slate-50 h-full shadow-sm z-10">
      <div className="p-4 border-b bg-white flex justify-between items-center">
        <div>
          <h2 className="text-sm font-bold tracking-tight uppercase text-foreground">
            Live Schema
          </h2>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Edit JSON to update canvas
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigator.clipboard.writeText(jsonText)}
            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Copy JSON"
          >
            <ContentCopyIcon fontSize="small" />
          </button>
          <button
            onClick={handleApplyJson}
            className="p-1.5 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
            title="Apply Changes to Canvas"
          >
            <SaveAsIcon fontSize="small" />
          </button>
          <button
            onClick={onDownloadJson}
            className="p-1.5 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
            title="Download JSON"
          >
            <Download fontSize="small" />
          </button>
        </div>
      </div>

      <div className="p-4 border-b bg-white">
        <h3 className="text-[11px] font-bold text-muted-foreground uppercase mb-2">
          Checks
        </h3>
        <div className="space-y-1 text-xs font-medium">
          {!hasStartNode && (
            <div className="text-red-500">❌ Error: Missing Start Node</div>
          )}
          {missingDescriptions > 0 && (
            <div className="text-red-500">
              ❌ Error: {missingDescriptions} node(s) missing descriptions
            </div>
          )}
          {disconnectedNodes > 0 && (
            <div className="text-amber-500">
              ⚠️ Warning: {disconnectedNodes} disconnected node(s)
            </div>
          )}
          {parseError && (
            <div className="text-red-600 font-bold mt-2 bg-red-50 p-2 rounded border border-red-200">
              🚨 {parseError}
            </div>
          )}

          {hasStartNode && missingDescriptions === 0 && !parseError && (
            <div className="text-green-600 bg-green-50 p-1.5 rounded border border-green-100">
              ✅ All required checks passed
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 relative bg-[#1e1e1e] p-4 overflow-hidden">
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          spellCheck={false}
          className="w-full h-full bg-transparent text-[#d4d4d4] font-mono text-xs resize-none outline-none leading-relaxed"
        />
      </div>

      <div className="p-3 bg-[#1e1e1e] border-t border-slate-700">
        <button
          onClick={handleApplyJson}
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded uppercase tracking-wider transition-colors"
        >
          Update Flow from JSON
        </button>
      </div>
    </div>
  );
}
