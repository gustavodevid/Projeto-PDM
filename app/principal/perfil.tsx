import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de instalar: npx expo install @expo/vector-icons
import { useRouter, useFocusEffect } from 'expo-router';

export default function Perfil() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleEditarPerfil = () => {
    router.push('/configuracoes/editarPerfil');
  };
  // Dados de exemplo (substitua pelos seus dados reais)
  const pets = [
    { id: '1', nome: 'Rex', imagem: require('../../assets/images/cao-login.jpg') },
    { id: '2', nome: 'Luna', imagem: require('../../assets/images/cao-login.jpg') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileHeader}>
          <Image style={styles.profileImage} source={require('../../assets/images/cao-login.jpg')} />
          <Text style={styles.profileName}>[Nome do Usuário]</Text>
          <Text style={styles.profileEmail}>[email@exemplo.com]</Text>
          <Text style={styles.profileInfo}>Número de Pets: {pets.length}</Text>
          <Text style={styles.profileInfo}>[Número de Telefone]</Text>
          <Text style={styles.profileInfo}>[Endereço]</Text>
          <Text style={styles.profileBio}>[Biografia do Usuário]</Text>
        </View>

        <View style={styles.profileContent}>
          <TouchableOpacity style={styles.profileOption} onPress={handleEditarPerfil}>
            <Ionicons name="person-outline" size={24} color="#007AFF" style={styles.optionIcon} />
            <Text style={styles.profileOptionText}>Editar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileOption}>
            <Ionicons name="settings-outline" size={24} color="#007AFF" style={styles.optionIcon} />
            <Text style={styles.profileOptionText}>Configurações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileOption}>
            <Ionicons name="paw-outline" size={24} color="#007AFF" style={styles.optionIcon} />
            <Text style={styles.profileOptionText}>Gerenciar Pets</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileOption}>
            <Ionicons name="time-outline" size={24} color="#007AFF" style={styles.optionIcon} />
            <Text style={styles.profileOptionText}>Histórico de Passeios</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileOption}>
            <Ionicons name="card-outline" size={24} color="#007AFF" style={styles.optionIcon} />
            <Text style={styles.profileOptionText}>Métodos de Pagamento</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileOption}>
            <Ionicons name="log-out-outline" size={24} color="#FF6347" style={styles.optionIcon} />
            <Text style={styles.profileOptionText}>Sair</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.petsSection}>
          <Text style={styles.petsTitle}>Meus Pets</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={pets}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.petCard}>
                <Image style={styles.petImage} source={item.imagem} />
                <Text style={styles.petNome}>{item.nome}</Text>
              </View>
            )}
          />
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
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  profileInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  profileBio: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  profileContent: {
    padding: 20,
  },
  profileOption: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileOptionText: {
    fontSize: 18,
    marginLeft: 10,
  },
  optionIcon: {
    width: 24,
  },
  petsSection: {
    padding: 20,
  },
  petsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  petCard: {
    marginRight: 10,
    alignItems: 'center',
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  petNome: {
    fontSize: 14,
  },
});