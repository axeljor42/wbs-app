// src/components/CanvasComponent.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line, Circle, Text, Group } from 'react-konva';
import theme from '../theme'; // Import theme for colors and styles

interface CanvasComponentProps {
  formData: any;
}

const CanvasComponent: React.FC<CanvasComponentProps> = ({ formData }) => {
  const stageRef = useRef<any>(null);
  const [elements, setElements] = useState<any[]>([]);

  useEffect(() => {
    if (formData) {
      generateSchematic();
    }
  }, [formData]);

  const generateSchematic = () => {
    const {
      seaLevelHeight,
      rkbHeight,
      mudlineHeight,
      conductorCasingDepth,
      surfaceCasingDepth,
      productionCasingDepth,
      reservoirDepth,
    } = formData;

    // Clear existing elements
    setElements([]);

    const newElements = [];

    const scale = 0.1; // Adjust scale as needed

    // Base positions
    const startX = 150;
    const startY = 50;

    // Draw sea level
    newElements.push(
      <Line
        key="sea-level"
        points={[startX - 100, startY, startX + 100, startY]}
        stroke={theme.colors.seaLevel}
        strokeWidth={2}
      />
    );
    newElements.push(
      <Text
        key="sea-level-text"
        x={startX + 110}
        y={startY - 7}
        text="Sea Level"
        fontSize={14}
        fill={theme.colors.text}
      />
    );

    // Draw RKB (Rotary Kelly Bushing)
    const rkbY = startY + seaLevelHeight * scale;
    newElements.push(
      <Line
        key="rkb"
        points={[startX - 100, rkbY, startX + 100, rkbY]}
        stroke={theme.colors.rkb}
        dash={[4, 4]}
        strokeWidth={2}
      />
    );
    newElements.push(
      <Text
        key="rkb-text"
        x={startX + 110}
        y={rkbY - 7}
        text="RKB"
        fontSize={14}
        fill={theme.colors.text}
      />
    );

    // Draw mudline
    const mudlineY = startY + (seaLevelHeight + mudlineHeight) * scale;
    newElements.push(
      <Line
        key="mudline"
        points={[startX - 100, mudlineY, startX + 100, mudlineY]}
        stroke={theme.colors.mudline}
        strokeWidth={2}
      />
    );
    newElements.push(
      <Text
        key="mudline-text"
        x={startX + 110}
        y={mudlineY - 7}
        text="Mudline"
        fontSize={14}
        fill={theme.colors.text}
      />
    );

    // Draw casings as hollow tubes
    const createCasing = (
      key: string,
      x: number,
      y: number,
      width: number,
      height: number,
      label: string,
      color: string
    ) => {
      return (
        <Group key={key} draggable>
          {/* Left Side */}
          <Line
            points={[x, y, x, y + height]}
            stroke={color}
            strokeWidth={4}
          />
          {/* Right Side */}
          <Line
            points={[x + width, y, x + width, y + height]}
            stroke={color}
            strokeWidth={4}
          />
          {/* Base */}
          <Line
            points={[x, y + height, x + width, y + height]}
            stroke={color}
            strokeWidth={4}
          />
          {/* Label */}
          <Text
            x={x + width + 10}
            y={y + height / 2 - 7}
            text={label}
            fontSize={12}
            fill={color}
          />
        </Group>
      );
    };

    const casingWidth = 60;

    // Conductor casing
    const conductorY = mudlineY;
    const conductorHeight = conductorCasingDepth * scale;
    newElements.push(
      createCasing(
        'conductor-casing',
        startX - casingWidth / 2,
        conductorY,
        casingWidth,
        conductorHeight,
        'Conductor Casing',
        theme.colors.casing.conductor
      )
    );

    // Surface casing
    const surfaceY = conductorY + conductorHeight;
    const surfaceHeight = (surfaceCasingDepth - conductorCasingDepth) * scale;
    newElements.push(
      createCasing(
        'surface-casing',
        startX - (casingWidth - 10) / 2,
        surfaceY,
        casingWidth - 10,
        surfaceHeight,
        'Surface Casing',
        theme.colors.casing.surface
      )
    );

    // Production casing
    const productionY = surfaceY + surfaceHeight;
    const productionHeight = (productionCasingDepth - surfaceCasingDepth) * scale;
    newElements.push(
      createCasing(
        'production-casing',
        startX - (casingWidth - 20) / 2,
        productionY,
        casingWidth - 20,
        productionHeight,
        'Production Casing',
        theme.colors.casing.production
      )
    );

    // Draw reservoir
    const reservoirY = startY + (seaLevelHeight + reservoirDepth) * scale;
    newElements.push(
      <Group key="reservoir" draggable>
        {/* Well Path */}
        <Line
          points={[startX, productionY + productionHeight, startX, reservoirY]}
          stroke={theme.colors.wellPath}
          strokeWidth={2}
        />
        {/* Reservoir */}
        <Circle
          x={startX}
          y={reservoirY}
          radius={15}
          fill={theme.colors.reservoir}
        />
        <Text
          x={startX + 20}
          y={reservoirY - 7}
          text="Reservoir"
          fontSize={12}
          fill={theme.colors.text}
        />
      </Group>
    );

    setElements(newElements);
  };

  return (
    <div>
      <Stage width={800} height={800} ref={stageRef}>
        <Layer>{elements}</Layer>
      </Stage>
    </div>
  );
};

export default CanvasComponent;
