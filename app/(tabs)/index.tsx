import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Détection du type d'appareil
const isTablet = width > 768;
const isLandscape = width > height;

// Calculs responsives
const getResponsiveSize = (baseSize: number) => {
  const scale = Math.min(width / 375, height / 812); // Base iPhone X
  return Math.max(baseSize * scale, baseSize * 0.8);
};

const getGridColumns = () => {
  if (isTablet) return isLandscape ? 4 : 3;
  return isLandscape ? 3 : 2;
};

export default function HomeScreen() {
  const [coins, setCoins] = useState(230856);
  const [gems, setGems] = useState(3);
  const insets = useSafeAreaInsets();

  const gameOptions = [
    {
      id: 'computer',
      title: 'VS\nORDINATEUR',
      icon: '🤖',
      color: '#4CAF50',
      route: '/game/computer',
    },
    {
      id: 'online',
      title: 'MULTI JOUEURS\nEN LIGNE',
      icon: '🌐',
      color: '#FF9800',
      route: '/game/online',
    },
    {
      id: 'local',
      title: 'MULTI JOUEURS\nLOCAL',
      icon: '👥',
      color: '#2196F3',
      route: '/game/local',
    },
    {
      id: 'private',
      title: 'PARTIE PRIVÉE',
      icon: '🔒',
      color: '#9C27B0',
      route: '/game/private',
    },
  ];

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const handleGameModePress = (gameMode: string, route: string) => {
    router.push(route as any);
  };

  const handleChatPress = () => {
    router.push('/chat');
  };

  const columns = getGridColumns();
  const cardWidth = (width - 40 - (columns - 1) * 10) / columns; // 40px padding total, 10px gap
  const cardHeight = Math.min(cardWidth * 0.8, getResponsiveSize(110)); // Hauteur proportionnelle

  return (
    <LinearGradient
      colors={['#8BC34A', '#4CAF50', '#2E7D32']}
      style={[styles.container, { paddingTop: Platform.OS === 'ios' ? insets.top + 10 : 20 }]}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header avec profil et monnaies */}
        <View style={[styles.header, { paddingTop: isLandscape ? 10 : 20 }]}>
          <TouchableOpacity 
            style={[styles.profileSection, { width: getResponsiveSize(50), height: getResponsiveSize(50) }]}
            onPress={handleProfilePress}
          >
            <Image
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' }}
              style={[styles.profileImage, { width: getResponsiveSize(50), height: getResponsiveSize(50) }]}
            />
          </TouchableOpacity>
          
          <View style={[styles.currencyContainer, { paddingHorizontal: getResponsiveSize(15) }]}>
            <View style={styles.coinContainer}>
              <View style={[styles.coinIcon, { width: getResponsiveSize(30), height: getResponsiveSize(30) }]}>
                <Text style={[styles.coinSymbol, { fontSize: getResponsiveSize(16) }]}>🪙</Text>
              </View>
              <Text style={[styles.coinAmount, { fontSize: getResponsiveSize(16) }]}>
                {coins.toLocaleString()}
              </Text>
            </View>
            
            <View style={styles.gemContainer}>
              <View style={[styles.gemIcon, { width: getResponsiveSize(30), height: getResponsiveSize(30) }]}>
                <Text style={[styles.gemSymbol, { fontSize: getResponsiveSize(16) }]}>💎</Text>
              </View>
              <Text style={[styles.gemAmount, { fontSize: getResponsiveSize(16) }]}>
                {gems}
              </Text>
            </View>
          </View>

          <View style={styles.headerButtons}>
            <TouchableOpacity 
              style={[styles.chatButton, { width: getResponsiveSize(50), height: getResponsiveSize(50) }]} 
              onPress={handleChatPress}
            >
              <Ionicons name="chatbubbles" size={getResponsiveSize(24)} color="#2E7D32" />
              <View style={[styles.chatBadge, { width: getResponsiveSize(20), height: getResponsiveSize(20) }]}>
                <Text style={[styles.chatCount, { fontSize: getResponsiveSize(12) }]}>5</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.notificationButton, { width: getResponsiveSize(50), height: getResponsiveSize(50) }]}
            >
              <Ionicons name="notifications" size={getResponsiveSize(24)} color="#2E7D32" />
              <View style={[styles.notificationBadge, { width: getResponsiveSize(20), height: getResponsiveSize(20) }]}>
                <Text style={[styles.notificationCount, { fontSize: getResponsiveSize(12) }]}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logo et plateau de jeu */}
        <View style={[styles.gameSection, { marginBottom: isLandscape ? 20 : 30 }]}>
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={['#FF6B35', '#F7931E', '#FFD700']}
              style={[styles.logoBackground, { 
                paddingHorizontal: getResponsiveSize(40),
                paddingVertical: getResponsiveSize(15)
              }]}
            >
              <Text style={[styles.logoText, { fontSize: getResponsiveSize(36) }]}>LUDO</Text>
              <Text style={[styles.logoSubtext, { fontSize: getResponsiveSize(16) }]}>BET PRO</Text>
            </LinearGradient>
            <View style={[styles.betaTag, { 
              paddingHorizontal: getResponsiveSize(8),
              paddingVertical: getResponsiveSize(4)
            }]}>
              <Text style={[styles.betaText, { fontSize: getResponsiveSize(10) }]}>BETA</Text>
            </View>
          </View>

          {/* Plateau de jeu miniature */}
          <View style={[styles.gameBoardContainer, { 
            padding: getResponsiveSize(15),
            marginBottom: isLandscape ? 15 : 20
          }]}>
            <View style={[styles.gameBoard, { 
              width: getResponsiveSize(150), 
              height: getResponsiveSize(150) 
            }]}>
              <View style={styles.boardGrid}>
                {/* Zone rouge */}
                <View style={[styles.playerZone, { backgroundColor: '#F44336' }]}>
                  <View style={[styles.pawn, { width: getResponsiveSize(12), height: getResponsiveSize(12) }]} />
                  <View style={[styles.pawn, { width: getResponsiveSize(12), height: getResponsiveSize(12) }]} />
                </View>
                
                {/* Zone bleue */}
                <View style={[styles.playerZone, { backgroundColor: '#2196F3' }]}>
                  <View style={[styles.pawn, { width: getResponsiveSize(12), height: getResponsiveSize(12) }]} />
                  <View style={[styles.pawn, { width: getResponsiveSize(12), height: getResponsiveSize(12) }]} />
                </View>
                
                {/* Zone verte */}
                <View style={[styles.playerZone, { backgroundColor: '#4CAF50' }]}>
                  <View style={[styles.pawn, { width: getResponsiveSize(12), height: getResponsiveSize(12) }]} />
                  <View style={[styles.pawn, { width: getResponsiveSize(12), height: getResponsiveSize(12) }]} />
                </View>
                
                {/* Zone jaune */}
                <View style={[styles.playerZone, { backgroundColor: '#FFEB3B' }]}>
                  <View style={[styles.pawn, { width: getResponsiveSize(12), height: getResponsiveSize(12) }]} />
                  <View style={[styles.pawn, { width: getResponsiveSize(12), height: getResponsiveSize(12) }]} />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Options de jeu */}
        <View style={[styles.gameOptionsContainer, { paddingHorizontal: 20 }]}>
          <View style={[styles.gameOptionsGrid, { 
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 10
          }]}>
            {gameOptions.map((option, index) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.gameOptionCard, 
                  { 
                    backgroundColor: option.color,
                    width: cardWidth,
                    height: cardHeight,
                    marginBottom: 10
                  }
                ]}
                onPress={() => handleGameModePress(option.title, option.route)}
              >
                <View style={styles.gameOptionContent}>
                  <Text style={[styles.gameOptionIcon, { fontSize: getResponsiveSize(32) }]}>
                    {option.icon}
                  </Text>
                  <Text style={[styles.gameOptionTitle, { 
                    fontSize: Math.min(getResponsiveSize(14), cardWidth * 0.12),
                    lineHeight: Math.min(getResponsiveSize(16), cardWidth * 0.14)
                  }]}>
                    {option.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Espace en bas pour éviter que le contenu soit coupé */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileSection: {
    borderRadius: 25,
  },
  profileImage: {
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  currencyContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    paddingVertical: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 15,
    maxWidth: 250,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  coinIcon: {
    borderRadius: 15,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  coinSymbol: {
    fontWeight: 'bold',
  },
  coinAmount: {
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  gemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gemIcon: {
    borderRadius: 15,
    backgroundColor: '#E91E63',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  gemSymbol: {
    fontWeight: 'bold',
  },
  gemAmount: {
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatButton: {
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginRight: 10,
  },
  chatBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatCount: {
    color: '#fff',
    fontWeight: 'bold',
  },
  notificationButton: {
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#F44336',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#fff',
    fontWeight: 'bold',
  },
  gameSection: {
    alignItems: 'center',
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  logoBackground: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    alignItems: 'center',
  },
  logoText: {
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  logoSubtext: {
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginTop: -5,
  },
  betaTag: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: '#E91E63',
    borderRadius: 12,
  },
  betaText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  gameBoardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  gameBoard: {
    alignSelf: 'center',
  },
  boardGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  playerZone: {
    width: '50%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  pawn: {
    borderRadius: 6,
    backgroundColor: '#fff',
    margin: 2,
    borderWidth: 1,
    borderColor: '#333',
  },
  gameOptionsContainer: {
    flex: 1,
  },
  gameOptionsGrid: {
    alignItems: 'flex-start',
  },
  gameOptionCard: {
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  gameOptionContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  gameOptionIcon: {
    marginBottom: 6,
  },
  gameOptionTitle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});