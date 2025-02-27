import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CadastroPetProps {
  onPetCadastrado: () => void; 
}

const CadastroPet: React.FC<CadastroPetProps> = ({ onPetCadastrado }) => {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [foto, setFoto] = useState<string | null>(null);
  const [idade, setIdade] = useState('');
  const [tutorId, setTutorId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTutorId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setTutorId(storedUserId);
        }
      } catch (error) {
        console.error('Erro ao recuperar o ID do dono:', error);
      }
    };

    fetchTutorId();
  }, []);

//   const escolherFoto = async () => {
//     let resultado = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!resultado.canceled) {
//       setFoto(resultado.assets[0].uri);
//     }
//   };

  const cadastrarPet = async () => {
    if (!nome || !raca || !idade || !tutorId) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/v1/pet', {
        nome,
        raca,
        idade: parseInt(idade),
        tutorId: tutorId,
      });

      console.log('Pet cadastrado com sucesso:', response.data);
      Alert.alert('Sucesso', 'Pet cadastrado com sucesso!');
      onPetCadastrado(); 
    } catch (error) {
      console.error('Erro ao cadastrar pet:', error);
      Alert.alert('Erro', 'Erro ao cadastrar pet. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Pet</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Raça"
        value={raca}
        onChangeText={setRaca}
      />

      {/* <TouchableOpacity style={styles.imagePicker} onPress={escolherFoto}>
        <Text style={styles.imagePickerText}>Selecionar Foto</Text>
      </TouchableOpacity> */}

      {foto && <Image source={{ uri: foto }} style={styles.imagePreview} />}

      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={cadastrarPet}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  imagePicker: {
    backgroundColor: '#eee',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePickerText: {
    fontSize: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CadastroPet;