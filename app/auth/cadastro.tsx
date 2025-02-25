import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import  styles  from './cadastro.styles';

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = () => {
    // Lógica de cadastro aqui
    console.log('Cadastro:', nome, email, senha, confirmarSenha);
    // Exemplo: router.push('/home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Primeiro, precisamos conhecer você.</Text>
      <Text style={styles.description}>
          Depois, gostarámos de conhecer o seu pet.
      </Text>
      <Text style={styles.label}>Seu Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome completo"
        value={nome}
        onChangeText={setNome}
      />
      <Text style={styles.label}>Seu Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira um email válido"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Escolha uma senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite uma senha forte"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Repita sua senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}