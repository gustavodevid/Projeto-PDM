import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Paginator from '../components/Paginator';
import styles from './styles';

export default function PrimeiraTela() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get('window').height;
  const [currentPage, setCurrentPage] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setCurrentPage(0);
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/white-dog.jpg')}
      />
      <View style={styles.container}>
      <Text style={styles.title}>
        Mais tempo para você, mais diversão para o seu cão. Encontre o passeador ideal agora.
      </Text>
      <Text style={styles.description}>
        Seu dia a dia mais leve. Passeadores confiáveis para cuidar do seu pet.
      </Text>
      <Paginator pages={3} currentPage={currentPage} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push('/boas-vindas/segunda-tela');
        }}
      >
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
}
