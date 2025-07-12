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

export default function LudoGameScreen() {
  const insets = useSafeAreaInsets();
  
  const [gameState, setGameState] = useState<GameState>({
    currentPlayer: 0,
    players: [
      { id: 0, color: '#E53E3E', name: 'Vous', pieces: [0, 0, 0, 0], score: 0 },
      { id: 1, color: '#3182CE', name: 'Bleu', pieces: [0, 0, 0, 0], score: 0 },
      { id: 2, color: '#38A169', name: 'Vert', pieces: [0, 0, 0, 0], score: 0 },
      { id: 3, color: '#D69E2E', name: 'Jaune', pieces: [0, 0, 0, 0], score: 0 },
    ],
    diceValue: 1,
    isRolling: false,
    gameStatus: 'playing',
    pot: 400, // 4 joueurs x 100 de mise
    winner: null,
  });

  const [gameTimer, setGameTimer] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setGameTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const rollDice = () => {
    if (gameState.isRolling || gameState.currentPlayer !== 0) return;

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
        const winnings = prev.pot * 0.7; // 70% du pot pour le gagnant
        Alert.alert(
          'Victoire!', 
          `${newPlayers[playerIndex].name} a gagné!\nGains: ${winnings} 🪙`,
          [
            { text: 'Nouvelle partie', onPress: () => router.back() },
            { text: 'Quitter', onPress: () => router.push('/(tabs)') },
          ]
        );
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

  const handleQuitGame = () => {
    Alert.alert(
      'Quitter la partie',
      'Êtes-vous sûr de vouloir abandonner ? Vous perdrez votre mise.',
      [
        { text: 'Continuer', style: 'cancel' },
        { text: 'Abandonner', style: 'destructive', onPress: () => router.back() },
      ]
    );
  };

  const handleChatPress = () => {
    router.push('/chat');
  };

  return (
    <LinearGradient
      colors={['#8BC34A', '#4CAF50', '#2E7D32']}
      style={[styles.container, { paddingTop: Platform.OS === 'ios' ? insets.top : 0 }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleQuitGame} style={styles.quitButton}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.gameInfo}>
          <Text style={styles.gameTitle}>LUDO BET PRO</Text>
          <Text style={styles.gameTimer}>{formatTime(gameTimer)}</Text>
        </View>
        
        <TouchableOpacity onPress={handleChatPress} style={styles.chatButton}>
          <Ionicons name="chatbubbles" size={24} color="#fff" />
          <View style={styles.chatBadge}>
            <Text style={styles.chatCount}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.potContainer}>
        <Text style={styles.potLabel}>POT TOTAL</Text>
        <Text style={styles.potAmount}>{gameState.pot} 🪙</Text>
      </View>

      <View style={styles.gameContainer}>
        <LudoBoard gameState={gameState} onPieceMove={handlePieceMove} />
        
        <View style={styles.gameControls}>
          <View style={styles.currentPlayerInfo}>
            <Text style={styles.turnLabel}>Tour de:</Text>
            <View style={styles.playerIndicator}>
              <View style={[
                styles.playerColor, 
                { backgroundColor: gameState.players[gameState.currentPlayer].color }
              ]} />
              <Text style={styles.playerName}>
                {gameState.players[gameState.currentPlayer].name}
              </Text>
            </View>
          </View>

          <View style={styles.diceContainer}>
            <TouchableOpacity
              style={[
                styles.diceButton, 
                gameState.isRolling && styles.diceRolling,
                gameState.currentPlayer !== 0 && styles.diceDisabled
              ]}
              onPress={rollDice}
              disabled={gameState.isRolling || gameState.currentPlayer !== 0}
            >
              <Text style={styles.diceValue}>{gameState.diceValue}</Text>
            </TouchableOpacity>
            <Text style={styles.diceLabel}>
              {gameState.currentPlayer === 0 
                ? (gameState.isRolling ? 'Lancement...' : 'Votre tour') 
                : 'Tour adverse'
              }
            </Text>
          </View>

          <View style={styles.playersInfo}>
            {gameState.players.map((player, index) => (
              <View
                key={player.id}
                style={[
                  styles.playerCard,
                  index === gameState.currentPlayer && styles.activePlayer,
                ]}
              >
                <View style={[styles.playerColorSmall, { backgroundColor: player.color }]} />
                <Text style={styles.playerNameSmall}>{player.name}</Text>
                <Text style={styles.playerPieces}>
                  {player.pieces.filter(p => p > 0).length}/4
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
  quitButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(244, 67, 54, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameInfo: {
    alignItems: 'center',
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  gameTimer: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  chatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  chatBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  potContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    marginHorizontal: 20,
    borderRadius: 15,
    paddingVertical: 10,
  },
  potLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  potAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  gameContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  gameControls: {
    marginTop: 20,
    marginBottom: 20,
  },
  currentPlayerInfo: {
    alignItems: 'center',
    marginBottom: 15,
  },
  turnLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  playerIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  playerColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  playerName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  diceDisabled: {
    opacity: 0.5,
  },
  diceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  diceLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  playersInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2,
  },
  activePlayer: {
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  playerColorSmall: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  playerNameSmall: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  playerPieces: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.8,
  },
});