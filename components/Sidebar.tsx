"use client";
import { useFlowStore } from "@/store/useFlowStore";
import { cn } from "@/lib/utils"; // Standard Shadcn utility
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FlagIcon from "@mui/icons-material/Flag";
import AssistantIcon from "@mui/icons-material/Assistant";
import CategoryIcon from "@mui/icons-material/Category";

export default function Sidebar() {
  const {
    selectedNodeId,
    nodes,
    edges,
    updateNodeData,
    setStartNode,
    deleteNode,
    updateEdgeCondition,
    deleteEdge,
    setEndNode,
  } = useFlowStore();

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);
  const selectedEdge = edges.find((e) => e.selected);

  if (!selectedNode && !selectedEdge) {
    return (
      <div className="w-80 border-l border-border bg-card p-8 flex flex-col justify-center items-center text-muted-foreground h-full">
        <div className="bg-muted rounded-full p-4 mb-4">
          <AssistantIcon fontSize="large" className="opacity-20" />
        </div>
        <p className="text-sm font-medium text-center">
          Select an element on the canvas to edit its properties.
        </p>
      </div>
    );
  }

  return (
    <div className="w-80 border-l border-border bg-white flex flex-col h-full shadow-sm z-10 overflow-y-auto animate-in fade-in slide-in-from-right-4 duration-200">
      {/* Header */}
      <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
        <div>
          <h2 className="text-sm font-bold tracking-tight text-foreground uppercase">
            {selectedNode ? "Node Settings" : "Transition Settings"}
          </h2>
          <p className="text-[11px] text-muted-foreground font-mono mt-1">
            ID: {selectedNode?.id || selectedEdge?.id}
          </p>
        </div>
        <button
          onClick={() =>
            selectedNode
              ? deleteNode(selectedNode.id)
              : deleteEdge(selectedEdge!.id)
          }
          className="h-8 w-8 flex items-center justify-center rounded-md text-destructive hover:bg-destructive/10 transition-colors border border-transparent hover:border-destructive/20"
        >
          <DeleteOutlineIcon fontSize="small" />
        </button>
      </div>

      <div className="p-6 space-y-8">
        {selectedNode && (
          <>
            {/* Status Section */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <FlagIcon className="scale-75" />
                <span>Flow Status</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setStartNode(selectedNode.id)}
                  className={cn(
                    "py-2 px-3 rounded-md border text-xs font-semibold transition-all shadow-sm",
                    selectedNode.data.isStart
                      ? "bg-green-600 border-green-700 text-white"
                      : "bg-white border-input hover:bg-green-50 text-foreground",
                  )}
                >
                  Start Node
                </button>
                <button
                  onClick={() => {
                    setEndNode(selectedNode.id);
                  }}
                  className={cn(
                    "py-2 px-3 rounded-md border text-xs font-semibold transition-all shadow-sm",
                    selectedNode.data.isEnd
                      ? "bg-red-600 border-red-700 text-white"
                      : "bg-white border-input hover:bg-red-50 text-foreground",
                  )}
                >
                  End Node
                </button>
              </div>
            </section>

            {/* Content Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <AssistantIcon className="scale-75" />
                <span>Content</span>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-foreground">
                  Label
                </label>
                <input
                  type="text"
                  value={selectedNode.data.label}
                  onChange={(e) =>
                    updateNodeData(selectedNode.id, { label: e.target.value })
                  }
                  className="w-full flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-foreground">
                  Description
                </label>
                <textarea
                  value={selectedNode.data.description}
                  onChange={(e) =>
                    updateNodeData(selectedNode.id, {
                      description: e.target.value,
                    })
                  }
                  className="w-full flex min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Describe this step..."
                />
              </div>
            </section>

            {/* Shape Customization */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <CategoryIcon className="scale-75" />
                <span>Visual Shape</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["rectangle", "diamond", "oval", "cylinder"].map((shape) => (
                  <button
                    key={shape}
                    onClick={() =>
                      updateNodeData(selectedNode.id, { shape: shape as any })
                    }
                    className={cn(
                      "px-3 py-1.5 rounded-full border text-[10px] font-bold capitalize transition-all",
                      selectedNode.data.shape === shape
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-white border-input hover:bg-accent text-muted-foreground",
                    )}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {selectedEdge && (
          <section className="space-y-4 animate-in slide-in-from-bottom-2">
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <span>Transition Logic</span>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-foreground">
                Condition Text
              </label>
              <input
                type="text"
                value={selectedEdge.label as string || ""}
                onChange={(e) =>
                  updateEdgeCondition(selectedEdge.id, e.target.value)
                }
                placeholder="e.g. If success..."
                className="w-full flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <p className="text-[10px] text-muted-foreground mt-1">
                This text appears directly on the connector line.
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
