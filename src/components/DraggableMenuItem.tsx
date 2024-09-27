// src/components/DraggableMenuItem.tsx
import React from 'react';
import { useDrag } from 'react-dnd';
import { ComponentType } from '../utils/layerMapping';

interface DraggableMenuItemProps {
  componentType: ComponentType;
  label: string;
}

const DraggableMenuItem: React.FC<DraggableMenuItemProps> = ({ componentType, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { componentType },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        ...buttonStyle,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      {label}
    </div>
  );
};

// Simple inline styles for buttons
const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  margin: '8px 0',
  backgroundColor: '#1f77b4',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  textAlign: 'left',
  fontSize: '14px',
};

export default DraggableMenuItem;
