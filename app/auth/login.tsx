import React, { useState } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './login.styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${config.API_URL}/login/tutor`, {
                email,
                senha,
            });

            if (response.data.token) {
                const { token, userName, userEmail, userId } = response.data;
                await storeData('token', token);
                await storeData('userName', userName);
                await storeData('userEmail', userEmail);
                await storeData('userId', userId);
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
        } catch (error) {
            console.error(`Erro ao armazenar dados: ${key}`, error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <View style={styles.imageContainer}>
                    <Image style={styles.logo} source={require('../../assets/images/cao-login.jpg')} />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Au-Au! (Olá)</Text>
                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons name="email-outline" size={24} color="#888" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons name="lock-outline" size={24} color="#888" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry
                            autoCapitalize="none"
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/auth/cadastro')}>
                        <Text style={styles.signupLink}>Crie sua conta</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}