import { StyleSheet, Dimensions } from 'react-native';

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
      textAlign: 'center',
      paddingHorizontal: 20,
      marginTop: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    input: {
        height: 60,
        width:'100%',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2, 
    },
    logo: {
        width: '100%',
        height: Dimensions.get('window').height / 2,
      },
    button: {
      backgroundColor: '#007AFF',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 10,
      width: '100%',
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
    forgotPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
      },
    forgotPassword: {
        color: '#007AFF',
        fontSize: 16,
        alignSelf: 'flex-end',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
      signupLink: {
        marginTop: 20,
        textAlign: 'center',
        color: '#007AFF', // Cor do botão
        fontSize: 18,
        textDecorationLine: 'none', // Sublinhado
      },
    });

export default styles;