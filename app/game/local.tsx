import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LudoBoard } from '@/components/LudoBoard';
import { GameState, Player } from '@/types/game';

const { width } = Dimensions.get('window');

export default function LocalGameScreen() {
  const insets = useSafeAreaInsets();
  
  const [gameState, setGameState] = useState<GameState>({
    currentPlayer: 0,
    players: [
      { id: 0, color: '#E53E3E', name: 'Rouge', pieces: [0, 0, 0, 0], score: 0 },
      { id: 1, color: '#3182CE', name: 'Bleu', pieces: [0, 0, 0, 0], score: 0 },
      { id: 2, color: '#38A169', name: 'Vert', pieces: [0, 0, 0, 0], score: 0 },
      { id: 3, color: '#D69E2E', name: 'Jaune', pieces: [0, 0, 0, 0], score: 0 },
    ],
    diceValue: 1,
    isRolling: false,
    gameStatus: 'playing',
    pot: 0,
    winner: null,
  });

  const rollDice = () => {
    if (gameState.isRolling) return;

    setGameState(prev => ({ ...prev, isRolling: true }));

    // Animation du dé
    const rollAnimation = setInterval(() => {
      setGameState(prev => ({ 
        ...prev, 
        diceValue: Math.floor(Math.random() * 6) + 1 
      }));
    }, 100);

    setTimeout(() => {
      clearInterval(rollAnimation);
      const finalValue = Math.floor(Math.random() * 6) + 1;
      setGameState(prev => ({ 
        ...prev, 
        diceValue: finalValue, 
        isRolling: false 
      }));
    }, 1000);
  };

  const handlePieceMove = (playerIndex: number, pieceIndex: number, newPosition: number) => {
    if (playerIndex !== gameState.currentPlayer) return;

    setGameState(prev => {
      const newPlayers = [...prev.players];
      newPlayers[playerIndex].pieces[pieceIndex] = newPosition;

      // Vérifier la victoire
      const hasWon = newPlayers[playerIndex].pieces.every(piece => piece === 57);
      if (hasWon) {
        Alert.alert('Victoire!', `${newPlayers[playerIndex].name} a gagné!`);
        return {
          ...prev,
          players: newPlayers,
          gameStatus: 'finished',
          winner: newPlayers[playerIndex],
        };
      }

      // Passer au joueur suivant
      const nextPlayer = (prev.currentPlayer + 1) % 4;

      return {
        ...prev,
        players: newPlayers,
        currentPlayer: nextPlayer,
      };
    });
  };

  const handleBack = () => {
    Alert.alert(
      'Quitter la partie',
      'Êtes-vous sûr de vouloir quitter la partie en cours ?',
      [
        { text: 'Continuer', style: 'cancel' },
        { text: 'Quitter', style: 'destructive', onPress: () => router.back() },
      ]
    );
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
        <Text style={styles.title}>🎮 Multijoueur Local</Text>
        <View style={styles.headerRight}>
          <Text style={styles.turnIndicator}>
            Tour: {gameState.players[gameState.currentPlayer].name}
          </Text>
        </View>
      </View>

      <View style={styles.gameContainer}>
        <LudoBoard gameState={gameState} onPieceMove={handlePieceMove} />
        
        <View style={styles.gameControls}>
          <View style={styles.diceContainer}>
            <TouchableOpacity
              style={[styles.diceButton, gameState.isRolling && styles.diceRolling]}
              onPress={rollDice}
              disabled={gameState.isRolling}
            >
              <Text style={styles.diceValue}>{gameState.diceValue}</Text>
            </TouchableOpacity>
            <Text style={styles.diceLabel}>
              {gameState.isRolling ? 'Lancement...' : 'Lancer le dé'}
            </Text>
          </View>

          <View style={styles.playersInfo}>
            {gameState.players.map((player, index) => (
              <View
                key={player.id}
                style={[
                  styles.playerCard,
                  { borderColor: player.color },
                  index === gameState.currentPlayer && styles.activePlayer,
                ]}
              >
                <View style={[styles.playerColor, { backgroundColor: player.color }]} />
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.playerPieces}>
                  Pions: {player.pieces.filter(p => p > 0).length}/4
                </Text>
              </View>
            ))}
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
    alignItems: 'flex-end',
  },
  turnIndicator: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  gameContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  gameControls: {
    marginTop: 20,
    marginBottom: 20,
  },
  diceContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  diceButton: {
    width: 80,
    height: 80,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 10,
  },
  diceRolling: {
    transform: [{ rotate: '45deg' }],
  },
  diceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  diceLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  playersInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  playerCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activePlayer: {
    borderColor: '#FFD700',
    backgroundColor: '#fff',
  },
  playerColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: 8,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  playerPieces: {
    fontSize: 12,
    color: '#666',
  },
});