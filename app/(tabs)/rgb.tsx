import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Dimensions, Alert, TouchableOpacity, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, LinearGradient, Stop, Defs, Rect } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

export default function RGBControl() {
  const insets = useSafeAreaInsets();
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [wsUrl, setWsUrl] = useState('ws://192.168.1.100:8080');
  const [tempWsUrl, setTempWsUrl] = useState('ws://192.168.1.100:8080');
  const [isConfigExpanded, setIsConfigExpanded] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  // WebSocket configuration
  // URL dinâmica configurável - removida a constante fixa

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    // Reconectar quando a URL mudar
    if (wsRef.current) {
      wsRef.current.close();
    }
    const timer = setTimeout(() => {
      connectWebSocket();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [wsUrl]);

  const connectWebSocket = () => {
    try {
      console.log('Tentando conectar em:', wsUrl);
      wsRef.current = new WebSocket(wsUrl);
      
      wsRef.current.onopen = () => {
        console.log('WebSocket conectado');
        setIsConnected(true);
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket desconectado');
        setIsConnected(false);
        // Tentar reconectar após 3 segundos
        setTimeout(() => {
          if (!isConnected) {
            connectWebSocket();
          }
        }, 3000);
      };

      wsRef.current.onerror = (error) => {
        console.error('Erro no WebSocket:', error);
        Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor WebSocket');
      };

      wsRef.current.onmessage = (event) => {
        console.log('Mensagem recebida:', event.data);
      };
    } catch (error) {
      console.error('Erro ao conectar WebSocket:', error);
      Alert.alert('Erro', 'Falha ao estabelecer conexão WebSocket');
    }
  };

  const sendRGBValues = (r: number, g: number, b: number) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: 'rgb',
        values: { r, g, b },
        timestamp: Date.now()
      });
      wsRef.current.send(message);
      console.log('Valores RGB enviados:', { r, g, b });
    } else {
      console.warn('WebSocket não está conectado');
    }
  };

  const handleRedChange = (value: number) => {
    const roundedValue = Math.round(value);
    setRed(roundedValue);
    sendRGBValues(roundedValue, green, blue);
  };

  const handleGreenChange = (value: number) => {
    const roundedValue = Math.round(value);
    setGreen(roundedValue);
    sendRGBValues(red, roundedValue, blue);
  };

  const handleBlueChange = (value: number) => {
    const roundedValue = Math.round(value);
    setBlue(roundedValue);
    sendRGBValues(red, green, roundedValue);
  };

  const updateWebSocketUrl = () => {
    if (tempWsUrl.trim() === '') {
      Alert.alert('Erro', 'URL não pode estar vazia');
      return;
    }

    // Validação básica de URL WebSocket
    if (!tempWsUrl.startsWith('ws://') && !tempWsUrl.startsWith('wss://')) {
      Alert.alert('Erro', 'URL deve começar com ws:// ou wss://');
      return;
    }

    console.log('Atualizando URL de:', wsUrl, 'para:', tempWsUrl);

    // Fechar conexão atual se existir
    if (wsRef.current) {
      wsRef.current.close();
    }

    // Atualizar a URL - isso vai triggerar o useEffect que reconecta
    setWsUrl(tempWsUrl);
    setIsConfigExpanded(false);

    Alert.alert('Sucesso', `URL atualizada para: ${tempWsUrl}\nTentando conectar...`);
  };

  const resetToDefault = () => {
    const defaultUrl = 'ws://192.168.1.100:8080';
    console.log('Resetando URL para:', defaultUrl);
    
    setTempWsUrl(defaultUrl);
    
    if (wsRef.current) {
      wsRef.current.close();
    }
    
    // Atualizar a URL - isso vai triggerar o useEffect que reconecta
    setWsUrl(defaultUrl);
    
    Alert.alert('Sucesso', `URL resetada para: ${defaultUrl}`);
  };

  const currentColor = `rgb(${red}, ${green}, ${blue})`;
  const hexColor = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#f8f9fa',
      paddingTop: insets.top,
    }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ position: 'relative', overflow: 'hidden', marginBottom: 5 }}>
          <Svg height="120" width="100%" style={{ position: 'absolute' }}>
            <Defs>
              <LinearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#873939" />
                <Stop offset="50%" stopColor="#a84545" />
                <Stop offset="100%" stopColor="#d8cc39" />
              </LinearGradient>
            </Defs>
            <Path d="M0,0 L100%,0 L100%,100 Q50%,120 0,100 Z" fill="url(#headerGrad)" />
          </Svg>
          
          <View style={{
            paddingHorizontal: 20,
            paddingVertical: 30,
            position: 'relative',
            zIndex: 1,
          }}>
            <Text style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
              marginBottom: 8,
            }}>
              Controle RGB
            </Text>
            <Text style={{
              fontSize: 14,
              color: 'black',
              textAlign: 'center',
              fontWeight: '500',
            }}>
              Ajuste as cores e envie via WebSocket para a ESP32
            </Text>
          </View>
        </View>

        {/* Preview da Cor */}
        <View style={{
          marginHorizontal: 20,
          marginBottom: 30,
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: 16,
            textAlign: 'center',
          }}>
            Visualização da Cor
          </Text>
          
          <View style={{
            width: '100%',
            height: 120,
            borderRadius: 12,
            backgroundColor: currentColor,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
          }} />
          
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <View>
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#6b7280',
                marginBottom: 2,
              }}>
                RGB
              </Text>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#1f2937',
              }}>
                {red}, {green}, {blue}
              </Text>
            </View>
            <View>
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#6b7280',
                marginBottom: 2,
              }}>
                HEX
              </Text>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#1f2937',
                fontFamily: 'monospace',
              }}>
                {hexColor.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {/* Controles RGB */}
        <View style={{
          marginHorizontal: 20,
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: 20,
            textAlign: 'center',
          }}>
            Controles de Cor
          </Text>

          {/* Red Slider */}
          <View style={{ marginBottom: 25 }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#dc2626',
              }}>
                Vermelho
              </Text>
              <View style={{
                backgroundColor: '#fef2f2',
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#fecaca',
              }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#dc2626',
                  minWidth: 30,
                  textAlign: 'center',
                }}>
                  {red}
                </Text>
              </View>
            </View>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={255}
              value={red}
              onValueChange={handleRedChange}
              minimumTrackTintColor="#dc2626"
              maximumTrackTintColor="#fecaca"
              thumbTintColor="#dc2626"
            />
          </View>

          {/* Green Slider */}
          <View style={{ marginBottom: 25 }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#16a34a',
              }}>
                Verde
              </Text>
              <View style={{
                backgroundColor: '#f0fdf4',
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#bbf7d0',
              }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#16a34a',
                  minWidth: 30,
                  textAlign: 'center',
                }}>
                  {green}
                </Text>
              </View>
            </View>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={255}
              value={green}
              onValueChange={handleGreenChange}
              minimumTrackTintColor="#16a34a"
              maximumTrackTintColor="#bbf7d0"
              thumbTintColor="#16a34a"
            />
          </View>

          {/* Blue Slider */}
          <View style={{ marginBottom: 10 }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#2563eb',
              }}>
                Azul
              </Text>
              <View style={{
                backgroundColor: '#eff6ff',
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#bfdbfe',
              }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#2563eb',
                  minWidth: 30,
                  textAlign: 'center',
                }}>
                  {blue}
                </Text>
              </View>
            </View>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={255}
              value={blue}
              onValueChange={handleBlueChange}
              minimumTrackTintColor="#2563eb"
              maximumTrackTintColor="#bfdbfe"
              thumbTintColor="#2563eb"
            />
          </View>
        </View>

        {/* Informações do WebSocket */}
        <View style={{
          marginHorizontal: 20,
          marginTop: 20,
          backgroundColor: '#f8fafc',
          borderRadius: 12,
          padding: 16,
          borderLeftWidth: 4,
          borderLeftColor: '#3b82f6',
        }}>
          <Text style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: 4,
          }}>
            Configuração WebSocket
          </Text>
          <Text style={{
            fontSize: 12,
            color: '#6b7280',
            marginBottom: 8,
          }}>
            URL: {wsUrl}
          </Text>
          <Text style={{
            fontSize: 11,
            color: '#9ca3af',
            lineHeight: 16,
          }}>
            Os valores RGB são enviados automaticamente quando você move os sliders. 
            Configure o endereço do servidor no código para conectar ao seu dispositivo.
          </Text>
        </View>

        {/* Status de Conexão */}
        <View style={{
          marginHorizontal: 20,
          marginTop: 12,
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
          <View style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: isConnected ? '#10b981' : '#ef4444',
            marginRight: 12,
          }} />
          <Text style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#1f2937',
          }}>
            {isConnected ? 'WebSocket Conectado' : 'WebSocket Desconectado'}
          </Text>
        </View>

        {/* Configuração Avançada - Colapsável */}
        <View style={{
          marginHorizontal: 20,
          marginTop: 8,
          marginBottom: 20,
          backgroundColor: 'white',
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 3,
        }}>
          <TouchableOpacity
            onPress={() => setIsConfigExpanded(!isConfigExpanded)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 16,
            }}
            activeOpacity={0.7}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#f3f4f6',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12,
              }}>
                <Text style={{ fontSize: 16 }}>⚙️</Text>
              </View>
              <View>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#1f2937',
                }}>
                  Configurações Avançadas
                </Text>
                <Text style={{
                  fontSize: 11,
                  color: '#6b7280',
                }}>
                  Alterar endereço do servidor WebSocket
                </Text>
              </View>
            </View>
            
            <View style={{
              transform: [{ rotate: isConfigExpanded ? '180deg' : '0deg' }],
            }}>
              <Text style={{ color: '#6b7280', fontSize: 12, fontWeight: 'bold' }}>
                ▼
              </Text>
            </View>
          </TouchableOpacity>

          {/* Conteúdo expandível */}
          {isConfigExpanded && (
            <View style={{
              paddingHorizontal: 16,
              paddingBottom: 16,
              borderTopWidth: 1,
              borderTopColor: '#f3f4f6',
            }}>
              <Text style={{
                fontSize: 13,
                fontWeight: '600',
                color: '#374151',
                marginBottom: 8,
                marginTop: 12,
              }}>
                URL do Servidor WebSocket
              </Text>
              
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#d1d5db',
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  fontSize: 13,
                  fontFamily: 'monospace',
                  backgroundColor: '#f9fafb',
                  color: '#1f2937',
                  marginBottom: 12,
                }}
                value={tempWsUrl}
                onChangeText={setTempWsUrl}
                placeholder="ws://192.168.1.100:8080"
                placeholderTextColor="#9ca3af"
                keyboardType="url"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <View style={{
                flexDirection: 'row',
                gap: 8,
              }}>
                <TouchableOpacity
                  onPress={updateWebSocketUrl}
                  style={{
                    flex: 1,
                    backgroundColor: '#873939',
                    paddingVertical: 10,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={{
                    color: 'white',
                    fontSize: 12,
                    fontWeight: '600',
                  }}>
                    Conectar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={resetToDefault}
                  style={{
                    flex: 1,
                    backgroundColor: '#f3f4f6',
                    paddingVertical: 10,
                    borderRadius: 8,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#d1d5db',
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={{
                    color: '#374151',
                    fontSize: 12,
                    fontWeight: '600',
                  }}>
                    Resetar
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={{
                fontSize: 10,
                color: '#9ca3af',
                marginTop: 8,
                lineHeight: 14,
              }}>
                💡 Dica: Use o IP local do seu dispositivo (ex: ws://192.168.1.50:8080) para conectar a um Arduino/ESP32 na mesma rede WiFi.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
