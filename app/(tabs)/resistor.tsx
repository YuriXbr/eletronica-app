import React, { useState, useEffect } from 'react';
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { View, ScrollView, Text, Pressable, Animated, Dimensions } from 'react-native';
import { Link, useRouter } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

// Tipagem para as cores das faixas do resistor
type ColorBand =
  | 'black' | 'brown' | 'red' | 'orange' | 'yellow'
  | 'green' | 'blue' | 'violet' | 'gray' | 'white'
  | 'gold' | 'silver';

// Mapeamento das cores para seus respectivos valores numéricos
const colorValues: Record<ColorBand, number> = {
  black: 0, brown: 1, red: 2, orange: 3, yellow: 4,
  green: 5, blue: 6, violet: 7, gray: 8, white: 9,
  gold: -1, silver: -2,
};

// Valores de tolerância por cor
const toleranceValues: Record<ColorBand, string> = {
  brown: '±1%', red: '±2%', green: '±0.5%', blue: '±0.25%',
  violet: '±0.1%', gray: '±0.05%', gold: '±5%', silver: '±10%',
  black: '', orange: '', yellow: '', white: '',
};

// Mapeamento de cores para códigos hexadecimais (para renderização visual)
const colorHex: Record<ColorBand, string> = {
  black: '#222222', brown: '#4B2E05', red: '#FF0000', orange: '#ca6f1e',
  yellow: '#FFFF00', green: '#008000', blue: '#0000FF', violet: '#8A2BE2',
  gray: '#808080', white: '#FFFFFF', gold: '#B69517', silver: '#C0C0C0',
};

// Lista de todas as cores possíveis
const colorOptions: ColorBand[] = [
  'black', 'brown', 'red', 'orange', 'yellow',
  'green', 'blue', 'violet', 'gray', 'white',
  'gold', 'silver',
];

export default function Resistor() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // Estados para cada faixa do resistor
  const [band1, setBand1] = useState<ColorBand>('brown');
  const [band2, setBand2] = useState<ColorBand>('black');
  const [multiplier, setMultiplier] = useState<ColorBand>('red');
  const [tolerance, setTolerance] = useState<ColorBand>('gold');
  const [result, setResult] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Animações para cada faixa ao serem pressionadas
  const [scaleAnimBand1] = useState(() => colorOptions.slice(0, 10).map(() => new Animated.Value(1)));
  const [scaleAnimBand2] = useState(() => colorOptions.slice(0, 10).map(() => new Animated.Value(1)));
  const [scaleAnimMultiplier] = useState(() => colorOptions.map(() => new Animated.Value(1)));
  const [scaleAnimTolerance] = useState(() => colorOptions.map(() => new Animated.Value(1)));
  
  // Animação de escala para o botão de voltar
  const backScale = React.useRef(new Animated.Value(1)).current;

  // Altura do header considerando a safe area - reduzido significativamente
  const headerHeight = 60 + insets.top;
  const backgroundHeight = headerHeight + 20;

  // Recalcula a resistência sempre que uma faixa muda
  useEffect(() => {
    const firstDigit = colorValues[band1];
    const secondDigit = colorValues[band2];
    const multiplierValue = Math.pow(10, colorValues[multiplier]);

    const resistance = (firstDigit * 10 + secondDigit) * multiplierValue;
    setResult(resistance);
  }, [band1, band2, multiplier]);

  // Função que lida com a seleção de cor e executa a animação de feedback
  const handlePress = (
    color: ColorBand,
    setter: (color: ColorBand) => void,
    selected: ColorBand,
    idx: number,
    animArr: Animated.Value[]
  ) => {
    setter(color);
    Animated.sequence([
      Animated.timing(animArr[idx], { toValue: 1.15, duration: 120, useNativeDriver: true }),
      Animated.timing(animArr[idx], { toValue: 1, duration: 120, useNativeDriver: true })
    ]).start();
  };
  const animateBack = (callback?: () => void) => {
    Animated.sequence([
      Animated.timing(backScale, { toValue: 1.15, duration: 120, useNativeDriver: true }),
      Animated.timing(backScale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start(() => {
      if (callback) callback();
    });
  };
  // Cores que não podem ser usadas para tolerância e linha 1
  const disabledTolerance = ['yellow', 'orange', 'black', 'white'] as ColorBand[];
  const disabledBand1 = ['black'] as ColorBand[];// Não existe preto na linha 1

  // Função para renderizar cada botão de cor (digitais, multiplicador ou tolerância)
  const renderColorButton = (
    color: ColorBand,
    setter: (color: ColorBand) => void,
    selected: ColorBand,
    idx: number,
    animArr: Animated.Value[],
    isTolerance?: boolean,
    isMultiplier?: boolean,
    isDigit?: boolean,
    isBand1?: boolean
  ) => {
    // Desabilita botões de tolerância ou faixa 1 se a cor não existir
    const isDisabled = (isTolerance && disabledTolerance.includes(color)) || (isBand1 && disabledBand1.includes(color));  

    let label = '';

    // Se for faixa de dígito (1ª ou 2ª faixa), exibe o número
    if (isDigit) {
      const val = colorValues[color];
      label = val >= 0 ? `${val}` : '';
    }
    // Se for multiplicador, exibe × ou 10^n
    else if (isMultiplier) {
      const multiplierValue = Math.pow(10, colorValues[color]);
      if (multiplierValue >= 1e3) {
        // Exibe em notação exponencial com sobrescrito
        const exponent = colorValues[color];
        const superscripts: Record<number, string> = {
          0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴',
          5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹',
        };
        const exponentStr = String(exponent).split('').map((d) => superscripts[parseInt(d)]).join('');
        label = `×10${exponentStr}`;
      } else {
        label = `×${multiplierValue}`;
      }
    }
    // Se for tolerância, exibe % correspondente
    else if (isTolerance) {
      label = toleranceValues[color] || '';
    }

    return (
      <Animated.View key={color} style={{ 
        transform: [{ scale: animArr[idx] }],
        marginBottom: 8,
      }}>
        <Pressable
          onPress={() => !isDisabled && handlePress(color, setter, selected, idx, animArr)}
          disabled={isDisabled}
          style={{
            backgroundColor: colorHex[color],
            width: 52,
            height: 34,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: selected === color ? 2.5 : 1.5,
            borderColor: selected === color ? '#873939' : '#ccc',
            opacity: isDisabled ? 0.3 : 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.15,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <Text style={{
            color: ['black', 'brown', 'blue', 'violet', 'red', 'gray'].includes(color) ? 'white' : 'black',
            fontWeight: 'bold',
            fontSize: 10,
          }}>
            {label}
          </Text>
        </Pressable>
      </Animated.View>
    );
  };
  // Função para calcular o intervalo de tolerância baseado no valor e na cor selecionada
  const calculateToleranceRange = (value: number, toleranceStr: string): [number, number] | null => {
  if (!toleranceStr || !toleranceStr.includes('%')) return null;

  const tolerancePercent = parseFloat(toleranceStr.replace(/[^\d.]/g, ''));
  const toleranceFraction = tolerancePercent / 100;

  const min = value - value * toleranceFraction;
  const max = value + value * toleranceFraction;

  return [min, max];
};

  // Verifica se o valor é um valor comercial da série E12 (resistores padrão de mercado)
  const isCommercialValue = (value: number): boolean => {
    const e12Base = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];
    if (value <= 0) return false;
    const decade = Math.pow(10, Math.floor(Math.log10(value)));
    const normalized = value / decade;
    return e12Base.some((base) => Math.abs(normalized - base) / base < 0.05);
  };

  // Todas as cores selecionadas atualmente nas faixas
  const bandColors = [band1, band2, multiplier, tolerance];

  // Função de formatação da resistência para exibição amigável ao usuário
  const formatResistance = (value: number): string => {
    let formatted = '';
    const formatter = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    if (value >= 1e6) {
      formatted = `${formatter.format(value / 1e6)} MΩ`;
    } else if (value >= 1e3) {
      formatted = `${formatter.format(value / 1e3)} kΩ`;
    } else {
      formatted = `${formatter.format(value)} Ω`;
    }

    return formatted;
  };

  // Renderização da UI principal
  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      {/* Header com gradiente */}
      <View style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: backgroundHeight,
        backgroundColor: '#873939',
        zIndex: 1,
      }}>
        {/* SVG de fundo decorativo - reduzido */}
        <View style={{ position: 'absolute', top: -10, left: 0, right: 0, overflow: 'visible' }}>
          <Svg width="100%" height={150} viewBox="0 0 1024 150" preserveAspectRatio="xMidYMid slice">
            <Defs>
              <LinearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="rgba(0,0,0,0.05)" />
                <Stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
              </LinearGradient>
            </Defs>
            <Path d="M0,0 L1024,0 L1024,120 Q512,140 0,120 Z" fill="url(#headerGradient)" />
          </Svg>
        </View>

        {/* Botão de voltar */}
        <View style={{ 
          position: 'absolute',
          top: insets.top + 10,
          left: 20,
          zIndex: 999,
        }}>
          <Pressable onPress={() => animateBack(() => router.push("/"))}>
            <Animated.View style={{
              transform: [{ scale: backScale }],
              width: 40,
              height: 40,
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.3)',
            }}>
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <Path d="M15 6l-6 6 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </Svg>
            </Animated.View>
          </Pressable>
        </View>

        {/* Título do header - mais compacto */}
        <View style={{
          position: 'absolute',
          top: insets.top + 12,
          left: 80,
          right: 20,
          alignItems: 'flex-start',
        }}>
          <Text style={{ 
            color: 'white', 
            fontSize: 18, 
            fontWeight: 'bold',
            marginBottom: 2,
          }}>
            Calculadora de Resistores
          </Text>
          <Text style={{ 
            color: '#d8cc39', 
            fontSize: 12,
          }}>
            Código de cores • 4 faixas
          </Text>
        </View>
      </View>

      {/* ScrollView com conteúdo - padding reduzido */}
      <ScrollView
        contentContainerStyle={{ 
          flexGrow: 1,
          paddingTop: backgroundHeight + 10,
          paddingHorizontal: 16,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Card do resistor visual - mais compacto */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 16,
          marginBottom: 16,
          padding: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        }}>
          <View style={{ alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ 
              fontSize: 16, 
              fontWeight: '600', 
              color: '#333',
              marginBottom: 8,
            }}>
              Resistor Visual
            </Text>
            
            {/* SVG do resistor - reduzido */}
            <Svg
              width="100%"
              height={60}
              viewBox="0 0 320 80"
              style={{ aspectRatio: 5.3, maxWidth: 280 }}
            >
              {/* Terminais metálicos */}
              <Rect x="10" y="36" width="50" height="8" rx="4" fill="#bbb" />
              <Rect x="260" y="36" width="50" height="8" rx="4" fill="#bbb" />
              {/* Corpo do resistor */}
              <Rect x="60" y="20" width="200" height="40" rx="20" fill="#f5e6b2" stroke="#bfa76a" strokeWidth="2" />
              {/* Sombra */}
              <ellipse cx="160" cy="62" rx="90" ry="8" fill="#000" opacity="0.08" />
              {/* Faixas coloridas */}
              {[band1, band2, multiplier, tolerance].map((color, index) => (
                <Rect
                  key={index}
                  x={92 + index * 40}
                  y={22}
                  width={16}
                  height={36}
                  rx={4}
                  fill={colorHex[color]}
                  stroke="#222"
                  strokeWidth={1.5}
                />
              ))}
              {/* Contorno do corpo */}
              <Rect x="60" y="20" width="200" height="40" rx="20" fill="none" stroke="#8a7c5a" strokeWidth="2.5" />
            </Svg>
          </View>

          {/* Resultado - mais compacto */}
          <View style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 12,
            padding: 12,
            borderLeftWidth: 4,
            borderLeftColor: '#d8cc39',
          }}>
            <Text style={{ 
              fontSize: 14, 
              fontWeight: '600', 
              color: '#333',
              marginBottom: 6,
            }}>
              Resistência Calculada
            </Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ 
                  fontSize: 20, 
                  fontWeight: 'bold', 
                  color: '#873939',
                  marginBottom: 2,
                }}>
                  {formatResistance(result)}
                </Text>
                {toleranceValues[tolerance] && (
                  <Text style={{ 
                    fontSize: 12, 
                    color: '#666',
                  }}>
                    Tolerância: {toleranceValues[tolerance]}
                  </Text>
                )}
              </View>
              
              <View style={{ alignItems: 'center' }}>
                <View style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: isCommercialValue(result) ? '#22c55e' : '#ef4444',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 2,
                }}>
                  <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
                    {isCommercialValue(result) ? '✓' : '✗'}
                  </Text>
                </View>
                <Text style={{ 
                  fontSize: 8, 
                  color: '#666',
                  textAlign: 'center',
                }}>
                  {isCommercialValue(result) ? 'Comercial' : 'Especial'}
                </Text>
              </View>
            </View>

            {/* Botão expandir/recolher - mais compacto */}
            <Pressable
              onPress={() => setIsExpanded(!isExpanded)}
              style={{
                marginTop: 8,
                backgroundColor: '#873939',
                borderRadius: 6,
                paddingVertical: 6,
                paddingHorizontal: 12,
                alignSelf: 'flex-start',
              }}
            >
              <Text style={{ color: 'white', fontWeight: '600', fontSize: 10 }}>
                {isExpanded ? 'Recolher' : 'Mostrar Detalhes'}
              </Text>
            </Pressable>

            {/* Seção expansível - mais compacta */}
            {isExpanded && (
              <View style={{ marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#e5e5e5' }}>
                <View style={{ marginBottom: 8 }}>
                  <Text style={{ 
                    fontSize: 12, 
                    fontWeight: '600', 
                    color: '#333',
                    marginBottom: 2,
                  }}>
                    Série E12:
                  </Text>
                  <Text style={{ fontSize: 10, color: '#666', lineHeight: 14 }}>
                    {isCommercialValue(result) 
                      ? '✓ Este resistor faz parte da série E12 - valores comerciais padrão encontrados no mercado.'
                      : '✗ Este resistor não faz parte da série E12 - pode ser um valor especial ou fora de padrão.'
                    }
                  </Text>
                </View>

                {(() => {
                  const range = calculateToleranceRange(result, toleranceValues[tolerance]);
                  if (range) {
                    return (
                      <View>
                        <Text style={{ 
                          fontSize: 12, 
                          fontWeight: '600', 
                          color: '#333',
                          marginBottom: 2,
                        }}>
                          Faixa de Tolerância:
                        </Text>
                        <Text style={{ fontSize: 10, color: '#666', lineHeight: 14 }}>
                          Mínimo: {formatResistance(range[0])}
                          {'\n'}Máximo: {formatResistance(range[1])}
                        </Text>
                      </View>
                    );
                  }
                  return null;
                })()}
              </View>
            )}
          </View>
        </View>

        {/* Seção dos botões de seleção das faixas */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
          marginBottom: 20,
        }}>

          <ScrollView 
            style={{ maxHeight: 500 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 }}>
              {/* Faixa 1 */}
              <View style={{ alignItems: 'center', width: windowWidth * 0.2 }}>
                <Text style={{ 
                  fontSize: 10, 
                  fontWeight: '600', 
                  marginBottom: 6, 
                  color: '#666',
                }}>
                  1ª Faixa
                </Text>
                <View>
                  {colorOptions.slice(0, 10).map((color, idx) =>
                    renderColorButton(color, setBand1, band1, idx, scaleAnimBand1, false, false, true, true)
                  )}
                </View>
              </View>

              {/* Faixa 2 */}
              <View style={{ alignItems: 'center', width: windowWidth * 0.2 }}>
                <Text style={{ 
                  fontSize: 10, 
                  fontWeight: '600', 
                  marginBottom: 6, 
                  color: '#666',
                }}>
                  2ª Faixa
                </Text>
                <View>
                  {colorOptions.slice(0, 10).map((color, idx) =>
                    renderColorButton(color, setBand2, band2, idx, scaleAnimBand2, false, false, true)
                  )}
                </View>
              </View>

              {/* Multiplicador */}
              <View style={{ alignItems: 'center', width: windowWidth * 0.2 }}>
                <Text style={{ 
                  fontSize: 10, 
                  fontWeight: '600', 
                  marginBottom: 6, 
                  color: '#666',
                }}>
                  Mult.
                </Text>
                <View>
                  {colorOptions.map((color, idx) =>
                    renderColorButton(color, setMultiplier, multiplier, idx, scaleAnimMultiplier, false, true, false)
                  )}
                </View>
              </View>

              {/* Tolerância */}
              <View style={{ alignItems: 'center', width: windowWidth * 0.2 }}>
                <Text style={{ 
                  fontSize: 10, 
                  fontWeight: '600', 
                  marginBottom: 6, 
                  color: '#666',
                }}>
                  Toler.
                </Text>
                <View>
                  {colorOptions.map((color, idx) =>
                    renderColorButton(color, setTolerance, tolerance, idx, scaleAnimTolerance, true, false, false)
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}