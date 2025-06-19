import React, { useState, useEffect } from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { View, Text, Pressable } from 'react-native';

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

  const renderColorButton = (
    color: ColorBand,
    setter: (color: ColorBand) => void,
    selected: ColorBand
  ) => (
    <Pressable
      key={color}
      onPress={() => setter(color)}
      className={`m-1 rounded-lg border-2 ${selected === color ? 'border-4 border-black' : 'border-black'}`}
      style={{
        backgroundColor: colorHex[color],
        width: 40, // Tamanho relativo para responsividade
        height: 32,
        minWidth: 32,
        minHeight: 28,
        maxWidth: 48,
        maxHeight: 40,
      }}
    />
  );

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

  const bandColors = [band1, band2, multiplier, tolerance];

  const formatResistance = (value: number): string => {
    if (value >= 1e6) return `${value / 1e6} MΩ`;
    if (value >= 1e3) return `${value / 1e3} kΩ`;
    return `${value} Ω`;
  };


    return (
        <View className="flex-1 justify-start items-center pt-10 px-2 w-full bg-white">
            <View className="w-full max-w-xl items-center justify-center">
                <Svg width="100%" height={150} viewBox="0 0 1920 1080" style={{ aspectRatio: 1920/1080, maxWidth: 400 }}>
                    <g transform="translate(0.000000,1080.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                        <path d="M6708 6660 c-49 -26 -94 -83 -107 -136 -7 -27 -11 -198 -11 -478 l0 -436 -1497 0 c-1427 0 -1500 -1 -1538 -19 -49 -22 -99 -77 -115 -126 -28 -86 14 -201 93 -253 l42 -27 1507 -3 1507 -2 3 -453 3 -453 26 -49 c18 -35 39 -59 74 -80 l48 -30 2881 -3 2881 -2 52 26 c57 27 93 68 112 123 7 23 11 172 11 477 l0 444 1473 2 1472 3 40 26 c22 15 48 35 57 46 48 54 62 157 29 228 -19 43 -78 100 -118 116 -15 5 -607 9 -1489 9 l-1464 0 0 441 c0 302 -4 454 -11 480 -15 50 -62 105 -110 129 -38 20 -72 20 -2926 20 -2835 -1 -2889 -1 -2925 -20z m5550 -1262 l-3 -853 -2620 0 -2620 0 -3 853 -2 852 2625 0 2625 0 -2 -852z" fill="black"/>
                    </g>
                    {bandColors.map((color, index) => (
                        <Rect
                            key={index}
                            x={765 + index * 120}
                            y={452}
                            width={40}
                            height={175}
                            fill={colorHex[color]}
                        />
                    ))}
                </Svg>
            </View>
            <View className="w-full max-w-xl px-2 py-6">
                <Text className="text-2xl md:text-4xl font-bold mb-2 text-center">Calculadora de Resistores (4 Faixas)</Text>
                <View className="mt-2 items-center">
                    <Text className="text-lg md:text-2xl font-bold text-center">
                        Resistência: {formatResistance(result)} {toleranceValues[tolerance] && `(${toleranceValues[tolerance]})`}
                    </Text>
                </View>
                <View className="flex-row flex-wrap justify-center items-start px-1 py-4 w-full gap-2">
                    {/* Faixa 1 */}
                    <View className="flex-col items-center mx-2">
                        {colorOptions.slice(0, 10).map((color) => renderColorButton(color, setBand1, band1))}
                    </View>
                    {/* Faixa 2 */}
                    <View className="flex-col items-center mx-2">
                        {colorOptions.slice(0, 10).map((color) => renderColorButton(color, setBand2, band2))}
                    </View>
                    {/*Multiplicador */}
                    <View className="flex-col items-center mx-2">
                        {colorOptions.map((color) => renderColorButton(color, setMultiplier, multiplier))}
                    </View>
                    {/* Tolerância */}
                    <View className="flex-col items-center mx-2">
                        {colorOptions.map((color) => renderColorButton(color, setTolerance, tolerance))}
                    </View>
                </View>
            </View>
        </View>
    )
}