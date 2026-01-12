import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useAccelerometer } from '../lib/modules/sensors/accelerometer/useAccelerometer';
import { getDice } from '@/lib/core/logic/random_dice';

export default function App() {
  const { shaking } = useAccelerometer();
  const [number, setNumber] = useState<number | null>(null);

  useEffect(() => {
    if (shaking) {
      // Cuando el hook avisa que se agita, la UI decide qué hacer
      setNumber(getDice());
    }
  }, [shaking]); // Solo se ejecuta cuando cambia el estado de 'shaking'

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 40 }}>{number ?? '¡Agítame!'}</Text>
      {shaking && <Text>Detectando movimiento...</Text>}
    </View>
  );
}