// src/components/Menu.tsx

import React from 'react';
import { useDrag } from 'react-dnd';
import { ComponentType } from '../utils/layerMapping';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface MenuProps {
  onAddComponent: (componentType: ComponentType) => void;
}

const Menu: React.FC<MenuProps> = ({ onAddComponent }) => {
  const components: Array<{ type: ComponentType; label: string }> = [
    { type: 'ConductorCasing', label: 'Conductor Casing' },
    { type: 'FormationNormal', label: 'Formation Normal' },
    { type: 'OpenHole', label: 'Open Hole' },
    { type: 'ProductionCasing', label: 'Production Casing' },
    { type: 'ReservoirLayer', label: 'Reservoir Layer' },
    { type: 'Seawater', label: 'Seawater' },
    { type: 'SurfaceCasing', label: 'Surface Casing' },
    { type: 'Rig', label: 'Rig' },
    { type: 'DashedLine', label: 'Dashed Line' },
    { type: 'SolidLine', label: 'Solid Line' },
  ];

  return (
    <Box sx={menuStyle}>
      <Typography variant="h6" gutterBottom>
        Add Components
      </Typography>
      {components.map((comp) => (
        <DraggableMenuItem
          key={comp.type}
          componentType={comp.type}
          label={comp.label}
          onAddComponent={onAddComponent}
        />
      ))}
    </Box>
  );
};

interface DraggableMenuItemProps {
  componentType: ComponentType;
  label: string;
  onAddComponent: (componentType: ComponentType) => void;
}

const DraggableMenuItem: React.FC<DraggableMenuItemProps> = ({
  componentType,
  label,
  onAddComponent,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { componentType },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Button
      ref={drag}
      variant="contained"
      color="primary"
      onClick={() => onAddComponent(componentType)}
      aria-label={`Add ${label}`}
      sx={{
        width: '100%',
        mb: 1,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        textAlign: 'left',
      }}
    >
      {label}
    </Button>
  );
};

// Simple inline styles for menu
const menuStyle: React.CSSProperties = {
  width: '220px',
  padding: '15px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
};

export default Menu;
