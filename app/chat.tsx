import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Message {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  color: string;
}

export default function ChatScreen() {
  const insets = useSafeAreaInsets();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: 'Rouge',
      message: 'Salut tout le monde! Prêt pour la partie ?',
      timestamp: new Date(Date.now() - 300000),
      color: '#E53E3E',
    },
    {
      id: '2',
      user: 'Bleu',
      message: 'Oui! Cette fois je vais gagner 😎',
      timestamp: new Date(Date.now() - 240000),
      color: '#3182CE',
    },
    {
      id: '3',
      user: 'Vert',
      message: 'On verra bien... J\'ai un bon feeling',
      timestamp: new Date(Date.now() - 180000),
      color: '#38A169',
    },
    {
      id: '4',
      user: 'Jaune',
      message: 'Que le meilleur gagne! 🎲',
      timestamp: new Date(Date.now() - 120000),
      color: '#D69E2E',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [currentUser] = useState('Vous');
  const scrollViewRef = useRef<ScrollView>(null);

  const quickMessages = [
    '🎯 Bon coup!',
    '😅 Pas de chance...',
    '🔥 En feu!',
    '👍 Bien joué',
    '😤 Concentré',
    '🎉 Victoire!',
  ];

  const sendMessage = (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      user: currentUser,
      message: text,
      timestamp: new Date(),
      color: '#4F46E5',
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    
    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <LinearGradient
      colors={['#8BC34A', '#4CAF50', '#2E7D32']}
      style={[styles.container, { paddingTop: Platform.OS === 'ios' ? insets.top : 0 }]}
    >
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>💬 Chat de Partie</Text>
          <View style={styles.onlineIndicator}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>4 joueurs en ligne</Text>
          </View>
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.user === currentUser && styles.ownMessage,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  message.user === currentUser && styles.ownMessageBubble,
                ]}
              >
                {message.user !== currentUser && (
                  <View style={styles.messageHeader}>
                    <View
                      style={[styles.userDot, { backgroundColor: message.color }]}
                    />
                    <Text style={styles.userName}>{message.user}</Text>
                  </View>
                )}
                <Text style={styles.messageText}>{message.message}</Text>
                <Text style={styles.messageTime}>
                  {formatTime(message.timestamp)}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.quickMessagesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.quickMessagesScroll}
          >
            {quickMessages.map((message, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickMessageButton}
                onPress={() => sendMessage(message)}
              >
                <Text style={styles.quickMessageText}>{message}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.messageInput}
            value={inputMessage}
            onChangeText={setInputMessage}
            placeholder="Tapez votre message..."
            placeholderTextColor="#999"
            multiline
            maxLength={200}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputMessage.trim() && styles.disabledSendButton,
            ]}
            onPress={() => sendMessage()}
            disabled={!inputMessage.trim()}
          >
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  onlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    marginRight: 8,
  },
  onlineText: {
    color: '#22C55E',
    fontSize: 12,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messageContainer: {
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  ownMessage: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 12,
    maxWidth: '80%',
    borderBottomLeftRadius: 4,
  },
  ownMessageBubble: {
    backgroundColor: '#4F46E5',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 4,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  userName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 4,
  },
  messageTime: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  quickMessagesContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  quickMessagesScroll: {
    flexDirection: 'row',
  },
  quickMessageButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  quickMessageText: {
    color: '#fff',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  messageInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 16,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledSendButton: {
    opacity: 0.5,
  },
});