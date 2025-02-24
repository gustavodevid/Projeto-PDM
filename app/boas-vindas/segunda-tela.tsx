import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SegundaTela() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
              style={styles.logo}
              source={require('../../assets/images/white-dog.jpg')}
            />
      <Text style={styles.title}>Passeios divertidos e personalizados para o seu melhor amigo.</Text>
      <Text style={styles.description}>
      Um mundo de descobertas e aprendizado para o seu cão.
      </Text>
      <TouchableOpacity
              style={styles.button}
              onPress={() => {
                router.push('/boas-vindas/terceira-tela');
              }}
            >
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});