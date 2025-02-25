import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import  styles  from './login.styles';
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
