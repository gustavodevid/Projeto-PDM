import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Paginator from '../components/Paginator';
import styles from './styles';

export default function SegundaTela() {
  const router = useRouter();
  const screenHeight = Dimensions.get('window').height;
  const insets = useSafeAreaInsets();
  const [currentPage, setCurrentPage] = useState(1);
  
   useFocusEffect(
      React.useCallback(() => {
        setCurrentPage(1);
      }, [])
    );

  return (
    <SafeAreaView style={styles.container}>
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
      <Image
              style={styles.logo}
              source={require('../../assets/images/segundo-cao.jpg')}
            />
      <View style={styles.container}>
      <Text style={styles.title}>Passeios divertidos e personalizados para o seu melhor amigo.</Text>
      <Text style={styles.description}>
      Um mundo de descobertas e aprendizado para o seu cão.
      </Text>
      <Paginator pages={3} currentPage={currentPage} />
      <TouchableOpacity
              style={styles.button}
              onPress={() => {
                router.push('/boas-vindas/terceira-tela');
              }}
            >
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
}
