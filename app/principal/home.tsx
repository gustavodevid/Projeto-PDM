import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 
import styles from '../styles/home.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Home() {
  const insets = useSafeAreaInsets();
  const [userName, setUserName] = useState<string | null>(null);
  const [passeadores, setPasseadores] = useState([]);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('userName');
        if (storedUserName) {
          setUserName(storedUserName);
        }
      } catch (error) {
        console.error('Erro ao recuperar o nome do usuário:', error);
      }
    };

    const fetchPasseadores = async () => {
      try {
        const response = await axios.get('http://localhost:3000/v1/passeador');
        setPasseadores(response.data);
      } catch (error) {
        console.error('Erro ao buscar passeadores:', error);
        Alert.alert('Erro', 'Erro ao buscar passeadores.');
      }
    };

    fetchUserName();
    fetchPasseadores();
  }, []);

  // const passeadores = [
  //   { id: '1', nome: 'João', avaliacao: '4.8', distancia: '1.2 km', imagem: require('../../assets/images/cao-login.jpg') },
  //   { id: '2', nome: 'Maria', avaliacao: '4.5', distancia: '2.5 km', imagem: require('../../assets/images/cao-login.jpg') },
  // ];

  const dicas = [
    { id: '1', titulo: 'Treinando seu pet', imagem: require('../../assets/images/cao-login.jpg') },
    { id: '2', titulo: 'Cuidados com a saúde', imagem: require('../../assets/images/cao-login.jpg') },
  ];

  const atividades = [
    { id: '1', tipo: 'Passeio', pet: 'Rex', passeador: 'João', imagem: require('../../assets/images/cao-login.jpg') },
  ];

  const lembretes = [
    { id: '1', tarefa: 'Vacinação', pet: 'Rex', data: '28/02/2025' },
    { id: '2', tarefa: 'Passeio', pet: 'Luna', data: '28/02/2025' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <Image style={styles.profileImage} source={require()} /> */}
        <Text style={styles.userName}>Olá, {userName || '[Nome do Usuário]'}</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>

        {/* Feed de Atividades */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Atividades Recentes</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={atividades}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.atividadeCard}>
                <Image style={styles.atividadeImagem} source={item.imagem} />
                <Text style={styles.atividadeTipo}>{item.tipo}</Text>
                {item.pet && <Text style={styles.atividadeDetalhe}>Pet: {item.pet}</Text>}
                {item.passeador && <Text style={styles.atividadeDetalhe}>Passeador: {item.passeador}</Text>}
                {item.local && <Text style={styles.atividadeDetalhe}>Local: {item.local}</Text>}
              </View>
            )}
          />
        </View> */}
        

         {/* Recomendações de Passeadores */}
         <View style={styles.section}>
          <Text style={styles.sectionTitle}>Passeadores Próximos</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={passeadores}
            keyExtractor={(item) => item.passeadorId.toString()} // Certifique-se de que o id seja uma string
            renderItem={({ item }) => (
              <View style={styles.passeadorCard}>
                <Image style={styles.passeadorImagem} source={require('../../assets/images/cao-login.jpg')} /> 
                <Text style={styles.passeadorNome}>{item.nome}</Text>
                <Text style={styles.passeadorDistancia}>{item.disponibilidade}</Text>
                <Text style={styles.passeadorDistancia}>{item.avaliacao}</Text>
              </View>
            )}
          />
          <TouchableOpacity style={styles.verTodosButton}>
            <Text style={styles.verTodosText}>Ver Todos</Text>
          </TouchableOpacity>
        </View>

    {/* Dicas e Artigos */}
    {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dicas e Artigos</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dicas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.dicaCard}>
                <Image style={styles.dicaImagem} source={item.imagem} />
                <Text style={styles.dicaTitulo}>{item.titulo}</Text>
              </TouchableOpacity>
            )}
          />
        </View> */}
        {/* Widget de Previsão do Tempo
        <View style={styles.weatherWidget}>
          <Ionicons name="partly-sunny-outline" size={32} color="#FF9800" />
          <Text style={styles.weatherTemp}>35°C</Text>
          <Text style={styles.weatherText}>Ensolarado</Text>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

