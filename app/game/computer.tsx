import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ComputerGameScreen() {
  const insets = useSafeAreaInsets();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('medium');
  const [betAmount, setBetAmount] = useState<number>(100);

  const difficulties = [
    { id: 'easy', name: 'Facile', description: 'IA débutante', color: '#4CAF50' },
    { id: 'medium', name: 'Moyen', description: 'IA équilibrée', color: '#FF9800' },
    { id: 'hard', name: 'Difficile', description: 'IA experte', color: '#F44336' },
  ];

  const betAmounts = [50, 100, 250, 500, 1000];

  const handleStartGame = () => {
    Alert.alert(
      'Commencer la partie',
      `Difficulté: ${difficulties.find(d => d.id === selectedDifficulty)?.name}\nMise: ${betAmount} 🪙`,
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Jouer', 
          onPress: () => {
            router.push('/game/ludo');
          }
        },
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
        <Text style={styles.title}>🤖 VS Ordinateur</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <Text style={styles.logoIcon}>🤖</Text>
            <Text style={styles.logoText}>JOUER CONTRE L'IA</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choisir la difficulté</Text>
          <View style={styles.difficultyContainer}>
            {difficulties.map((difficulty) => (
              <TouchableOpacity
                key={difficulty.id}
                style={[
                  styles.difficultyCard,
                  { borderColor: difficulty.color },
                  selectedDifficulty === difficulty.id && { backgroundColor: difficulty.color + '20' },
                ]}
                onPress={() => setSelectedDifficulty(difficulty.id)}
              >
                <Text style={[styles.difficultyName, { color: difficulty.color }]}>
                  {difficulty.name}
                </Text>
                <Text style={styles.difficultyDescription}>
                  {difficulty.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mise de départ</Text>
          <View style={styles.betContainer}>
            {betAmounts.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.betButton,
                  betAmount === amount && styles.selectedBet,
                ]}
                onPress={() => setBetAmount(amount)}
              >
                <Text style={[
                  styles.betText,
                  betAmount === amount && styles.selectedBetText,
                ]}>
                  {amount} 🪙
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>ℹ️ Règles du mode</Text>
          <View style={styles.infoList}>
            <Text style={styles.infoItem}>• Jouez contre 3 IA de difficulté choisie</Text>
            <Text style={styles.infoItem}>• Gagnez 3x votre mise en cas de victoire</Text>
            <Text style={styles.infoItem}>• L'IA s'adapte à votre niveau de jeu</Text>
            <Text style={styles.infoItem}>• Progression sauvegardée automatiquement</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
          <Text style={styles.startButtonText}>COMMENCER LA PARTIE</Text>
        </TouchableOpacity>
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
    marginBottom: 30,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  difficultyContainer: {
    gap: 10,
  },
  difficultyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
  },
  difficultyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  difficultyDescription: {
    fontSize: 14,
    color: '#666',
  },
  betContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  betButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedBet: {
    backgroundColor: '#FFD700',
    borderColor: '#FFA000',
  },
  betText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  selectedBetText: {
    color: '#2E7D32',
  },
  infoSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
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
  startButton: {
    backgroundColor: '#FFD700',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonText: {
    color: '#2E7D32',
    fontSize: 18,
    fontWeight: 'bold',
  },
});