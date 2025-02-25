import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de instalar: npx expo install @expo/vector-icons

export default function Home() {
  const insets = useSafeAreaInsets();

  // Dados de exemplo
  const passeadores = [
    { id: '1', nome: 'João', avaliacao: '4.8', distancia: '1.2 km', imagem: require('../../assets/images/cao-login.jpg') },
    { id: '2', nome: 'Maria', avaliacao: '4.5', distancia: '2.5 km', imagem: require('../../assets/images/cao-login.jpg') },
  ];

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
        <Text style={styles.userName}>Olá, [Nome do Usuário]</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>

        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Lembretes</Text>
          <FlatList
            data={lembretes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.lembreteItem}>
                <Text style={styles.lembreteTarefa}>{item.tarefa}</Text>
                <Text style={styles.lembreteDetalhe}>Pet: {item.pet}</Text>
                <Text style={styles.lembreteDetalhe}>Data: {item.data}</Text>
              </View>
            )}
          />
        </View>
        {/* Feed de Atividades */}
        <View style={styles.section}>
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
        </View>

      {/* Recomendações de Passeadores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Passeadores Próximos</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={passeadores}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.passeadorCard}>
                <Image style={styles.passeadorImagem} source={item.imagem} />
                <Text style={styles.passeadorNome}>{item.nome}</Text>
                <Text style={styles.passeadorAvaliacao}>Avaliação: {item.avaliacao}</Text>
                <Text style={styles.passeadorDistancia}>{item.distancia}</Text>
              </View>
            )}
          />
          <TouchableOpacity style={styles.verTodosButton}>
            <Text style={styles.verTodosText}>Ver Todos</Text>
          </TouchableOpacity>
        </View>
    {/* Dicas e Artigos */}
    <View style={styles.section}>
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
        </View>
        {/* Widget de Previsão do Tempo */}
        <View style={styles.weatherWidget}>
          <Ionicons name="partly-sunny-outline" size={32} color="#FF9800" />
          <Text style={styles.weatherTemp}>35°C</Text>
          <Text style={styles.weatherText}>Ensolarado</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
  },
  notificationIcon: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cardButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  passeadorCard: {
    marginRight: 10,
    alignItems: 'center',
  },
  passeadorImagem: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  passeadorNome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  passeadorAvaliacao: {
    fontSize: 14,
    color: 'gray',
  },
  passeadorDistancia: {
    fontSize: 14,
    color: 'gray',
  },
  verTodosButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  verTodosText: {
    color: '#007AFF',
  },
  weatherWidget: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  weatherTemp: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  weatherText: {
    fontSize: 16,
    color: 'gray',
  },
  atividadeCard: {
    marginRight: 10,
    alignItems: 'center',
  },
  atividadeImagem: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  atividadeTipo: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  atividadeDetalhe: {
    fontSize: 12,
    color: 'gray',
  },
  dicaCard: {
    marginRight: 10,
    alignItems: 'center',
  },
  dicaImagem: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  dicaTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  widget: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lembreteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  lembreteTarefa: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lembreteDetalhe: {
    fontSize: 14,
    color: 'gray',
  },
});