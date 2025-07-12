import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import { GameState } from '@/types/game';

const { width, height } = Dimensions.get('window');
const isTablet = width > 768;
const BOARD_MARGIN = 20;
const AVAILABLE_WIDTH = width - (BOARD_MARGIN * 2);
const AVAILABLE_HEIGHT = height * 0.6; // 60% de la hauteur d'écran
const BOARD_SIZE = Math.min(AVAILABLE_WIDTH, AVAILABLE_HEIGHT);

interface LudoBoardProps {
  gameState: GameState;
  onPieceMove: (playerIndex: number, pieceIndex: number, newPosition: number) => void;
}

export function LudoBoard({ gameState, onPieceMove }: LudoBoardProps) {
  const cellSize = BOARD_SIZE / 15;
  const pieceSize = cellSize * 0.6;
  const homeAreaSize = cellSize * 6;
  const pathWidth = cellSize;

  const renderPlayerArea = (playerIndex: number, position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => {
    const player = gameState.players[playerIndex];
    const isCurrentPlayer = gameState.currentPlayer === playerIndex;
    
    const getAreaStyle = () => {
      const baseStyle = {
        width: homeAreaSize,
        height: homeAreaSize,
        position: 'absolute' as const,
        backgroundColor: player.color,
        borderRadius: 12,
        padding: 8,
        borderWidth: isCurrentPlayer ? 3 : 1,
        borderColor: isCurrentPlayer ? '#FFD700' : '#fff',
      };

      switch (position) {
        case 'top-left':
          return { ...baseStyle, top: 0, left: 0 };
        case 'top-right':
          return { ...baseStyle, top: 0, right: 0 };
        case 'bottom-left':
          return { ...baseStyle, bottom: 0, left: 0 };
        case 'bottom-right':
          return { ...baseStyle, bottom: 0, right: 0 };
      }
    };

    return (
      <View style={getAreaStyle()}>
        <View style={styles.playerHeader}>
          <Text style={styles.playerName}>{player.name}</Text>
        </View>
        <View style={styles.piecesContainer}>
          {player.pieces.map((piecePosition, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.piece,
                {
                  width: pieceSize * 0.8,
                  height: pieceSize * 0.8,
                  backgroundColor: '#fff',
                  borderColor: player.color,
                }
              ]}
              onPress={() => handlePiecePress(playerIndex, index)}
            >
              <Text style={styles.pieceNumber}>{index + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderCenterPath = () => {
    return (
      <View style={styles.centerPath}>
        {/* Chemin horizontal supérieur */}
        <View style={[styles.pathSegment, styles.topPath]} />
        
        {/* Chemin vertical gauche */}
        <View style={[styles.pathSegment, styles.leftPath]} />
        
        {/* Chemin horizontal inférieur */}
        <View style={[styles.pathSegment, styles.bottomPath]} />
        
        {/* Chemin vertical droit */}
        <View style={[styles.pathSegment, styles.rightPath]} />
        
        {/* Centre du plateau */}
        <View style={styles.centerArea}>
          <Text style={styles.centerText}>🏠</Text>
        </View>
        
        {/* Flèches directionnelles */}
        <View style={[styles.arrow, styles.topArrow]}>
          <Text style={styles.arrowText}>↑</Text>
        </View>
        <View style={[styles.arrow, styles.rightArrow]}>
          <Text style={styles.arrowText}>→</Text>
        </View>
        <View style={[styles.arrow, styles.bottomArrow]}>
          <Text style={styles.arrowText}>↓</Text>
        </View>
        <View style={[styles.arrow, styles.leftArrow]}>
          <Text style={styles.arrowText}>←</Text>
        </View>
      </View>
    );
  };

  const renderSafeZones = () => {
    return (
      <>
        {/* Zones sécurisées */}
        <View style={[styles.safeZone, styles.topSafeZone]} />
        <View style={[styles.safeZone, styles.rightSafeZone]} />
        <View style={[styles.safeZone, styles.bottomSafeZone]} />
        <View style={[styles.safeZone, styles.leftSafeZone]} />
      </>
    );
  };

  const handlePiecePress = (playerIndex: number, pieceIndex: number) => {
    if (playerIndex !== gameState.currentPlayer) return;
    
    const currentPosition = gameState.players[playerIndex].pieces[pieceIndex];
    const newPosition = currentPosition + gameState.diceValue;
    
    if (newPosition <= 57) {
      onPieceMove(playerIndex, pieceIndex, newPosition);
    }
  };

  return (
    <View style={[styles.boardContainer, { width: BOARD_SIZE, height: BOARD_SIZE }]}>
      <View style={styles.board}>
        {/* Aires de jeu des joueurs */}
        {renderPlayerArea(0, 'top-left')}
        {renderPlayerArea(1, 'top-right')}
        {renderPlayerArea(2, 'bottom-left')}
        {renderPlayerArea(3, 'bottom-right')}
        
        {/* Chemins centraux */}
        {renderCenterPath()}
        
        {/* Zones sécurisées */}
        {renderSafeZones()}
        
        {/* Indicateur du joueur actuel */}
        <View style={styles.currentPlayerIndicator}>
          <Text style={styles.currentPlayerText}>
            Tour: {gameState.players[gameState.currentPlayer].name}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boardContainer: {
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  board: {
    flex: 1,
    backgroundColor: '#F5F5DC', // Beige clair
    borderRadius: 15,
    position: 'relative',
    borderWidth: 3,
    borderColor: '#8B4513', // Marron
  },
  playerHeader: {
    alignItems: 'center',
    marginBottom: 8,
  },
  playerName: {
    color: '#fff',
    fontSize: Math.max(12, BOARD_SIZE * 0.025),
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  piecesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  piece: {
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  pieceNumber: {
    fontSize: Math.max(8, BOARD_SIZE * 0.015),
    fontWeight: 'bold',
    color: '#333',
  },
  centerPath: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    width: '20%',
    height: '20%',
  },
  pathSegment: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  topPath: {
    top: -BOARD_SIZE * 0.2,
    left: 0,
    width: '100%',
    height: BOARD_SIZE * 0.067, // 1/15 du plateau
  },
  leftPath: {
    left: -BOARD_SIZE * 0.2,
    top: 0,
    width: BOARD_SIZE * 0.067,
    height: '100%',
  },
  bottomPath: {
    bottom: -BOARD_SIZE * 0.2,
    left: 0,
    width: '100%',
    height: BOARD_SIZE * 0.067,
  },
  rightPath: {
    right: -BOARD_SIZE * 0.2,
    top: 0,
    width: BOARD_SIZE * 0.067,
    height: '100%',
  },
  centerArea: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFA000',
  },
  centerText: {
    fontSize: Math.max(16, BOARD_SIZE * 0.04),
  },
  arrow: {
    position: 'absolute',
    width: BOARD_SIZE * 0.04,
    height: BOARD_SIZE * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 4,
  },
  topArrow: {
    top: -BOARD_SIZE * 0.15,
    left: '50%',
    marginLeft: -BOARD_SIZE * 0.02,
  },
  rightArrow: {
    right: -BOARD_SIZE * 0.15,
    top: '50%',
    marginTop: -BOARD_SIZE * 0.02,
  },
  bottomArrow: {
    bottom: -BOARD_SIZE * 0.15,
    left: '50%',
    marginLeft: -BOARD_SIZE * 0.02,
  },
  leftArrow: {
    left: -BOARD_SIZE * 0.15,
    top: '50%',
    marginTop: -BOARD_SIZE * 0.02,
  },
  arrowText: {
    fontSize: Math.max(12, BOARD_SIZE * 0.025),
    fontWeight: 'bold',
    color: '#333',
  },
  safeZone: {
    position: 'absolute',
    width: BOARD_SIZE * 0.04,
    height: BOARD_SIZE * 0.04,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2E7D32',
  },
  topSafeZone: {
    top: '25%',
    left: '48%',
  },
  rightSafeZone: {
    top: '48%',
    right: '25%',
  },
  bottomSafeZone: {
    bottom: '25%',
    left: '48%',
  },
  leftSafeZone: {
    top: '48%',
    left: '25%',
  },
  currentPlayerIndicator: {
    position: 'absolute',
    bottom: -40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  currentPlayerText: {
    fontSize: Math.max(14, BOARD_SIZE * 0.03),
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
});