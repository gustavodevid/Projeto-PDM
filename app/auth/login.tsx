import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    // Lógica de autenticação aqui
    console.log('Login:', email, senha);
    router.push('/principal/home');
  };

  return (
     <SafeAreaView style={styles.container}>
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <Image
                style={styles.logo}
                source={require('../../assets/images/cao-login.jpg')}
        />
    
    <View style={styles.container}>
      <Text style={styles.title}>Au-Au! (Olá)</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <View style={styles.forgotPasswordContainer}>
      <TouchableOpacity onPress={() => router.push('/auth/cadastro')}>
        <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/auth/cadastro')}>
        <Text style={styles.signupLink}>Crie sua conta</Text>
      </TouchableOpacity>
</View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: 20,
},
title: {
  fontSize: 28,
  fontWeight: 'bold',
  marginBottom: 20,
  textAlign: 'center',
  paddingHorizontal: 20,
  marginTop: 20,
},
input: {
    height: 60,
    width:'100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, 
},
logo: {
    width: '100%',
    height: Dimensions.get('window').height / 2,
  },
button: {
  backgroundColor: '#007AFF',
  paddingVertical: 12,
  paddingHorizontal: 30,
  borderRadius: 10,
  width: '100%',
},
buttonText: {
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
},
link: {
  marginTop: 20,
  textAlign: 'center',
  color: 'blue',
  fontSize: 16,
},
forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
forgotPassword: {
    color: '#007AFF',
    fontSize: 16,
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  signupLink: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007AFF', // Cor do botão
    fontSize: 18,
    textDecorationLine: 'none', // Sublinhado
  },
});