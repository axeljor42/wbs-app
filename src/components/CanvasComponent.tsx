// src/components/CanvasComponent.tsx

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Stage, Layer } from 'react-konva';
import SVGComponent from './layers/SVGComponent';
import jsPDF from 'jspdf';
import { useDrop } from 'react-dnd';
import { layerMapping, LayerKey, ComponentType } from '../utils/layerMapping';
import { v4 as uuidv4 } from 'uuid'; // Import UUID

// If using imported SVGs
// import { componentImages } from '../utils/componentImages';

interface CanvasComponentProps {
  visibleLayers: Record<LayerKey, boolean>;
  setAddComponent: (fn: (componentType: ComponentType) => void) => void;
}

interface CanvasComponentState {
  components: Array<{
    id: string;
    type: ComponentType;
    x: number;
    y: number;
  }>;
  selectedId: string | null;
}

const CanvasComponent: React.FC<CanvasComponentProps> = ({
  visibleLayers,
  setAddComponent,
}) => {
  const stageRef = useRef<any>(null);

  const [state, setState] = useState<CanvasComponentState>({
    components: [],
    selectedId: null,
  });

  const [scaleFactor, setScaleFactor] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Function to handle adding components, memoized to prevent re-creation
  const handleAddComponent = useCallback(
    (componentType: ComponentType, x?: number, y?: number) => {
      const id = uuidv4(); // Generate unique ID
      const newComponent = {
        id,
        type: componentType,
        x: x !== undefined ? x : 100 + state.components.length * 20, // Staggered position
        y: y !== undefined ? y : 100 + state.components.length * 20,
      };
      setState((prevState) => ({
        ...prevState,
        components: [...prevState.components, newComponent],
      }));
    },
    [state.components.length]
  );

  // Assign addComponent function to parent via setAddComponent
  useEffect(() => {
    setAddComponent(handleAddComponent);
  }, [handleAddComponent, setAddComponent]);

  // Handle component selection
  const handleSelect = useCallback((id: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedId: id,
    }));
  }, []);

  // Handle component deselection when clicking on empty space
  const handleStageClick = (e: any) => {
    // Click on empty area - deselect
    if (e.target === e.target.getStage()) {
      setState((prevState) => ({
        ...prevState,
        selectedId: null,
      }));
    }
  };

  // Handle layer ordering (Bring Forward / Send Backward)
  const bringForward = useCallback(() => {
    if (!state.selectedId) return;
    setState((prevState) => {
      const index = prevState.components.findIndex((comp) => comp.id === prevState.selectedId);
      if (index < prevState.components.length - 1) {
        const newComponents = [...prevState.components];
        [newComponents[index], newComponents[index + 1]] = [newComponents[index + 1], newComponents[index]];
        return { ...prevState, components: newComponents };
      }
      return prevState;
    });
  }, [state.selectedId, state.components]);

  const sendBackward = useCallback(() => {
    if (!state.selectedId) return;
    setState((prevState) => {
      const index = prevState.components.findIndex((comp) => comp.id === prevState.selectedId);
      if (index > 0) {
        const newComponents = [...prevState.components];
        [newComponents[index], newComponents[index - 1]] = [newComponents[index - 1], newComponents[index]];
        return { ...prevState, components: newComponents };
      }
      return prevState;
    });
  }, [state.selectedId, state.components]);

  // Handle Save, Load, Export
  const handleSave = useCallback(() => {
    const json = stageRef.current.toJSON();
    localStorage.setItem('wellSchematic', json);
    alert('Schematic saved successfully!');
  }, []);

  const handleLoad = useCallback(() => {
    const json = localStorage.getItem('wellSchematic');
    if (json) {
      const stage = stageRef.current;
      stage.destroyChildren();
      stage.loadJSON(json, () => {
        stage.batchDraw();
      });
      alert('Schematic loaded successfully!');
    } else {
      alert('No saved schematic found.');
    }
  }, []);

  const handleExport = useCallback(() => {
    const uri = stageRef.current.toDataURL({ pixelRatio: 3 });
    const pdf = new jsPDF('landscape', 'px', 'a4');
    const imgProps = pdf.getImageProperties(uri);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(uri, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('well-schematic.pdf');
  }, []);

  const handleWheel = useCallback((e: any) => {
    e.evt.preventDefault();

    const stage = stageRef.current;
    const oldScale = stage.scaleX();

    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const direction = e.evt.deltaY > 0 ? -1 : 1;
    const scaleBy = 1.05;
    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setScaleFactor(newScale);

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    setPosition(newPos);
  }, []);

  // Implement drop functionality
  const [, drop] = useDrop(() => ({
    accept: 'component',
    drop: (item: { componentType: ComponentType }, monitor) => {
      const stage = stageRef.current;
      const pointer = stage.getPointerPosition();
      if (pointer) {
        handleAddComponent(
          item.componentType,
          (pointer.x - position.x) / scaleFactor,
          (pointer.y - position.y) / scaleFactor
        );
      }
    },
  }));

  return (
    <div>
      <Stage
        width={800}
        height={800}
        ref={(node) => {
          stageRef.current = node;
          if (node && node.container()) {
            drop(node.container());
          }
        }}
        scaleX={scaleFactor}
        scaleY={scaleFactor}
        x={position.x}
        y={position.y}
        onWheel={handleWheel}
        onClick={handleStageClick}
        draggable
      >
        <Layer>
          {state.components
            .filter((comp) => visibleLayers[layerMapping[comp.type]])
            .map((comp) => (
              <SVGComponent
                key={comp.id} // Unique key
                id={comp.id}
                src={`/assets/${comp.type}.svg`} // Ensure correct path
                x={comp.x}
                y={comp.y}
                onSelect={handleSelect}
                isSelected={state.selectedId === comp.id}
              />
            ))}
        </Layer>
      </Stage>
      {/* Toolbar for Save, Load, Export, and Layer Ordering */}
      <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={handleSave} style={buttonStyle}>
          Save Schematic
        </button>
        <button onClick={handleLoad} style={buttonStyle}>
          Load Schematic
        </button>
        <button onClick={handleExport} style={buttonStyle}>
          Export as PDF
        </button>
        <button onClick={bringForward} style={buttonStyle} disabled={!state.selectedId}>
          Bring Forward
        </button>
        <button onClick={sendBackward} style={buttonStyle} disabled={!state.selectedId}>
          Send Backward
        </button>
      </div>
    </div>
  );
};

// Simple inline styles for buttons
const buttonStyle: React.CSSProperties = {
  padding: '10px 15px',
  backgroundColor: '#1f77b4',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  minWidth: '120px',
  textAlign: 'center',
  fontSize: '14px',
  transition: 'background-color 0.3s',
};

export default CanvasComponent;
