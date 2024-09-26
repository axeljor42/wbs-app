// src/App.tsx
import React, { useState } from 'react';
import InputForm from './components/InputForm';
import CanvasComponent from './components/CanvasComponent';
import './App.css';

function App() {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data: any) => {
    setFormData(data);
  };

  return (
    <div className="App">
      <h1>Well Schematic Generator</h1>
      <div className="container">
        <div className="input-form">
          <InputForm onSubmit={handleFormSubmit} />
        </div>
        <div className="canvas-component">
          <CanvasComponent formData={formData} />
        </div>
      </div>
    </div>
  );
}

export default App;
