import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Alert,
    Modal,
    TextInput,
    Platform
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import config from '../../config';
import customMap from '../../assets/maps/customMap.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Passeador {
    passeadorId: number;
    nome: string;
    latitude: string;
    longitude: string;
}

interface Pet {
  petId: number;
  nome: string;
  raca: string;
}

interface Servico {
  passeadorId: number;
  petId: number;
  tutorId: string;
  data: string; // Formato: "AAAA-MM-DD"
  horario: string; // Formato: "HH:MM"
}

export default function Passeios() {
    const insets = useSafeAreaInsets();
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [passeadores, setPasseadores] = useState<Passeador[]>([]);
    const [pets, setPets] = useState<Pet[]>([]);
    const [selectedPasseador, setSelectedPasseador] = useState<Passeador | null>(null);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null); 
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [showPetModal, setShowPetModal] = useState<boolean>(false);

    useEffect(() => {
        const fetchPasseadores = async () => {
            try {
                const response = await axios.get<Passeador[]>(`${config.API_URL}/passeador`);
                setPasseadores(response.data);
            } catch (error) {
                console.error('Erro ao buscar passeadores:', error);
                Alert.alert('Erro', 'Erro ao buscar passeadores.');
            }
        };

        fetchPasseadores();
    }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permissão para acessar a localização foi negada');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const handleMarkerPress = (passeador: Passeador) => {
        setSelectedPasseador(passeador);
    };

    const handleProporPasseio = async () => {
      if (selectedPasseador && selectedPet) {
        try {
            const userId = await AsyncStorage.getItem('userId'); 
            
            if (!userId) {
                Alert.alert('Erro', 'Usuário não autenticado.');
                return;
            }

            const servico: Servico = {
                passeadorId: selectedPasseador.passeadorId,
                petId: selectedPet.petId,
                tutorId: userId, 
                data: selectedDate,
                horario: selectedTime,
            };
            
            Alert.alert(
                'Propor Passeio',
                `Deseja propor um passeio para ${selectedPet.nome} com ${selectedPasseador.nome}?`,
                [
                    { text: 'Cancelar', style: 'cancel' },
                    {
                        text: 'Sim',
                        onPress: () =>
                            cadastrarServicoPasseio(servico, () => {
                                setSelectedPasseador(null);
                            }),
                    },
                ]
            );
            setSelectedPasseador(null);
        } catch (error) {
            console.error('Erro ao buscar userId:', error);
            Alert.alert('Erro', 'Erro ao buscar informações do usuário.');
        }
    }
    };
  
    const cadastrarServicoPasseio = async (servico: Servico, onServicoCadastrado: () => void) => {
      if (!servico.passeadorId || !servico.tutorId || !servico.petId || !servico.data || !servico.horario) {
        Alert.alert('Erro', 'Preencha todos os campos.');
        return;
      }
      
      try {
        const response = await axios.post(`${config.API_URL}/servico`, servico);
    
        console.log('Serviço de passeio cadastrado com sucesso:', response.data);
        Alert.alert('Sucesso', 'Serviço de passeio cadastrado com sucesso!');
        onServicoCadastrado(); 
      } catch (error) {
        console.error('Erro ao cadastrar serviço de passeio:', error);
        Alert.alert('Erro', 'Erro ao cadastrar serviço de passeio. Tente novamente.');
      }
    };

    const fetchPets = async () => {
      try {
        setLoading(true);
        const userId = await AsyncStorage.getItem('userId');
      
        if (!userId) {
          Alert.alert('Erro', 'Usuário não autenticado.');
          return;
        }
        const response = await axios.get(`${config.API_URL}/pet/tutor/${userId}`);
        setPets(response.data);
      } catch (error) {
        console.error('Erro ao buscar pets:', error);
        Alert.alert('Erro', 'Erro ao buscar pets. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                <Text style={styles.title}>Buscar Passeio</Text>

                {location && (
                    <MapView
                        style={styles.map}
                        customMapStyle={customMap}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker coordinate={location.coords} title="Minha Localização" />
                        {passeadores.map((passeador) => (
                            <Marker
                                key={passeador.passeadorId}
                                coordinate={{
                                    latitude: parseFloat(passeador.latitude),
                                    longitude: parseFloat(passeador.longitude),
                                }}
                                title={passeador.nome}
                                onPress={() => handleMarkerPress(passeador)}
                            />
                        ))}
                    </MapView>
                )}
            </ScrollView>
            <Modal visible={selectedPasseador !== null} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedPasseador && (
                            <>
                                <Text style={styles.modalTitle}>{selectedPasseador.nome}</Text>

                                <TouchableOpacity style={styles.input} onPress={() => {
                                    setShowPetModal(true);
                                    fetchPets();
                                }}>
                                    <Text>{selectedPet ? selectedPet.nome : 'Selecione o Pet'}</Text>
                                </TouchableOpacity>

                                <TextInput
                                    style={styles.input}
                                    placeholder="Horário (HH:MM)"
                                    value={selectedTime}
                                    onChangeText={setSelectedTime}
                                />

                                <TextInput
                                    style={styles.input}
                                    placeholder="Data (AAAA-MM-DD)"
                                    value={selectedDate}
                                    onChangeText={setSelectedDate}
                                />

                                <TouchableOpacity style={styles.modalButton} onPress={handleProporPasseio}>
                                    <Text style={styles.modalButtonText}>Propor Passeio</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setSelectedPasseador(null)}>
                                    <Text style={styles.modalCloseButtonText}>Fechar</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            <Modal visible={showPetModal} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setShowPetModal(false)}>
                        <Text style={styles.closeButtonText}>Fechar</Text>
                    </TouchableOpacity>
                        {pets.map((pet) => (
                            <TouchableOpacity key={pet.petId} style={styles.petItem} onPress={() => {
                                setSelectedPet(pet);
                                setShowPetModal(false);
                            }}>
                                <Text>{pet.nome}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  petImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  passeioCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  passeioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  passeioText: {
    fontSize: 16,
    marginBottom: 5,
  },
  passeioButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  passeioButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  map: {
    width: Dimensions.get('window').width - 40,
    height: 700,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
},
modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
},
modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
},
modalButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
},
modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
},
modalCloseButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
},
modalCloseButtonText: {
    fontWeight: 'bold',
},
input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
},
petItem: {
  padding: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},
closeButton: {
  alignSelf: 'flex-end',
  padding: 10,
},
closeButtonText: {
  color: 'blue',
  fontWeight: 'bold',
},
});