import { create } from "zustand";
import {
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";

export type FlowNodeData = {
  label: string;
  description: string;
  shape: "rectangle" | "diamond" | "oval" | "cylinder";
  isStart?: boolean;
  isEnd?: boolean;
};

type FlowState = {
  nodes: Node<FlowNodeData>[];
  edges: Edge[];
  startNodeId: string | null;
  selectedNodeId: string | null;

  // React Flow Handlers
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;

  // Action Handlers
  addNode: (shape?: "rectangle" | "diamond" | "oval" | "cylinder") => void;
  deleteNode: (id: string) => void;
  updateNodeData: (id: string, data: Partial<FlowNodeData>) => void;
  setStartNode: (id: string) => void;
  setEndNode: (id: string) => void;
  setSelectedNode: (id: string | null) => void;
  updateEdgeCondition: (edgeId: string, condition: string) => void;
  deleteEdge: (edgeId: string) => void;
};

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [
    {
      id: "start-node-1",
      position: { x: 250, y: 150 },
      data: {
        label: "Start Node",
        description: "Initial entry point",
        shape: "rectangle",
        isStart: true,
      },
      type: "customShape",
    },
  ],
  edges: [],
  startNodeId: "start-node-1",
  selectedNodeId: null,

  onNodesChange: (changes) =>
    set({ nodes: applyNodeChanges(changes, get().nodes) }),
  onEdgesChange: (changes) =>
    set({ edges: applyEdgeChanges(changes, get().edges) }),

  onConnect: (connection) => {
    if (connection.source === connection.target) return;
    const edge = {
      ...connection,
      id: `e${connection.source}-${connection.target}`,
      label: "",
      data: { condition: "" },
      type: "smoothstep",
    };
    set({ edges: addEdge(edge, get().edges) });
  },

  addNode: (shape = "rectangle") => {
    const id = `node-${Date.now().toString().slice(-4)}`;
    const newNode = {
      id,
      position: { x: 100, y: 100 },
      data: { label: id, description: "", shape },
      type: "customShape",
    };
    set({ nodes: [...get().nodes, newNode] });
  },

  deleteNode: (id) =>
    set({
      nodes: get().nodes.filter((n) => n.id !== id),
      edges: get().edges.filter((e) => e.source !== id && e.target !== id),
      selectedNodeId: get().selectedNodeId === id ? null : get().selectedNodeId,
      startNodeId: get().startNodeId === id ? null : get().startNodeId,
    }),

  updateNodeData: (id, data) =>
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node,
      ),
    }),

  setStartNode: (id: string) =>
    set({
      startNodeId: id,
      nodes: get().nodes.map((n) => ({
        ...n,
        data: {
          ...n.data,
          isStart: n.id === id,
          isEnd: n.id === id ? false : n.data.isEnd,
        },
      })),
    }),

  setEndNode: (id: string) =>
    set({
      nodes: get().nodes.map((n) => ({
        ...n,
        data: {
          ...n.data,
          isEnd: n.id === id,
          isStart: n.id === id ? false : n.data.isStart,
        },
      })),
    }),

  setSelectedNode: (id) => set({ selectedNodeId: id }),

  updateEdgeCondition: (edgeId, condition) =>
    set({
      edges: get().edges.map((edge) =>
        edge.id === edgeId
          ? {
              ...edge,
              label: condition,
              labelStyle: {
                fill: "#374151",
                fontWeight: 700,
                fontSize: "12px",
              },
              labelBgStyle: { fill: "#ffffff", fillOpacity: 0.8 },
              data: { ...edge.data, condition },
            }
          : edge,
      ),
    }),

  deleteEdge: (edgeId) =>
    set({
      edges: get().edges.filter((e) => e.id !== edgeId),
    }),
}));
