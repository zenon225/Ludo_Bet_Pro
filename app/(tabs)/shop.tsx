import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'coins' | 'gems';
  icon: string;
  category: 'themes' | 'dice' | 'avatars' | 'powerups' | 'betting';
  owned: boolean;
}

export default function MoreOptionsScreen() {
  const insets = useSafeAreaInsets();

  const [coins, setCoins] = useState(230856);
  const [gems, setGems] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState<string>('betting');

  const categories = [
    { id: 'betting', name: 'Paris', icon: '💰' },
    { id: 'themes', name: 'Thèmes', icon: '🎨' },
    { id: 'dice', name: 'Dés', icon: '🎲' },
    { id: 'avatars', name: 'Avatars', icon: '👤' },
    { id: 'powerups', name: 'Bonus', icon: '⚡' },
  ];

  const shopItems: ShopItem[] = [
    // Paris et fonctionnalités
    {
      id: 'bet1',
      name: 'Paris Avancés',
      description: 'Débloquer les paris sur les événements spéciaux',
      price: 15000,
      currency: 'coins',
      icon: '🎯',
      category: 'betting',
      owned: false,
    },
    {
      id: 'bet2',
      name: 'Assurance Paris',
      description: 'Protection contre les pertes jusqu\'à 50%',
      price: 5,
      currency: 'gems',
      icon: '🛡️',
      category: 'betting',
      owned: false,
    },
    {
      id: 'bet3',
      name: 'Multiplicateur x2',
      description: 'Double vos gains pendant 24h',
      price: 3,
      currency: 'gems',
      icon: '💎',
      category: 'betting',
      owned: false,
    },
    {
      id: 'bet4',
      name: 'Chat Premium',
      description: 'Emojis exclusifs et badges VIP',
      price: 8000,
      currency: 'coins',
      icon: '💬',
      category: 'betting',
      owned: false,
    },
    // Thèmes
    {
      id: '1',
      name: 'Thème Océan',
      description: 'Plateau bleu avec effets aquatiques',
      price: 5000,
      currency: 'coins',
      icon: '🌊',
      category: 'themes',
      owned: false,
    },
    {
      id: '2',
      name: 'Thème Espace',
      description: 'Voyage dans les étoiles',
      price: 2,
      currency: 'gems',
      icon: '🚀',
      category: 'themes',
      owned: false,
    },
    // Dés
    {
      id: '3',
      name: 'Dé Doré',
      description: 'Dé en or avec effets brillants',
      price: 10000,
      currency: 'coins',
      icon: '✨',
      category: 'dice',
      owned: true,
    },
    {
      id: '4',
      name: 'Dé Magique',
      description: 'Dé avec particules magiques',
      price: 3,
      currency: 'gems',
      icon: '🔮',
      category: 'dice',
      owned: false,
    },
    // Avatars
    {
      id: '5',
      name: 'Avatar Roi',
      description: 'Couronne royale pour votre profil',
      price: 15000,
      currency: 'coins',
      icon: '👑',
      category: 'avatars',
      owned: false,
    },
    // Bonus
    {
      id: '6',
      name: 'Double Dé',
      description: 'Lance le dé deux fois par tour',
      price: 5,
      currency: 'gems',
      icon: '🎯',
      category: 'powerups',
      owned: false,
    },
  ];

  const filteredItems = shopItems.filter(item => item.category === selectedCategory);

  const handlePurchase = (item: ShopItem) => {
    if (item.owned) {
      Alert.alert('Déjà possédé', 'Vous possédez déjà cet objet.');
      return;
    }

    const canAfford = item.currency === 'coins' 
      ? coins >= item.price 
      : gems >= item.price;

    if (!canAfford) {
      Alert.alert(
        'Fonds insuffisants',
        `Vous n'avez pas assez de ${item.currency === 'coins' ? 'pièces' : 'gemmes'}.`
      );
      return;
    }

    Alert.alert(
      'Confirmer l\'achat',
      `Acheter ${item.name} pour ${item.price} ${item.currency === 'coins' ? '🪙' : '💎'} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Acheter',
          onPress: () => {
            if (item.currency === 'coins') {
              setCoins(prev => prev - item.price);
            } else {
              setGems(prev => prev - item.price);
            }
            
            Alert.alert('Achat réussi!', `${item.name} a été ajouté à votre collection.`);
          }
        },
      ]
    );
  };

  const handleBuyCoins = () => {
    Alert.alert(
      'Acheter des pièces',
      'Choisissez un pack de pièces:',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: '10,000 🪙 - 0.99€', onPress: () => {} },
        { text: '50,000 🪙 - 4.99€', onPress: () => {} },
        { text: '100,000 🪙 - 9.99€', onPress: () => {} },
      ]
    );
  };

  const handleBuyGems = () => {
    Alert.alert(
      'Acheter des gemmes',
      'Choisissez un pack de gemmes:',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: '5 💎 - 0.99€', onPress: () => {} },
        { text: '15 💎 - 2.99€', onPress: () => {} },
        { text: '50 💎 - 9.99€', onPress: () => {} },
      ]
    );
  };

  return (
    <LinearGradient
      colors={['#8BC34A', '#4CAF50', '#2E7D32']}
      style={[styles.container, { paddingTop: Platform.OS === 'ios' ? insets.top : 0 }]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>🛍️ PLUS D'OPTIONS</Text>
        
        <View style={styles.currencyContainer}>
          <TouchableOpacity style={styles.currencyItem} onPress={handleBuyCoins}>
            <Text style={styles.currencyIcon}>🪙</Text>
            <Text style={styles.currencyAmount}>{coins.toLocaleString()}</Text>
            <Ionicons name="add" size={16} color="#2E7D32" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.currencyItem} onPress={handleBuyGems}>
            <Text style={styles.currencyIcon}>💎</Text>
            <Text style={styles.currencyAmount}>{gems}</Text>
            <Ionicons name="add" size={16} color="#2E7D32" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText,
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.itemsGrid}>
          {filteredItems.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemIcon}>{item.icon}</Text>
                {item.owned && (
                  <View style={styles.ownedBadge}>
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  </View>
                )}
              </View>
              
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              
              <View style={styles.itemFooter}>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceAmount}>{item.price}</Text>
                  <Text style={styles.priceIcon}>
                    {item.currency === 'coins' ? '🪙' : '💎'}
                  </Text>
                </View>
                
                <TouchableOpacity
                  style={[
                    styles.buyButton,
                    item.owned && styles.ownedButton,
                  ]}
                  onPress={() => handlePurchase(item)}
                  disabled={item.owned}
                >
                  <Text style={[
                    styles.buyButtonText,
                    item.owned && styles.ownedButtonText,
                  ]}>
                    {item.owned ? 'Possédé' : 'Acheter'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Offres spéciales */}
        <View style={styles.specialOffersSection}>
          <Text style={styles.sectionTitle}>🎁 Offres Spéciales</Text>
          
          <LinearGradient
            colors={['#FF6B35', '#F7931E']}
            style={styles.specialOfferCard}
          >
            <View style={styles.offerHeader}>
              <Text style={styles.offerTitle}>PACK PARIEUR</Text>
              <Text style={styles.offerDiscount}>-50%</Text>
            </View>
            
            <Text style={styles.offerDescription}>
              Parfait pour maximiser vos gains aux paris!
            </Text>
            
            <View style={styles.offerItems}>
              <Text style={styles.offerItem}>• 50,000 🪙</Text>
              <Text style={styles.offerItem}>• 15 💎</Text>
              <Text style={styles.offerItem}>• Assurance Paris</Text>
              <Text style={styles.offerItem}>• Multiplicateur x2</Text>
              <Text style={styles.offerItem}>• Chat Premium</Text>
            </View>
            
            <TouchableOpacity style={styles.specialBuyButton}>
              <Text style={styles.specialBuyText}>ACHETER - 9.99€</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['#9C27B0', '#673AB7']}
            style={styles.specialOfferCard}
          >
            <View style={styles.offerHeader}>
              <Text style={styles.offerTitle}>PACK VIP ULTIMATE</Text>
              <Text style={styles.offerDiscount}>NOUVEAU</Text>
            </View>
            
            <Text style={styles.offerDescription}>
              L'expérience LUDO BET PRO ultime!
            </Text>
            
            <View style={styles.offerItems}>
              <Text style={styles.offerItem}>• 200,000 🪙</Text>
              <Text style={styles.offerItem}>• 100 💎</Text>
              <Text style={styles.offerItem}>• Tous les thèmes</Text>
              <Text style={styles.offerItem}>• Avatar exclusif VIP</Text>
              <Text style={styles.offerItem}>• Paris illimités</Text>
              <Text style={styles.offerItem}>• Support prioritaire</Text>
            </View>
            
            <TouchableOpacity style={styles.specialBuyButton}>
              <Text style={styles.specialBuyText}>ACHETER - 29.99€</Text>
            </TouchableOpacity>
          </LinearGradient>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  currencyContainer: {
    flexDirection: 'row',
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 10,
  },
  currencyIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  currencyAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginRight: 5,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    alignItems: 'center',
    minWidth: 80,
  },
  selectedCategory: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: '#2E7D32',
  },
  itemsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  itemIcon: {
    fontSize: 32,
  },
  ownedBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
    lineHeight: 16,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginRight: 5,
  },
  priceIcon: {
    fontSize: 16,
  },
  buyButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  ownedButton: {
    backgroundColor: '#9E9E9E',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ownedButtonText: {
    color: '#fff',
  },
  specialOffersSection: {
    marginTop: 30,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  specialOfferCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  offerDiscount: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  offerDescription: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 15,
    opacity: 0.9,
  },
  offerItems: {
    marginBottom: 20,
  },
  offerItem: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  specialBuyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  specialBuyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});