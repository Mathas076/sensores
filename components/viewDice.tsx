import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { OrbitControls, Text } from '@react-three/drei/native';
import * as THREE from 'three';
import { DICE_FACES, DICE_TEXT_CONFIG } from '@/lib/core/constants/diceConstants';

interface DiceModelProps {
  rotation?: [number, number, number];
  position?: [number, number, number];
}

// Componente del dado con mesh
function DiceModel({ rotation = [0, 0, 0], position = [0, 0, 0] }: DiceModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <mesh ref={meshRef} position={position} rotation={rotation} castShadow>
      {/* Geometría del cubo */}
      <boxGeometry args={[2, 2, 2]} />
      
      {/* Material con color blanco */}
      <meshStandardMaterial color="#ffffff" />
      
      {/* Números en cada cara del dado desde la constante */}
      {DICE_FACES.map((face) => (
        <Text
          key={face.number}
          position={face.position}
          rotation={face.rotation}
          fontSize={DICE_TEXT_CONFIG.fontSize}
          color={DICE_TEXT_CONFIG.color}
          anchorX={DICE_TEXT_CONFIG.anchorX}
          anchorY={DICE_TEXT_CONFIG.anchorY}
        >
          {face.number}
        </Text>
      ))}
    </mesh>
  );
}

// Componente principal del Canvas 3D
interface Dice3DProps {
  currentNumber?: number;
  isShaking?: boolean;
}

export default function Dice3D({ currentNumber = 1, isShaking = false }: Dice3DProps) {
  return (
    <View style={styles.container}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={styles.canvas}
      >
        {/* Luces */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.3} />
        
        {/* Modelo del dado */}
        <DiceModel 
          rotation={[0, 0, 0]}
        />
        
        {/* Controles deshabilitados para mantener el dado estático */}
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
          autoRotate={false}
        />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 400,
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    overflow: 'hidden',
  },
  canvas: {
    flex: 1,
  },
});