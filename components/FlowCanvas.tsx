"use client";
import { useCallback } from "react";
import ReactFlow, { Background, Controls, NodeMouseHandler } from "reactflow";
import "reactflow/dist/style.css";
import { useFlowStore } from "../store/useFlowStore";
import CustomShapeNode from "./CustomShapeNode";

const nodeTypes = {
  customShape: CustomShapeNode,
};

export default function FlowCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
  } = useFlowStore();

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => setSelectedNode(node.id),
    [setSelectedNode],
  );

  const onPaneClick = useCallback(
    () => setSelectedNode(null),
    [setSelectedNode],
  );

  return (
    <div className="flex-1 h-full w-full relative bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        deleteKeyCode={["Backspace", "Delete"]}
        fitView
      >
        <Background gap={16} size={1} color="#e2e8f0" />
        <Controls />
      </ReactFlow>
    </div>
  );
}
