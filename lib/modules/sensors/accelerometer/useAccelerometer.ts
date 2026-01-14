import { useState, useEffect } from 'react';
import { SensorService } from './accelerometer.service';
import { isShaking } from '@/lib/core/logic/motion';

export const useAccelerometer = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    let subscription: any;

    // 1. Iniciamos la escucha usando tu servicio
    SensorService.subscribe((sensorData) => {
      setData(sensorData);
      
      // 2. Usamos tu lógica de "motion.ts" para detectar el movimiento
      const isDeviceShaking = isShaking(sensorData);
      setShaking(isDeviceShaking);
    });

    // 3. Limpieza al desmontar el componente (evita memory leaks)
    return () => {
      if (subscription) {
        SensorService.unsubscribe(subscription);
      }
    };
  }, []);

  return { data, shaking };
};