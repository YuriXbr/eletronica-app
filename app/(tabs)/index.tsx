import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Platform, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [appStatus, setAppStatus] = useState('Funcionando no Android!');
  const navigation = useNavigation<any>();

  const handleNavigateToFormulas = () => {
    try {
      navigation.navigate('formulas');
    } catch (error) {
      Alert.alert('Erro de navegação', 'Não foi possível navegar para fórmulas');
    }
  };

  const handleNavigateToResistor = () => {
    try {
      navigation.navigate('resistor');
    } catch (error) {
      Alert.alert('Erro de navegação', 'Não foi possível navegar para calculadora');
    }
  };

  const testPlatformDetection = () => {
    Alert.alert(
      'Informações da Plataforma',
      `Plataforma: ${Platform.OS}\nVersão: ${Platform.Version}\nTeste: ${appStatus}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header simples */}
        <View style={styles.header}>
          <Text style={styles.title}>⚡ Eletrônica App</Text>
          <Text style={styles.subtitle}>Funcionando no {Platform.OS}!</Text>
        </View>

        {/* Status do app */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>📱 Status do App</Text>
          <Text style={styles.statusText}>{appStatus}</Text>
          <TouchableOpacity style={styles.testButton} onPress={testPlatformDetection}>
            <Text style={styles.buttonText}>🔍 Testar Plataforma</Text>
          </TouchableOpacity>
        </View>

        {/* Menu principal */}
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>📚 Menu Principal</Text>
          
          <TouchableOpacity style={styles.menuButton} onPress={handleNavigateToFormulas}>
            <Text style={styles.menuButtonText}>📖 Disciplinas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton} onPress={handleNavigateToResistor}>
            <Text style={styles.menuButtonText}>🔧 Calculadora de Resistores</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuButton, styles.disabledButton]} 
            onPress={() => Alert.alert('Em desenvolvimento', 'Esta funcionalidade será adicionada em breve!')}
          >
            <Text style={styles.menuButtonText}>🌈 Controle RGB (Em breve)</Text>
          </TouchableOpacity>
        </View>

        {/* Informações de debug */}
        <View style={styles.debugSection}>
          <Text style={styles.debugTitle}>🔧 Debug Info</Text>
          <Text style={styles.debugText}>Plataforma: {Platform.OS}</Text>
          <Text style={styles.debugText}>Versão: {Platform.Version}</Text>
          <Text style={styles.debugText}>Status: App carregou com sucesso</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>✅ App funcionando corretamente no Android</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    backgroundColor: '#873939',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#d8cc39',
  },
  statusCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  testButton: {
    backgroundColor: '#d8cc39',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  menuSection: {
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  menuButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#f0f0f0',
  },
  menuButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  debugSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  debugText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  footer: {
    backgroundColor: '#d4edda',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c3e6cb',
  },
  footerText: {
    color: '#155724',
    fontWeight: '600',
  },
});
