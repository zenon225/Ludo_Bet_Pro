import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PrivateGameScreen() {
  const insets = useSafeAreaInsets();
  const [roomCode, setRoomCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
    return code;
  };

  const handleCreateRoom = () => {
    setIsCreating(true);
    const code = generateRoomCode();
    
    setTimeout(() => {
      setIsCreating(false);
      Alert.alert(
        'Salon créé!',
        `Code du salon: ${code}\nPartagez ce code avec vos amis pour qu'ils puissent rejoindre la partie.`,
        [
          { text: 'Copier le code', onPress: () => {} },
          { text: 'Commencer', onPress: () => {} },
        ]
      );
    }, 1500);
  };

  const handleJoinRoom = () => {
    if (!roomCode.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un code de salon valide.');
      return;
    }

    Alert.alert(
      'Rejoindre le salon',
      `Tentative de connexion au salon: ${roomCode}`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Rejoindre', onPress: () => {} },
      ]
    );
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <LinearGradient
      colors={['#8BC34A', '#4CAF50', '#2E7D32']}
      style={[styles.container, { paddingTop: Platform.OS === 'ios' ? insets.top : 0 }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>🔒 Partie Privée</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <Text style={styles.logoIcon}>🎮</Text>
            <Text style={styles.logoText}>SALON PRIVÉ</Text>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          <View style={styles.optionCard}>
            <Text style={styles.optionTitle}>Créer un salon</Text>
            <Text style={styles.optionDescription}>
              Créez un salon privé et invitez vos amis avec un code unique
            </Text>
            
            <TouchableOpacity
              style={[styles.actionButton, styles.createButton]}
              onPress={handleCreateRoom}
              disabled={isCreating}
            >
              <Ionicons name="add-circle" size={24} color="#fff" />
              <Text style={styles.actionButtonText}>
                {isCreating ? 'Création...' : 'Créer un salon'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OU</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.optionCard}>
            <Text style={styles.optionTitle}>Rejoindre un salon</Text>
            <Text style={styles.optionDescription}>
              Entrez le code du salon pour rejoindre une partie privée
            </Text>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.codeInput}
                value={roomCode}
                onChangeText={setRoomCode}
                placeholder="Entrez le code du salon"
                placeholderTextColor="#999"
                autoCapitalize="characters"
                maxLength={6}
              />
            </View>
            
            <TouchableOpacity
              style={[styles.actionButton, styles.joinButton]}
              onPress={handleJoinRoom}
            >
              <Ionicons name="enter" size={24} color="#fff" />
              <Text style={styles.actionButtonText}>Rejoindre le salon</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>ℹ️ Comment ça marche ?</Text>
          <View style={styles.infoList}>
            <Text style={styles.infoItem}>• Créez un salon et partagez le code avec vos amis</Text>
            <Text style={styles.infoItem}>• Jusqu'à 4 joueurs peuvent rejoindre un salon</Text>
            <Text style={styles.infoItem}>• Le créateur du salon peut configurer les paris</Text>
            <Text style={styles.infoItem}>• La partie commence quand tous les joueurs sont prêts</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  codeInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
    color: '#2E7D32',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  createButton: {
    backgroundColor: '#4CAF50',
  },
  joinButton: {
    backgroundColor: '#2196F3',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
  infoSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  infoList: {
    marginLeft: 10,
  },
  infoItem: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
});