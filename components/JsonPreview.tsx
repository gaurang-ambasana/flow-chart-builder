"use client";
import { useFlowStore } from "@/store/useFlowStore";
import { useMemo } from "react";

export default function JsonPreview() {
  const { nodes, edges, startNodeId } = useFlowStore();

  const schema = useMemo(() => {
    const formattedNodes = nodes.map((node) => {
      const nodeEdges = edges
        .filter((e) => e.source === node.id)
        .map((e) => ({
          to_node_id: e.target,
          condition: e.data?.condition,
        }));

      return {
        id: node.id,
        is_start: node.id === startNodeId,
        is_end: node.data.isEnd,
        description: node.data.description,
        edges: nodeEdges,
      };
    });

    return JSON.stringify(formattedNodes, null, 2);
  }, [nodes, edges, startNodeId]);

  const missingDescriptions = nodes.filter((n) => !n.data.description).length;
  const hasStartNode = !!startNodeId && nodes.some((n) => n.id === startNodeId);
  const disconnectedNodes = nodes.filter(
    (n) =>
      !edges.some((e) => e.source === n.id || e.target === n.id) &&
      nodes.length > 1,
  ).length;

  return (
    <div className="w-96 border-l border-gray-200 p-4 flex flex-col bg-gray-50 h-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
        Schema Output
      </h2>

      <div className="mb-4 text-sm bg-white p-3 rounded shadow-sm border border-gray-100">
        <h3 className="font-medium text-gray-700 mb-2">Validation Checks</h3>
        {!hasStartNode && (
          <div className="text-red-500 mb-1">❌ Error: Missing Start Node.</div>
        )}
        {missingDescriptions > 0 && (
          <div className="text-red-500 mb-1">
            ❌ Error: {missingDescriptions} node(s) missing descriptions.
          </div>
        )}
        {disconnectedNodes > 0 && (
          <div className="text-amber-500">
            ⚠️ Warning: {disconnectedNodes} disconnected node(s).
          </div>
        )}
        {hasStartNode && missingDescriptions === 0 && (
          <div className="text-green-600">✅ All required checks passed!</div>
        )}
      </div>

      <div className="relative flex-1 rounded overflow-hidden shadow-inner border border-gray-700">
        <div className="absolute top-0 right-0 p-2">
          <button
            onClick={() => navigator.clipboard.writeText(schema)}
            className="text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 transition-colors"
          >
            Copy JSON
          </button>
        </div>
        <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 text-xs h-full w-full overflow-auto font-mono">
          {schema}
        </pre>
      </div>
    </div>
  );
}
