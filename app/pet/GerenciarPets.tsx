import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CadastroPet from './CadastroPet'; 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GerenciarPets() {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('userId');
    
      if (!userId) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
      }
      const response = await axios.get(`http://localhost:3000/v1/pet/tutor/${userId}`);
      setPets(response.data);
    } catch (error) {
      console.error('Erro ao buscar pets:', error);
      Alert.alert('Erro', 'Erro ao buscar pets. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handlePetCadastrado = () => {
    setModalVisible(false);
    fetchPets(); 
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando pets...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.petsHeader}>
          <Text style={styles.petsTitle}>Meus Pets</Text>
          <TouchableOpacity style={styles.addPetButton} onPress={() => setModalVisible(true)}>
            <Ionicons name="add-circle-outline" size={32} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={pets}
          keyExtractor={(item) => item.petId}
          renderItem={({ item }) => (
            <View style={styles.petCard}>
              <Image style={styles.petImage} source={item.imagem || require('../../assets/images/cao-login.jpg')} />
              <Text style={styles.petNome}>{item.nome}</Text>
            </View>
          )}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <CadastroPet onPetCadastrado={handlePetCadastrado} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  petsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  petsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addPetButton: {
    padding: 10,
  },
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  petNome: {
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});