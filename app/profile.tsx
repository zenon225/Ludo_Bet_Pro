import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface GameHistory {
  id: string;
  date: string;
  result: 'win' | 'loss';
  earnings: number;
  players: string[];
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const [user] = useState({
    name: 'Joueur Pro',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    level: 12,
    totalGames: 247,
    wins: 156,
    totalEarnings: 12450,
    currentStreak: 7,
  });

  const [gameHistory] = useState<GameHistory[]>([
    {
      id: '1',
      date: '2025-01-09',
      result: 'win',
      earnings: 850,
      players: ['Rouge', 'Bleu', 'Vert', 'Jaune'],
    },
    {
      id: '2',
      date: '2025-01-08',
      result: 'win',
      earnings: 420,
      players: ['Rouge', 'Bleu', 'Vert'],
    },
    {
      id: '3',
      date: '2025-01-07',
      result: 'loss',
      earnings: -300,
      players: ['Rouge', 'Bleu', 'Vert', 'Jaune'],
    },
    {
      id: '4',
      date: '2025-01-06',
      result: 'win',
      earnings: 680,
      players: ['Rouge', 'Bleu', 'Vert', 'Jaune'],
    },
  ]);

  const winRate = Math.round((user.wins / user.totalGames) * 100);

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnexion', style: 'destructive', onPress: () => {} },
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>👤 Profil</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{user.level}</Text>
            </View>
          </View>
          
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userStats}>
            {user.totalGames} parties • {user.wins} victoires
          </Text>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{winRate}%</Text>
              <Text style={styles.statLabel}>Taux de victoire</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{user.totalEarnings}€</Text>
              <Text style={styles.statLabel}>Gains totaux</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{user.currentStreak}</Text>
              <Text style={styles.statLabel}>Série actuelle</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Réalisations</Text>
          
          <View style={styles.achievementsGrid}>
            <View style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>🎯</Text>
              <Text style={styles.achievementTitle}>Première victoire</Text>
              <Text style={styles.achievementDescription}>Gagner votre première partie</Text>
            </View>
            
            <View style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>🔥</Text>
              <Text style={styles.achievementTitle}>Série de 5</Text>
              <Text style={styles.achievementDescription}>Gagner 5 parties d'affilée</Text>
            </View>
            
            <View style={[styles.achievementCard, styles.lockedAchievement]}>
              <Text style={styles.achievementIcon}>💎</Text>
              <Text style={styles.achievementTitle}>Maître du Ludo</Text>
              <Text style={styles.achievementDescription}>Gagner 100 parties</Text>
            </View>
            
            <View style={[styles.achievementCard, styles.lockedAchievement]}>
              <Text style={styles.achievementIcon}>👑</Text>
              <Text style={styles.achievementTitle}>Roi des paris</Text>
              <Text style={styles.achievementDescription}>Gagner 10,000€ en paris</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📈 Historique des parties</Text>
          
          {gameHistory.map((game) => (
            <View key={game.id} style={styles.historyCard}>
              <View style={styles.historyHeader}>
                <View style={styles.historyDate}>
                  <Ionicons name="calendar" size={16} color="#999" />
                  <Text style={styles.historyDateText}>{game.date}</Text>
                </View>
                <View style={[
                  styles.historyResult,
                  game.result === 'win' ? styles.winResult : styles.lossResult,
                ]}>
                  <Text style={styles.historyResultText}>
                    {game.result === 'win' ? 'Victoire' : 'Défaite'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.historyDetails}>
                <Text style={styles.historyPlayers}>
                  {game.players.join(' • ')}
                </Text>
                <Text style={[
                  styles.historyEarnings,
                  game.earnings >= 0 ? styles.positiveEarnings : styles.negativeEarnings,
                ]}>
                  {game.earnings >= 0 ? '+' : ''}{game.earnings}€
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Paramètres</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications" size={20} color="#fff" />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="volume-high" size={20} color="#fff" />
              <Text style={styles.settingText}>Sons</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="help-circle" size={20} color="#fff" />
              <Text style={styles.settingText}>Aide</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="shield-checkmark" size={20} color="#fff" />
              <Text style={styles.settingText}>Confidentialité</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#4F46E5',
  },
  levelBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFD700',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    color: '#1a1a1a',
    fontSize: 12,
    fontWeight: 'bold',
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userStats: {
    color: '#999',
    fontSize: 14,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  lockedAchievement: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementDescription: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
  },
  historyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyDateText: {
    color: '#999',
    fontSize: 14,
    marginLeft: 8,
  },
  historyResult: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  winResult: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
  },
  lossResult: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
  },
  historyResultText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  historyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyPlayers: {
    color: '#fff',
    fontSize: 14,
  },
  historyEarnings: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  positiveEarnings: {
    color: '#22C55E',
  },
  negativeEarnings: {
    color: '#EF4444',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
  },
});