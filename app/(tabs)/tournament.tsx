import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Tournament {
  id: string;
  name: string;
  prize: number;
  participants: number;
  maxParticipants: number;
  entryFee: number;
  timeLeft: string;
  status: 'open' | 'starting' | 'live' | 'finished';
}

export default function TournamentScreen() {
  const insets = useSafeAreaInsets();
  const [tournaments] = useState<Tournament[]>([
    {
      id: '1',
      name: 'Tournoi du Vendredi',
      prize: 50000,
      participants: 847,
      maxParticipants: 1000,
      entryFee: 100,
      timeLeft: '2h 15m',
      status: 'open',
    },
    {
      id: '2',
      name: 'Championship Elite',
      prize: 100000,
      participants: 1500,
      maxParticipants: 2000,
      entryFee: 500,
      timeLeft: '45m',
      status: 'starting',
    },
    {
      id: '3',
      name: 'Tournoi Express',
      prize: 25000,
      participants: 234,
      maxParticipants: 500,
      entryFee: 50,
      timeLeft: 'EN COURS',
      status: 'live',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return '#4CAF50';
      case 'starting': return '#FF9800';
      case 'live': return '#F44336';
      case 'finished': return '#9E9E9E';
      default: return '#4CAF50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'OUVERT';
      case 'starting': return 'DÉMARRE BIENTÔT';
      case 'live': return 'EN COURS';
      case 'finished': return 'TERMINÉ';
      default: return 'OUVERT';
    }
  };

  return (
    <LinearGradient
      colors={['#8BC34A', '#4CAF50', '#2E7D32']}
      style={[styles.container, { paddingTop: Platform.OS === 'ios' ? insets.top : 0 }]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>🏆 TOURNOIS</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="information-circle" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.featuredTournament}>
          <LinearGradient
            colors={['#FFD700', '#FFA000']}
            style={styles.featuredCard}
          >
            <View style={styles.featuredHeader}>
              <Text style={styles.featuredTitle}>GRAND TOURNOI</Text>
              <Text style={styles.featuredSubtitle}>HEBDOMADAIRE</Text>
            </View>
            
            <View style={styles.featuredPrize}>
              <Text style={styles.prizeLabel}>PRIX TOTAL</Text>
              <Text style={styles.prizeAmount}>500,000 🪙</Text>
            </View>
            
            <View style={styles.featuredStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>2,847</Text>
                <Text style={styles.statLabel}>Participants</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>1,000 🪙</Text>
                <Text style={styles.statLabel}>Entrée</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>1j 12h</Text>
                <Text style={styles.statLabel}>Temps restant</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>REJOINDRE</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.tournamentsSection}>
          <Text style={styles.sectionTitle}>Tournois Disponibles</Text>
          
          {tournaments.map((tournament) => (
            <View key={tournament.id} style={styles.tournamentCard}>
              <View style={styles.tournamentHeader}>
                <Text style={styles.tournamentName}>{tournament.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(tournament.status) }]}>
                  <Text style={styles.statusText}>{getStatusText(tournament.status)}</Text>
                </View>
              </View>
              
              <View style={styles.tournamentInfo}>
                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Prix</Text>
                    <Text style={styles.infoValue}>{tournament.prize.toLocaleString()} 🪙</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Entrée</Text>
                    <Text style={styles.infoValue}>{tournament.entryFee} 🪙</Text>
                  </View>
                </View>
                
                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Participants</Text>
                    <Text style={styles.infoValue}>
                      {tournament.participants}/{tournament.maxParticipants}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Temps</Text>
                    <Text style={styles.infoValue}>{tournament.timeLeft}</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  {Math.round((tournament.participants / tournament.maxParticipants) * 100)}% complet
                </Text>
              </View>
              
              <TouchableOpacity 
                style={[
                  styles.tournamentJoinButton,
                  tournament.status === 'live' && styles.disabledButton
                ]}
                disabled={tournament.status === 'live'}
              >
                <Text style={styles.tournamentJoinText}>
                  {tournament.status === 'live' ? 'EN COURS' : 'REJOINDRE'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.leaderboardSection}>
          <Text style={styles.sectionTitle}>Classement Hebdomadaire</Text>
          
          <View style={styles.leaderboardCard}>
            {[1, 2, 3, 4, 5].map((position) => (
              <View key={position} style={styles.leaderboardItem}>
                <View style={styles.positionContainer}>
                  <Text style={styles.positionNumber}>{position}</Text>
                  {position <= 3 && (
                    <Text style={styles.medal}>
                      {position === 1 ? '🥇' : position === 2 ? '🥈' : '🥉'}
                    </Text>
                  )}
                </View>
                
                <Image
                  source={{ 
                    uri: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2&random=${position}` 
                  }}
                  style={styles.playerAvatar}
                />
                
                <View style={styles.playerInfo}>
                  <Text style={styles.playerName}>Joueur {position}</Text>
                  <Text style={styles.playerScore}>{(1000 - position * 150)} points</Text>
                </View>
                
                <Text style={styles.playerPrize}>
                  {position === 1 ? '50,000' : position === 2 ? '25,000' : position === 3 ? '10,000' : '5,000'} 🪙
                </Text>
              </View>
            ))}
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  featuredTournament: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  featuredCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  featuredHeader: {
    alignItems: 'center',
    marginBottom: 15,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  featuredSubtitle: {
    fontSize: 16,
    color: '#2E7D32',
    opacity: 0.8,
  },
  featuredPrize: {
    alignItems: 'center',
    marginBottom: 20,
  },
  prizeLabel: {
    fontSize: 14,
    color: '#2E7D32',
    opacity: 0.8,
  },
  prizeAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  featuredStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statLabel: {
    fontSize: 12,
    color: '#2E7D32',
    opacity: 0.8,
  },
  joinButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tournamentsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  tournamentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  tournamentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  tournamentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tournamentInfo: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  tournamentJoinButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9E9E9E',
  },
  tournamentJoinText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  leaderboardSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  leaderboardCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  positionContainer: {
    width: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  positionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  medal: {
    fontSize: 16,
    marginLeft: 5,
  },
  playerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 15,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  playerScore: {
    fontSize: 14,
    color: '#666',
  },
  playerPrize: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9800',
  },
});