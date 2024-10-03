import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  ReactFlowProvider,
  ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', data: { label: 'Node Babi 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node Babi 2' }, position: { x: 100, y: 100 } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2', animated: true }];

const CustomNode = ({ data }) => {
  return (
    <div style={{ padding: 10, borderRadius: 5, backgroundColor: '#f5f5f5', border: '1px solid #ccc' }}>
      <strong>{data.label}</strong>
      <div style={{ marginTop: 10 }}>Teste</div>
    </div>
  );
};

const nodeTypes = { customNode: CustomNode };

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeId, setNodeId] = useState(3); 

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const addNode = () => {
    const newNode = {
      id: `${nodeId}`,
      data: { label: `Node Babi ${nodeId}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeId((id) => id + 1);
  };

  const onDelete = (e) => {
    setNodes((nds) => nds.filter((node) => !e.includes(node.id)));
    setEdges((eds) => eds.filter((edge) => !e.includes(edge.id)));
  };

  const saveFlow = () => {
    const flowData = {
      nodes,
      edges,
    };
    console.log('Saved flow: ', flowData);
    alert('Flow saved! Verifique o console para ver o estado salvo.');
  };

  return (
    <div style={{ height: '100vh' }}>
      <button onClick={addNode} style={{ margin: '10px' }}>
        Adicionar Node
      </button>
      <button onClick={saveFlow} style={{ margin: '10px' }}>
        Salvar Estado
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={onDelete}
        onEdgesDelete={onDelete}
        nodeTypes={nodeTypes}
        fitView
        connectionLineType={ConnectionLineType.SmoothStep} 
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
