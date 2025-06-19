import React, { useState, useEffect } from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { View, Text, Pressable, Animated } from 'react-native';

type ColorBand =
  | 'black'
  | 'brown'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'violet'
  | 'gray'
  | 'white'
  | 'gold'
  | 'silver';

const colorValues: Record<ColorBand, number> = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  gray: 8,
  white: 9,
  gold: -1,
  silver: -2,
};

const toleranceValues: Record<ColorBand, string> = {
  brown: '±1%',
  red: '±2%',
  green: '±0.5%',
  blue: '±0.25%',
  violet: '±0.1%',
  gray: '±0.05%',
  gold: '±5%',
  silver: '±10%',
  black: '',
  orange: '',
  yellow: '',
  white: '',
};

const colorHex: Record<ColorBand, string> = {
  black: '#222222',
  brown: '#4B2E05',
  red: '#FF0000',
  orange: '#ca6f1e',
  yellow: '#FFFF00',
  green: '#008000',
  blue: '#0000FF',
  violet: '#8A2BE2',
  gray: '#808080',
  white: '#FFFFFF',
  gold: '#B69517',
  silver: '#C0C0C0',
};

const colorOptions: ColorBand[] = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'gray',
  'white',
  'gold',
  'silver',
];

export default function Resistor() {
  const [band1, setBand1] = useState<ColorBand>('brown');
  const [band2, setBand2] = useState<ColorBand>('black');
  const [multiplier, setMultiplier] = useState<ColorBand>('red');
  const [tolerance, setTolerance] = useState<ColorBand>('gold');
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    const firstDigit = colorValues[band1];
    const secondDigit = colorValues[band2];
    const multiplierValue = Math.pow(10, colorValues[multiplier]);

    const resistance = (firstDigit * 10 + secondDigit) * multiplierValue;
    setResult(resistance);
  }, [band1, band2, multiplier]);

  // Animações separadas para cada faixa
  const [scaleAnimBand1] = useState(() => colorOptions.slice(0, 10).map(() => new Animated.Value(1)));
  const [scaleAnimBand2] = useState(() => colorOptions.slice(0, 10).map(() => new Animated.Value(1)));
  const [scaleAnimMultiplier] = useState(() => colorOptions.map(() => new Animated.Value(1)));
  const [scaleAnimTolerance] = useState(() => colorOptions.map(() => new Animated.Value(1)));

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

  // Cores de tolerância inválidas
  const disabledTolerance = ['yellow', 'orange'] as ColorBand[];

  const renderColorButton = (
    color: ColorBand,
    setter: (color: ColorBand) => void,
    selected: ColorBand,
    idx: number,
    animArr: Animated.Value[],
    isTolerance?: boolean
  ) => {
    const isDisabled = isTolerance && disabledTolerance.includes(color);
    return (
      <Animated.View key={color} style={{ transform: [{ scale: animArr[idx] }] }}>
        <Pressable
          onPress={() => !isDisabled && handlePress(color, setter, selected, idx, animArr)}
          disabled={isDisabled}
          className={`m-1 rounded-full border-2 ${selected === color ? 'border-4 border-blue-600 shadow-lg' : 'border-gray-400'}`}
          style={{
            backgroundColor: colorHex[color],
            width: 38,
            height: 38,
            minWidth: 32,
            minHeight: 32,
            maxWidth: 44,
            maxHeight: 44,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: isDisabled ? 0.4 : 1,
          }}
        >
          {isDisabled && (
            <Svg width={32} height={32} style={{ position: 'absolute' }}>
              <Path d="M4 28 L28 4" stroke="#333" strokeWidth={3} />
            </Svg>
          )}
        </Pressable>
      </Animated.View>
    );
  };

  const bandColors = [band1, band2, multiplier, tolerance];

  const formatResistance = (value: number): string => {
    if (value >= 1e6) return `${value / 1e6} MΩ`;
    if (value >= 1e3) return `${value / 1e3} kΩ`;
    return `${value} Ω`;
  };


    return (
        <View className="flex-1 justify-start items-center pt-8 px-2 w-full bg-white">
            <View className="w-full max-w-xl items-center justify-center">
                <Text className="text-3xl md:text-5xl font-extrabold mb-4 text-center text-blue-900">Calculadora de Resistores (4 Faixas)</Text>
                <Svg
                  width="100%"
                  height={80}
                  viewBox="0 0 320 80"
                  style={{ aspectRatio: 4, maxWidth: 340 }}
                  accessibilityLabel="Resistor ilustrado"
                >
                  {/* Terminais metálicos */}
                  <Rect x="10" y="36" width="50" height="8" rx="4" fill="#bbb" />
                  <Rect x="260" y="36" width="50" height="8" rx="4" fill="#bbb" />
                  {/* Corpo do resistor */}
                  <Rect x="60" y="20" width="200" height="40" rx="20" fill="#f5e6b2" stroke="#bfa76a" strokeWidth="2" />
                  {/* Sombra */}
                  <ellipse cx="160" cy="62" rx="90" ry="8" fill="#000" opacity="0.08" />
                  {/* Faixas de cor com borda */}
                  {bandColors.map((color, index) => (
                    <Rect
                      key={index}
                      x={80 + index * 40}
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
                  {/* Título e descrição para acessibilidade */}
                  <title>Resistor ilustrado</title>
                  <desc>Desenho de um resistor eletrônico com quatro faixas de cor.</desc>
                </Svg>
            </View>
            <View className="w-full max-w-xl px-2 py-4">
                <View className="items-center">
                  <View className="bg-white rounded-2xl shadow-lg px-6 py-4 mb-4 w-full max-w-md border border-blue-100">
                    <Text className="text-lg md:text-2xl font-bold text-center text-gray-800">
                        Resistência:
                    </Text>
                    <Text className="text-2xl md:text-4xl font-extrabold text-center text-blue-700">
                        {formatResistance(result)} {toleranceValues[tolerance] && `(${toleranceValues[tolerance]})`}
                    </Text>
                  </View>
                </View>
                <View className="flex-row flex-wrap justify-center items-start px-1 py-2 w-full gap-2">
                    {/* Faixa 1 */}
                    <View className="flex-col items-center mx-2">
                      <Text className="text-xs font-semibold mb-1 text-gray-600">Faixa 1</Text>
                        {colorOptions.slice(0, 10).map((color, idx) => renderColorButton(color, setBand1, band1, idx, scaleAnimBand1))}
                    </View>
                    {/* Faixa 2 */}
                    <View className="flex-col items-center mx-2">
                      <Text className="text-xs font-semibold mb-1 text-gray-600">Faixa 2</Text>
                        {colorOptions.slice(0, 10).map((color, idx) => renderColorButton(color, setBand2, band2, idx, scaleAnimBand2))}
                    </View>
                    {/*Multiplicador */}
                    <View className="flex-col items-center mx-2">
                      <Text className="text-xs font-semibold mb-1 text-gray-600">Multiplicador</Text>
                        {colorOptions.map((color, idx) => renderColorButton(color, setMultiplier, multiplier, idx, scaleAnimMultiplier))}
                    </View>
                    {/* Tolerância */}
                    <View className="flex-col items-center mx-2">
                      <Text className="text-xs font-semibold mb-1 text-gray-600">Tolerância</Text>
                        {colorOptions.map((color, idx) => renderColorButton(color, setTolerance, tolerance, idx, scaleAnimTolerance, true))}
                    </View>
                </View>
            </View>
        </View>
    )
}