import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Paginator from '../components/Paginator';
import styles from './styles';

export default function TerceiraTela() {
  const router = useRouter();
  const screenHeight = Dimensions.get('window').height;
  const [currentPage, setCurrentPage] = useState(2);

  useFocusEffect(
     React.useCallback(() => {
       setCurrentPage(2);
     }, [])
   );
  
return (
    <SafeAreaView style={styles.container}>
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
      <Image
              style={styles.logo}
              source={require('../../assets/images/terceiro-cao.jpg')}
            />
      <View style={styles.container}>
      <Text style={styles.title}>Seu cão merece o melhor. Encontre um passeador agora!</Text>
      <Text style={styles.description}>
      Passeios e adestramento de qualidade. Comece agora!
      </Text>
      <Paginator pages={3} currentPage={currentPage} />
      <TouchableOpacity
              style={styles.button}
              onPress={() => {
                router.push('/auth/login');
              }}
            >
              <Text style={styles.buttonText}>Começar</Text>
            </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
}
