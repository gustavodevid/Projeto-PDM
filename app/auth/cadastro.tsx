import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

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
        textAlign: 'left',
        paddingHorizontal: 20,
        marginTop: 20,
      },
      description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 20, 
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        alignSelf: 'flex-start',
      },
      input: {
        height: 50,
        width:'100%',
        backgroundColor: '#f0f0f0', // Cor de fundo sutil
        borderRadius: 10,
      
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        shadowColor: '#000', // Sombra
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2, // Para Android
      },
      button: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2, 
        width:'100%',
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
    });