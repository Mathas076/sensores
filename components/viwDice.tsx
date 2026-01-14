import React, { Suspense, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei/native';

interface DiceModelProps {
  rotation?: [number, number, number];
  position?: [number, number, number];
}

// Componente del modelo 3D del dado
function DiceModel({ rotation = [0, 0, 0], position = [0, 0, 0] }: DiceModelProps) {
  const meshRef = useRef<any>();
  
  // Carga el modelo GLB desde assets
  const { scene } = useGLTF(require('../assets/models/marble6.glb'));
  
  return (
    <primitive 
      ref={meshRef}
      object={scene} 
      scale={1.5}
      position={position}
      rotation={rotation}
    />
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
        <Suspense fallback={null}>
          {/* Luces */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          {/* Modelo del dado */}
          <DiceModel 
            rotation={isShaking ? [Math.random(), Math.random(), Math.random()] : [0, 0, 0]}
          />
          
          {/* Controles para rotar el dado con gestos */}
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            autoRotate={!isShaking}
            autoRotateSpeed={2}
          />
          
          {/* Ambiente para mejor iluminación */}
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
      
      {/* Loading indicator mientras carga el modelo */}
      {false && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});

// Precarga el modelo para mejor performance
useGLTF.preload(require('../assets/models/marble6.glb'));