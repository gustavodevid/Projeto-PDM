import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
      width: '100%',
      height: 700,
      borderRadius: 10,
      padding: 10
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
  markerWrapper: {
    alignItems: 'center',
    width: 30,
    height: 40, 
    position: 'relative',
    paddingBottom: 10, 
  },
  markerContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#4CAF50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0, 
    left: 3,
  },
  userMarkerContainer: {
    borderColor: '#2196F3',
    borderWidth: 3,
    shadowColor: '#2196F3',
    shadowOpacity: 0.4,
  },
  markerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  markerPointer: {
    width: 14,
    height: 14,
    backgroundColor: '#4CAF50',
    borderRadius: 3,
    transform: [{ rotate: '45deg' }],
    borderWidth: 3,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    position: 'absolute',
    bottom: 5, 
    left: 18, 
  },
  userMarkerPointer: {
    backgroundColor: '#2196F3',
    shadowColor: '#2196F3',
    shadowOpacity: 0.4,
  },
  userMarkerWrapper: {
    zIndex: 10,
  },
  fallbackImageContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  fallbackText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  selectedMarkerContainer: {
    borderColor: '#FF9800',
    borderWidth: 3,
    transform: [{ scale: 1.1 }],
    shadowColor: '#FF9800',
    shadowOpacity: 0.6,
  },
  selectedMarkerPointer: {
    backgroundColor: '#FF9800',
    shadowColor: '#FF9800',
  },
  statusIndicator: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
    bottom: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    zIndex: 10,
  },
  markerLabel: {
    position: 'absolute',
    top: -25,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerLabelText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  animatedMarker: {
    transform: [{ scale: 1 }],
  },
});

  export default styles;