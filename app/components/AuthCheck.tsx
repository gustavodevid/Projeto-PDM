import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './SplashScreen';

export default function AuthCheck() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          router.replace('/principal/home');
        } else {
          router.replace('/boas-vindas/primeira-tela');
        }
      } catch (error) {
        console.error('Erro ao verificar o token:', error);
        Alert.alert('Erro', 'Erro ao verificar o token.');
        router.replace('/boas-vindas/primeira-tela');
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return null;
}