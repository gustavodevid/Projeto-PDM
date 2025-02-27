import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import  styles  from './login.styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/v1/login/tutor', {
        email,
        senha,
      });

      if (response.data.token) {
        const { token, userId, userName } = response.data;
        console.log('Login bem-sucedido:', response.data);

        await storeData('token', token);
        await storeData('userId', String(userId));
        await storeData('userName', userName);

        router.push('/principal/home');
      } else {
        Alert.alert('Erro', 'Login falhou. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      Alert.alert('Erro ao conectar com o servidor.');
    }
  };

  const storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log(`Dados armazenados com sucesso: ${key} = ${value}`);
    } catch (error) {
      console.error(`Erro ao armazenar dados: ${key}`, error);
    }
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
