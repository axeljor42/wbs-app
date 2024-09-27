// src/theme.ts
const theme = {
  colors: {
    background: '#FFFFFF',
    primary: '#1f77b4',
    text: '#333333',
    seaLevel: '#0000FF',
    rkb: '#FF4500',
    mudline: '#A52A2A',
    wellPath: '#000000', // Black for the well path
    reservoir: '#FFD700', // Yellow for the reservoir
    openHole: '#FFFFFF', // White for the open hole
    border: '#000000', // Black border for reservoir and open hole
    casing: {
      conductor: '#696969',
      surface: '#C0C0C0',
      production: '#808080',
      withBend: '#4682B4',
    },
    rig: {
      drillship: '#00008B',
      semiSubmersible: '#4169E1',
      jackup: '#4682B4',
      jacket: '#00CED1',
      condeep: '#20B2AA',
    },
  },
};

export default theme;
