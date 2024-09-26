// src/components/InputForm.tsx
import React, { useState } from 'react';

interface InputFormProps {
  onSubmit: (data: any) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    rigType: '',
    seaLevelHeight: '',
    rkbHeight: '',
    mudlineHeight: '',
    conductorCasingDepth: '',
    surfaceCasingDepth: '',
    productionCasingDepth: '',
    reservoirDepth: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert string values to numbers where necessary
    const data = {
      ...formData,
      seaLevelHeight: parseFloat(formData.seaLevelHeight),
      rkbHeight: parseFloat(formData.rkbHeight),
      mudlineHeight: parseFloat(formData.mudlineHeight),
      conductorCasingDepth: parseFloat(formData.conductorCasingDepth),
      surfaceCasingDepth: parseFloat(formData.surfaceCasingDepth),
      productionCasingDepth: parseFloat(formData.productionCasingDepth),
      reservoirDepth: parseFloat(formData.reservoirDepth),
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Input Parameters</h2>
      <label>
        Rig Type:
        <select name="rigType" value={formData.rigType} onChange={handleChange}>
          <option value="">Select Rig Type</option>
          <option value="Land">Land</option>
          <option value="Offshore">Offshore</option>
        </select>
      </label>
      <label>
        Sea Level Height (m):
        <input
          type="number"
          name="seaLevelHeight"
          value={formData.seaLevelHeight}
          onChange={handleChange}
          placeholder="e.g., 0"
        />
      </label>
      <label>
        RKB Height (m):
        <input
          type="number"
          name="rkbHeight"
          value={formData.rkbHeight}
          onChange={handleChange}
          placeholder="e.g., 30"
        />
      </label>
      <label>
        Mudline Height (m):
        <input
          type="number"
          name="mudlineHeight"
          value={formData.mudlineHeight}
          onChange={handleChange}
          placeholder="e.g., -100"
        />
      </label>
      <h3>Casing Depths (m)</h3>
      <label>
        Conductor Casing Depth:
        <input
          type="number"
          name="conductorCasingDepth"
          value={formData.conductorCasingDepth}
          onChange={handleChange}
          placeholder="e.g., 100"
        />
      </label>
      <label>
        Surface Casing Depth:
        <input
          type="number"
          name="surfaceCasingDepth"
          value={formData.surfaceCasingDepth}
          onChange={handleChange}
          placeholder="e.g., 500"
        />
      </label>
      <label>
        Production Casing Depth:
        <input
          type="number"
          name="productionCasingDepth"
          value={formData.productionCasingDepth}
          onChange={handleChange}
          placeholder="e.g., 1500"
        />
      </label>
      <label>
        Reservoir Depth (m):
        <input
          type="number"
          name="reservoirDepth"
          value={formData.reservoirDepth}
          onChange={handleChange}
          placeholder="e.g., 2000"
        />
      </label>
      <button type="submit">Generate Schematic</button>
    </form>
  );
};

export default InputForm;
