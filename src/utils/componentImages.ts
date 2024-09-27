// src/utils/componentImages.ts

import ConductorCasing from '../assets/ConductorCasing.svg';
import FormationNormal from '../assets/FormationNormal.svg';
import OpenHole from '../assets/OpenHole.svg';
import ProductionCasing from '../assets/ProductionCasing.svg';
import ReservoirLayer from '../assets/ReservoirLayer.svg';
import Seawater from '../assets/Seawater.svg';
import SurfaceCasing from '../assets/SurfaceCasing.svg';
import Rig from '../assets/Rig.svg';
import DashedLine from '../assets/DashedLine.svg';
import SolidLine from '../assets/SolidLine.svg';

import { ComponentType } from './layerMapping';

export const componentImages: Record<ComponentType, string> = {
  ConductorCasing,
  FormationNormal,
  OpenHole,
  ProductionCasing,
  ReservoirLayer,
  Seawater,
  SurfaceCasing,
  Rig,
  DashedLine,
  SolidLine,
};
