import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OptionsScreen() {
  const insets = useSafeAreaInsets();

  const [settings, setSettings] = useState({
    sound: true,
    music: true,
    vibration: true,
    notifications: true,
    autoSave: true,
    showAnimations: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Réinitialiser les progrès',
      'Êtes-vous sûr de vouloir réinitialiser tous vos progrès ? Cette action est irréversible.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Réinitialiser', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Progrès réinitialisés', 'Tous vos progrès ont été effacés.');
          }
        },
      ]
    );
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Support',
      'Contactez notre équipe de support à support@ludogame.com ou via notre site web.',
      [{ text: 'OK' }]
    );
  };

  return (
    <LinearGradient
      colors={['#8BC34A', '#4CAF50', '#2E7D32']}
      style={[styles.container, { paddingTop: Platform.OS === 'ios' ? insets.top : 0 }]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>⚙️ OPTIONS</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Paramètres Audio */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔊 Audio</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="volume-high" size={24} color="#2E7D32" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Effets sonores</Text>
                <Text style={styles.settingDescription}>Sons des dés, mouvements, etc.</Text>
              </View>
            </View>
            <Switch
              value={settings.sound}
              onValueChange={() => toggleSetting('sound')}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor={settings.sound ? '#2E7D32' : '#9E9E9E'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="musical-notes" size={24} color="#2E7D32" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Musique de fond</Text>
                <Text style={styles.settingDescription}>Ambiance musicale du jeu</Text>
              </View>
            </View>
            <Switch
              value={settings.music}
              onValueChange={() => toggleSetting('music')}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor={settings.music ? '#2E7D32' : '#9E9E9E'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="phone-portrait" size={24} color="#2E7D32" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Vibrations</Text>
                <Text style={styles.settingDescription}>Retour haptique</Text>
              </View>
            </View>
            <Switch
              value={settings.vibration}
              onValueChange={() => toggleSetting('vibration')}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor={settings.vibration ? '#2E7D32' : '#9E9E9E'}
            />
          </View>
        </View>

        {/* Paramètres de Jeu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎮 Jeu</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications" size={24} color="#2E7D32" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Notifications</Text>
                <Text style={styles.settingDescription}>Alertes de tournois et parties</Text>
              </View>
            </View>
            <Switch
              value={settings.notifications}
              onValueChange={() => toggleSetting('notifications')}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor={settings.notifications ? '#2E7D32' : '#9E9E9E'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="save" size={24} color="#2E7D32" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Sauvegarde automatique</Text>
                <Text style={styles.settingDescription}>Sauvegarder les parties en cours</Text>
              </View>
            </View>
            <Switch
              value={settings.autoSave}
              onValueChange={() => toggleSetting('autoSave')}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor={settings.autoSave ? '#2E7D32' : '#9E9E9E'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="sparkles" size={24} color="#2E7D32" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Animations</Text>
                <Text style={styles.settingDescription}>Effets visuels et transitions</Text>
              </View>
            </View>
            <Switch
              value={settings.showAnimations}
              onValueChange={() => toggleSetting('showAnimations')}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor={settings.showAnimations ? '#2E7D32' : '#9E9E9E'}
            />
          </View>
        </View>

        {/* Compte et Données */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 Compte</Text>
          
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="person-circle" size={24} color="#2E7D32" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Profil</Text>
                <Text style={styles.settingDescription}>Modifier vos informations</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="stats-chart" size={24} color="#2E7D32" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Statistiques</Text>
                <Text style={styles.settingDescription}>Voir vos performances</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="trophy" size={24} color="#2E7D32" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Réalisations</Text>
                <Text style={styles.settingDescription}>Vos succès et trophées</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Support et Informations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ Support</Text>
          
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="help-circle" size={24} color="#2E7D32" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Aide</Text>
                <Text style={styles.settingDescription}>Règles du jeu et FAQ</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleContactSupport}>
            <View style={styles.settingLeft}>
              <Ionicons name="mail" size={24} color="#2E7D32" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Contacter le support</Text>
                <Text style={styles.settingDescription}>Signaler un problème</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="document-text" size={24} color="#2E7D32" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Conditions d'utilisation</Text>
                <Text style={styles.settingDescription}>Politique de confidentialité</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="information-circle" size={24} color="#2E7D32" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>À propos</Text>
                <Text style={styles.settingDescription}>Version 1.0.0 (Beta)</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Actions Dangereuses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚠️ Zone Dangereuse</Text>
          
          <TouchableOpacity style={styles.dangerItem} onPress={handleResetProgress}>
            <View style={styles.settingLeft}>
              <Ionicons name="refresh" size={24} color="#F44336" />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: '#F44336' }]}>
                  Réinitialiser les progrès
                </Text>
                <Text style={styles.settingDescription}>
                  Effacer toutes les données de jeu
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#F44336" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.dangerItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="log-out" size={24} color="#F44336" />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: '#F44336' }]}>
                  Déconnexion
                </Text>
                <Text style={styles.settingDescription}>
                  Se déconnecter du compte
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#F44336" />
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
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  dangerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(244, 67, 54, 0.3)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
});