import { OrbitControls } from '@react-three/drei/core';
import { Canvas } from '@react-three/fiber';
import React from 'react';
import { View } from 'react-native';


export default function Index() {
  return (
    <View style={{ flex: 1}}>
      <Canvas
      >
        <OrbitControls></OrbitControls>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhongMaterial />
      </mesh>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} color="red" />
    </Canvas>
    </View>
  );
}