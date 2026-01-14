// lib/core/constants/diceFaces.ts

export interface DiceFace {
    number: number;
    position: [number, number, number];
    rotation: [number, number, number];
  }
  
  export const DICE_FACES: DiceFace[] = [
    {
      number: 1,
      position: [0, 0, 1.01],
      rotation: [0, 0, 0],
    },
    {
      number: 6,
      position: [0, 0, -1.01],
      rotation: [0, Math.PI, 0],
    },
    {
      number: 2,
      position: [1.01, 0, 0],
      rotation: [0, Math.PI / 2, 0],
    },
    {
      number: 5,
      position: [-1.01, 0, 0],
      rotation: [0, -Math.PI / 2, 0],
    },
    {
      number: 3,
      position: [0, 1.01, 0],
      rotation: [-Math.PI / 2, 0, 0],
    },
    {
      number: 4,
      position: [0, -1.01, 0],
      rotation: [Math.PI / 2, 0, 0],
    },
  ];
  
  // Propiedades del texto del dado
  export const DICE_TEXT_CONFIG = {
    fontSize: 0.8,
    color: 'black',
    anchorX: 'center' as const,
    anchorY: 'middle' as const,
  };