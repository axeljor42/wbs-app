// src/components/layers/SVGComponent.tsx

import React, { useEffect, useState, useRef, memo } from 'react';
import { Image, Transformer, Group, Text } from 'react-konva';
import { loadSVGImage } from '../../utils/loadSVG';

interface SVGComponentProps {
  src: string;
  x: number;
  y: number;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
  id: string;
}

const SVGComponent: React.FC<SVGComponentProps> = memo(({
  src,
  x,
  y,
  onSelect,
  isSelected,
  id,
}) => {
  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 100,
    height: 100,
  });
  const [label, setLabel] = useState<string>('Label');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const groupRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const textRef = useRef<any>(null);

  useEffect(() => {
    loadSVGImage(src)
      .then((img) => {
        setImage(img);
        setSize({ width: img.width, height: img.height });
      })
      .catch((err) => {
        console.error('Failed to load SVG:', err);
      });
  }, [src]);

  useEffect(() => {
    if (isSelected && trRef.current && groupRef.current) {
      // Use the updated method
      trRef.current.nodes([groupRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const handleTextBlur = () => {
    setIsEditing(false);
  };

  return (
    <>
      <Group
        ref={groupRef}
        draggable
        x={x}
        y={y}
        onClick={() => onSelect && onSelect(id)}
        onTap={() => onSelect && onSelect(id)}
        onDblClick={handleDoubleClick}
        onDblTap={handleDoubleClick}
      >
        <Image
          image={image}
          width={size.width}
          height={size.height}
        />
        <Text
          ref={textRef}
          text={label}
          fontSize={14}
          fill="#333"
          x={0}
          y={size.height + 5}
          draggable={false}
          onDblClick={handleDoubleClick}
          onDblTap={handleDoubleClick}
        />
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={false}
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          anchorSize={8}
          borderStroke="#00BCD4"
          anchorStroke="#00BCD4"
          anchorFill="#fff"
          anchorCornerRadius={4}
        />
      )}
      {isEditing && (
        <foreignObject
          x={x}
          y={y + size.height + 5}
          width={size.width}
          height={30}
          onClick={(e) => e.stopPropagation()} // Replaced cancelBubble with stopPropagation
        >
          <input
            type="text"
            value={label}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            autoFocus
            style={{
              width: '100%',
              height: '100%',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '2px 4px',
              fontSize: '14px',
            }}
          />
        </foreignObject>
      )}
    </>
  );
});

export default SVGComponent;
