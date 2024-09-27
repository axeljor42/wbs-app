// src/utils/layerMapping.ts

export type LayerKey = 'reservoir' | 'casing' | 'lines' | 'rig' | 'formation' | 'openHole';

export type ComponentType =
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

export const layerMapping: Record<ComponentType, LayerKey> = {
  ConductorCasing: 'casing',
  FormationNormal: 'formation',
  OpenHole: 'openHole',
  ProductionCasing: 'casing',
  ReservoirLayer: 'reservoir',
  Seawater: 'lines',
  SurfaceCasing: 'casing',
  Rig: 'rig',
  DashedLine: 'lines',
  SolidLine: 'lines',
};
