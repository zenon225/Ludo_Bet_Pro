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

export default function OnlineGameScreen() {
  const insets = useSafeAreaInsets();
  const [selectedMode, setSelectedMode] = useState<string>('quick');
  const [betAmount, setBetAmount] = useState<number>(100);

  const gameModes = [
    { 
      id: 'quick', 
      name: 'Partie Rapide', 
      description: 'Rejoindre une partie immédiatement',
      icon: '⚡',
      color: '#4CAF50' 
    },
    { 
      id: 'ranked', 
      name: 'Partie Classée', 
      description: 'Jouer pour votre classement',
      icon: '🏆',
      color: '#FF9800' 
    },
    { 
      id: 'tournament', 
      name: 'Mini Tournoi', 
      description: 'Tournoi rapide 8 joueurs',
      icon: '👑',
      color: '#9C27B0' 
    },
  ];

  const betAmounts = [50, 100, 250, 500, 1000];

  const handleStartGame = () => {
    const mode = gameModes.find(m => m.id === selectedMode);
    Alert.alert(
      'Recherche de partie',
      `Mode: ${mode?.name}\nMise: ${betAmount} 🪙\n\nRecherche d'adversaires...`,
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Continuer', 
          onPress: () => {
            // Simulation de recherche
            setTimeout(() => {
              router.push('/game/ludo');
            }, 2000);
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
        <Text style={styles.title}>🌐 Multijoueur En Ligne</Text>
        <View style={styles.headerRight}>
          <View style={styles.onlineIndicator}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>2,847 en ligne</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <Text style={styles.logoIcon}>🌐</Text>
            <Text style={styles.logoText}>JOUER EN LIGNE</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mode de jeu</Text>
          <View style={styles.modeContainer}>
            {gameModes.map((mode) => (
              <TouchableOpacity
                key={mode.id}
                style={[
                  styles.modeCard,
                  { borderColor: mode.color },
                  selectedMode === mode.id && { backgroundColor: mode.color + '20' },
                ]}
                onPress={() => setSelectedMode(mode.id)}
              >
                <Text style={styles.modeIcon}>{mode.icon}</Text>
                <Text style={[styles.modeName, { color: mode.color }]}>
                  {mode.name}
                </Text>
                <Text style={styles.modeDescription}>
                  {mode.description}
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

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistiques en temps réel</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>2,847</Text>
              <Text style={styles.statLabel}>Joueurs en ligne</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>Parties en cours</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>~30s</Text>
              <Text style={styles.statLabel}>Temps d'attente</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>ℹ️ Avantages du multijoueur</Text>
          <View style={styles.infoList}>
            <Text style={styles.infoItem}>• Jouez contre de vrais joueurs du monde entier</Text>
            <Text style={styles.infoItem}>• Gagnez des points de classement</Text>
            <Text style={styles.infoItem}>• Chat en temps réel avec les adversaires</Text>
            <Text style={styles.infoItem}>• Récompenses quotidiennes et hebdomadaires</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
          <Text style={styles.startButtonText}>RECHERCHER UNE PARTIE</Text>
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  onlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    marginRight: 8,
  },
  onlineText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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
  modeContainer: {
    gap: 10,
  },
  modeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  modeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    flex: 1,
  },
  modeDescription: {
    fontSize: 12,
    color: '#666',
    flex: 2,
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
  statsSection: {
    marginBottom: 25,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.8,
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