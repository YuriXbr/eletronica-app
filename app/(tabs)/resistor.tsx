import React, { useState, useEffect } from 'react';
import Svg, { Rect } from 'react-native-svg';
import { View,ScrollView, Text, Pressable, Animated } from 'react-native';
import { Link, useRouter } from "expo-router";

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
  // Estados para cada faixa do resistor
  const [band1, setBand1] = useState<ColorBand>('brown');
  const [band2, setBand2] = useState<ColorBand>('black');
  const [multiplier, setMultiplier] = useState<ColorBand>('red');
  const [tolerance, setTolerance] = useState<ColorBand>('gold');
  const [result, setResult] = useState<number>(0);

  // Recalcula a resistência sempre que uma faixa muda
  useEffect(() => {
    const firstDigit = colorValues[band1];
    const secondDigit = colorValues[band2];
    const multiplierValue = Math.pow(10, colorValues[multiplier]);

    const resistance = (firstDigit * 10 + secondDigit) * multiplierValue;
    setResult(resistance);
  }, [band1, band2, multiplier]);

  // Animações para cada faixa ao serem pressionadas
  const [scaleAnimBand1] = useState(() => colorOptions.slice(0, 10).map(() => new Animated.Value(1)));
  const [scaleAnimBand2] = useState(() => colorOptions.slice(0, 10).map(() => new Animated.Value(1)));
  const [scaleAnimMultiplier] = useState(() => colorOptions.map(() => new Animated.Value(1)));
  const [scaleAnimTolerance] = useState(() => colorOptions.map(() => new Animated.Value(1)));

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
  // Animação de escala para o botão de voltar
  const backScale = React.useRef(new Animated.Value(1)).current;

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
      <Animated.View key={color} style={{ transform: [{ scale: animArr[idx] }] }}>
        <Pressable
          onPress={() => !isDisabled && handlePress(color, setter, selected, idx, animArr)}
          disabled={isDisabled}
          className={`m-1 rounded-lg border-2 ${selected === color ? 'border-4 border-blue-600 shadow-lg' : 'border-gray-650'}`}
          style={{
            backgroundColor: colorHex[color],
            width: 65,
            height: 34,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: isDisabled ? 0 : 1,
          }}
        >
          <Text
            style={{
              color: color === 'black' || color === 'brown' || color === 'blue' || color === 'violet' || color === 'red' || color === 'gray' ? 'white' : 'black',
              fontWeight: 'bold',
              fontSize: 14,
            }}
          >
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

  const [isExpanded, setIsExpanded] = useState(false);

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
    <ScrollView
  contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 20, paddingHorizontal: 8, backgroundColor: 'white' }}
  showsVerticalScrollIndicator={true}
>
  
      
        
        {/* Título no topo */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 8,marginLeft: 4}}>
          <View style={{ position: 'absolute', left: -67, top: 0 }}>
  <Pressable onPress={() => animateBack(() => router.push("/"))}>
  <Animated.View
    style={{
      transform: [{ scale: backScale }],
      width: 50,
      height: 50,
      backgroundColor: '#207261', // backgreen
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <svg
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 52 52"
    >
      <path d="M48.6,23H15.4c-0.9,0-1.3-1.1-0.7-1.7l9.6-9.6c-0.6-0.6-0.6-1.5,0-2.1l-2.2-2.2c-0.6-0.6-1.5-0.6-2.1,0 L2.5,25c-0.6,0.6-0.6,1.5,0,2.1L20,44.6c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1l-9.6-9.6C14,30.1,14.4,29,15.3,29 h33.2c0.8,0,1.5-0.6,1.5-1.4v-3C50,23.8,49.4,23,48.6,23z" />
    </svg>
  </Animated.View>
</Pressable>
  </View>
        <View className="w-full max-w-xl items-center justify-center">
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2563EB', marginBottom: 2 }}>
      Calculadora de Resistores:
      </Text>
        {/* SVG do resistor visual */}
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
          {/* Faixas coloridas */}
          {bandColors.map((color, index) => (
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
      </View>

      {/* Exibição do resultado da resistência */}
      <View className="w-full max-w-xl pt-1 px-2 py-1">
        <View className="items-center">
          <View className="bg-white rounded-2xl shadow-lg px-6 py-2 mb-2 w-full max-w-md border border-blue-100">
            <Text className="text-lg mg:text-2xl font-bold text-center text-gray-800">
              Resistência:
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Text className="text-2xl md:text-4xl font-extrabold text-center text-blue-700">
                {formatResistance(result)} {toleranceValues[tolerance] && `(${toleranceValues[tolerance]})`}
              </Text>

              {/* Indicação visual se o valor é comercial */}
              <Text
                style={{
                  color: isCommercialValue(result) ? 'green' : 'red',
                  fontSize: 24,
                  marginLeft: 8,
                  fontWeight: 'bold',
                }}
              >
                {isCommercialValue(result) ? '✔' : '✖'}
              </Text>
            </View>
  
  <Pressable
  onPress={() => setIsExpanded(!isExpanded)}
  style={{
    marginTop: 6,
    alignSelf: 'center',
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: '#2563EB', // azul
    borderRadius: 8,
  }}
>
  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14}}>
    {isExpanded ? 'Recolher' : 'Mostrar Mais'}
  </Text>
</Pressable>
{isExpanded && (
  <View style={{ marginTop: 10 }}>
    {isCommercialValue(result) ? (
      <Text style={{ color: '#444', fontSize: 14 }}>
        <Text style={{ color: 'green', fontWeight: 'bold' }}>✔</Text> : Este resistor faz parte da tabela E12.
        {'\n'}A série E12 contém os valores comerciais mais comuns encontrados no mercado, em passos de 12 valores por década.
      </Text>
    ) : (
      <Text style={{ color: '#444', fontSize: 14 }}>
        <Text style={{ color: 'red', fontWeight: 'bold' }}>✖</Text> : Este resistor não faz parte da tabela E12.
        {'\n'}Isso significa que o valor calculado não é um dos 12 valores padronizados da série comercial, podendo ser um valor especial ou fora de padrão.
      </Text>
    )}
    {(() => {
  const range = calculateToleranceRange(result, toleranceValues[tolerance]);
  if (range) {
    return (
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: '#444', fontSize: 14 }}>
          Faixa de resistência considerando a tolerância ({toleranceValues[tolerance]}):
          {'\n'}Mínima: {formatResistance(range[0])}
          {'\n'}Máxima: {formatResistance(range[1])}
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
        <View className="flex-row flex-wrap justify-center items-start px-1 py-2 w-full gap-2">
          {/* Faixa 1 */}
          <View className="flex-col items-center mx-2">
            <Text className="text-xs font-semibold mb-1 text-gray-600">Faixa 1</Text>
            {colorOptions.slice(0, 10).map((color, idx) =>
              renderColorButton(color, setBand1, band1, idx, scaleAnimBand1, false, false, true, true)
            )}
          </View>

          {/* Faixa 2 */}
          <View className="flex-col items-center mx-2">
            <Text className="text-xs font-semibold mb-1 text-gray-600">Faixa 2</Text>
            {colorOptions.slice(0, 10).map((color, idx) =>
              renderColorButton(color, setBand2, band2, idx, scaleAnimBand2, false, false, true)
            )}
          </View>

          {/* Multiplicador */}
          <View className="flex-col items-center mx-2">
            <Text className="text-xs font-semibold mb-1 text-gray-600">Multiplicador</Text>
            {colorOptions.map((color, idx) =>
              renderColorButton(color, setMultiplier, multiplier, idx, scaleAnimMultiplier, false, true, false)
            )}
          </View>

          {/* Tolerância */}
          <View className="flex-col items-center mx-2">
            <Text className="text-xs font-semibold mb-1 text-gray-600">Tolerância</Text>
            {colorOptions.map((color, idx) =>
              renderColorButton(color, setTolerance, tolerance, idx, scaleAnimTolerance, true, false, false)
            )}
          </View>
        </View>
        
      </View>
    </ScrollView>
  );
}