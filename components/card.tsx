import React from 'react';
import { Pressable, View, Text, Dimensions } from 'react-native';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

// Interface que define as propriedades do componente Card
interface CardProps {
  // Tipo de conteúdo: "formulas" ou "disciplines"  
  // Outros parâmetros para configuração do card, como ícone, título, cor de fundo e link de navegação
  type?: 'formulas' | 'disciplines';
  icon?: string;
  title?: string;
  bgColor?: string;
  link?: string;
}

// Componente que renderiza o ícone de raiz quadrada (SVG)
const SquareRootSVG = () => (
  <View className="h-auto w-auto">
    {/* Ícone representando raiz quadrada */}
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0)">
        <Path
          d="M22.9313 4.65319H11.2877L6.71721 20.7425C6.57898 21.1713 6.1868 21.4682 5.73649 21.4837C5.72379 21.4837 5.71152 21.4841 5.69946 21.4841C5.2639 21.4841 4.87 21.219 4.70712 20.8124L2.83859 16.1412H1.06851C0.478194 16.1413 0 15.6628 0 15.0726C0 14.4824 0.478678 14.004 1.06851 14.004H3.56223C3.99871 14.004 4.39229 14.2699 4.55457 14.6759L5.59003 17.2644L9.49094 3.25779C9.63299 2.81572 10.0442 2.51601 10.5084 2.51601H22.9314C23.5219 2.51601 24.0001 2.99453 24.0001 3.58452C24.0001 4.17451 23.5215 4.65319 22.9313 4.65319ZM23.5072 19.013L19.2948 14.2814L23.309 9.82552C23.3799 9.74726 23.3971 9.6346 23.3551 9.53804C23.3118 9.44164 23.2164 9.37947 23.1107 9.37947H20.5712C20.4936 9.37947 20.4204 9.41332 20.3689 9.47205L17.6744 12.5965L15.0006 9.47302C14.9501 9.41365 14.8759 9.37947 14.7976 9.37947H12.1422C12.0369 9.37947 11.9414 9.44131 11.8988 9.53712C11.8552 9.6332 11.873 9.7457 11.9432 9.82413L15.9125 14.2815L11.7333 19.0141C11.6635 19.0929 11.647 19.2053 11.6896 19.3007C11.7333 19.3968 11.8288 19.4579 11.9333 19.4579H14.5654C14.6447 19.4579 14.7197 19.4229 14.7703 19.3618L17.5596 16.0148L20.4151 19.3644C20.4662 19.4241 20.5404 19.4582 20.6186 19.4582H23.3083C23.4139 19.4582 23.5094 19.3968 23.552 19.3007C23.595 19.2042 23.5778 19.0918 23.5072 19.013Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  </View>
);

// Componente que renderiza o ícone com três pontos (SVG)
const ThreeDotsSVG = () => (
  <View className="h-auto w-auto rounded-full">
    {/* Ícone representando três pontos */}
    <Svg fill="#fff" height="24" width="24" viewBox="0 0 32.055 32.055">
      <G>
        <Path
          d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
            C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
            s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
            c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"
        />
      </G>
    </Svg>
  </View>
);

export default function Card({ type = "formulas", icon = "formulas", title = "formulas", bgColor = "#FF7648", link = "/" }: CardProps) {
  // Hook de navegação para redirecionamento entre telas
  const navigation = useNavigation<any>();
  
  // Função que lida com o clique no card e realiza a navegação para a rota indicada
  const handleClick = () => {
    navigation.navigate(link);
  };

  // Obtenção da largura da tela para definição de dimensões responsivas
  const { width } = Dimensions.get('window');
  const cardWidth = width * 0.4; // Aproximadamente 40% da largura da tela

  return (
    <Pressable onPress={handleClick} className="p-3 mt-3 flex-row">
      <View 
        className="p-4 rounded-xl grid-rows-2" 
        style={{ 
          width: cardWidth, 
          height: cardWidth * 0.75, 
          backgroundColor: bgColor 
        }}
      >
        <View className="flex-row justify-between">
          <SquareRootSVG />
          <ThreeDotsSVG />
        </View>
        <Text className="text-white text-lg font-regular flex-row items-end">
          {title} {/* Exibe o título do card para identificação */}
        </Text>
      </View>
    </Pressable>
  );
}