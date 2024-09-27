// src/App.tsx

import React, { useState } from 'react';
import CanvasComponent from './components/CanvasComponent';
import Menu from './components/Menu';
import './App.css';

type LayerKey = 'reservoir' | 'casing' | 'lines' | 'rig' | 'formation' | 'openHole';
type ComponentType =
  | 'ConductorCasing'
  | 'FormationNormal'
  | 'OpenHole'
  | 'ProductionCasing'
  | 'ReservoirLayer'
  | 'Seawater'
  | 'SurfaceCasing'
  | 'Rig'
  | 'DashedLine'
  | 'SolidLine';

function App() {
  const [visibleLayers, setVisibleLayers] = useState<Record<LayerKey, boolean>>({
    reservoir: true,
    casing: true,
    lines: true,
    rig: true,
    formation: true,
    openHole: true,
  });

  // Reference to CanvasComponent's add function
  const [canvasAddComponent, setCanvasAddComponent] = useState<
    ((componentType: ComponentType) => void) | null
  >(null);

  const toggleLayer = (layer: LayerKey) => {
    setVisibleLayers((prev) => ({
      ...prev,
      [layer]: !prev[layer],
    }));
  };

  const handleAddComponent = (componentType: ComponentType) => {
    if (canvasAddComponent) {
      canvasAddComponent(componentType);
    }
  };

  return (
    <div className="App">
      <h1>Well Schematic Generator</h1>
      <div className="container">
        <Menu onAddComponent={handleAddComponent} />
        <div className="canvas-component">
          <CanvasComponent
            visibleLayers={visibleLayers}
            setAddComponent={(fn) => setCanvasAddComponent(() => fn)}
          />
        </div>
      </div>
      {/* Layer Toggle Controls */}
      <div className="layer-toggles">
        <label>
          <input
            type="checkbox"
            checked={visibleLayers.reservoir}
            onChange={() => toggleLayer('reservoir')}
          />
          Reservoir
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibleLayers.casing}
            onChange={() => toggleLayer('casing')}
          />
          Casing
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibleLayers.lines}
            onChange={() => toggleLayer('lines')}
          />
          Lines
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibleLayers.rig}
            onChange={() => toggleLayer('rig')}
          />
          Rig
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibleLayers.formation}
            onChange={() => toggleLayer('formation')}
          />
          Formation
        </label>
        <label>
          <input
            type="checkbox"
            checked={visibleLayers.openHole}
            onChange={() => toggleLayer('openHole')}
          />
          Open Hole
        </label>
      </div>
    </div>
  );
}

export default App;
