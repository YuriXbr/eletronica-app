import React from 'react';
import { Pressable, View, Text, Dimensions, Modal, Pressable as RNPressable, UIManager, findNodeHandle, Animated } from 'react-native';
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
  
  const OhmSVG = () => (<View className="h-auto w-auto">
    {/* Ícone representando ohm */}
    <Svg width="24" height="24" viewBox="0 0 28 28"fill="white">
      <G clipPath="url(#clip0)">
            <path d="M0.909091 24V21.5H5.77273V21.3182C4.27273 20.3409 3.08712 19.0492 2.21591 17.4432C1.3447 15.8371 0.909091 13.9318 0.909091 11.7273C0.909091 10.0682 1.15909 8.54924 1.65909 7.17045C2.16667 5.78409 2.87879 4.58712 3.79545 3.57954C4.71212 2.57197 5.79545 1.79167 7.04545 1.23864C8.30303 0.685605 9.68182 0.40909 11.1818 0.40909C12.6818 0.40909 14.0568 0.685605 15.3068 1.23864C16.5644 1.79167 17.6515 2.57197 18.5682 3.57954C19.4848 4.58712 20.1932 5.78409 20.6932 7.17045C21.2008 8.54924 21.4545 10.0682 21.4545 11.7273C21.4545 13.9318 21.0189 15.8371 20.1477 17.4432C19.2765 19.0492 18.0909 20.3409 16.5909 21.3182V21.5H21.4545V24H13.1818V20.8182C14.1818 20.3939 15.1023 19.7462 15.9432 18.875C16.7841 17.9962 17.4583 16.9508 17.9659 15.7386C18.4735 14.5189 18.7273 13.1818 18.7273 11.7273C18.7273 10.1061 18.4053 8.64015 17.7614 7.32954C17.1174 6.01894 16.2273 4.97727 15.0909 4.20454C13.9545 3.43182 12.6515 3.04545 11.1818 3.04545C10.0833 3.04545 9.07197 3.26894 8.14773 3.71591C7.22349 4.1553 6.42424 4.77273 5.75 5.56818C5.08333 6.35606 4.56439 7.27652 4.19318 8.32955C3.82197 9.375 3.63636 10.5076 3.63636 11.7273C3.63636 13.1818 3.89015 14.5189 4.39773 15.7386C4.9053 16.9508 5.57955 17.9962 6.42045 18.875C7.26136 19.7462 8.18182 20.3939 9.18182 20.8182V24H0.909091Z" fill="white" />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  </View>
  );
  
  // Mapeamento de ícones para tipos de card
  const iconMap: Record<string, React.ReactNode> = {
  formulas: <SquareRootSVG />,
  ohm: <OhmSVG />
 
};


export default function Card({ type = "formulas", icon = "formulas", title = "formulas", bgColor = "#FF7648", link = "/" }: CardProps) {
  // Hook de navegação para redirecionamento entre telas
  const navigation = useNavigation<any>();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [menuPos, setMenuPos] = React.useState<{x: number, y: number, align: 'left' | 'right'}>({x: 0, y: 0, align: 'right'});
  const dotsRef = React.useRef<any>(null);
  const handleClick = () => {
    navigation.navigate(link);
  };
  // Animação de escala para o card
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const dotsScale = React.useRef(new Animated.Value(1)).current;
  // Função que lida com o clique no card e realiza a navegação para a rota indicada(animação de escala)
  const handleCardPress = () => {
  Animated.sequence([
    Animated.timing(scaleAnim, {
      toValue: 1.1,
      duration: 60,
      useNativeDriver: true,
    }),
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 60,
      useNativeDriver: true,
    }),
  ]).start(() => {
    handleClick();
  });
};
// Função que anima os três pontos com um efeito de escala
const animateDots = (callback?: () => void) => {
  Animated.sequence([
    Animated.timing(dotsScale, { toValue: 1.15, duration: 100, useNativeDriver: true }),
    Animated.timing(dotsScale, { toValue: 1, duration: 100, useNativeDriver: true }),
  ]).start(() => {
    if (callback) callback();
  });
};  
  

  // Obtenção da largura da tela para definição de dimensões responsivas
  const { width } = Dimensions.get('window');
  const cardWidth = width * 0.4; // Aproximadamente 20% da largura da tela

  const openMenu = () => {
    if (dotsRef.current) {
      const node = findNodeHandle(dotsRef.current);
      if (node && UIManager.measureInWindow) {
        UIManager.measureInWindow(node, (px, py, width, height) => {
          const screenWidth = Dimensions.get('window').width;
          const menuWidth = 200; // Largura estimada do menu
          let align: 'left' | 'right' = 'right';
          let x = px + width;
          if (x + menuWidth > screenWidth) {
            align = 'left';
            x = px - menuWidth;
          }
          setMenuPos({ x, y: py, align });
          setModalVisible(true);
        });
      }
    }
  };

  return (
    <>
      {/* Card que exibe o ícone, título e três pontos para abrir o menu */}
      
      <Pressable onPress={handleCardPress} className="p-3 mt-3 flex-row">
  <Animated.View
    style={{
      transform: [{ scale: scaleAnim }],
      width: cardWidth,
      height: cardWidth * 0.70,
      backgroundColor: bgColor,
      borderRadius: 16,
      padding: 16,
    }}
  >
    
  {/* Area dos icones */}
    <View className="flex-row justify-between items-center">
            {iconMap[icon] ?? <SquareRootSVG />}
            <RNPressable
  ref={dotsRef}
  onPress={() => animateDots(openMenu)}
  hitSlop={10}
  style={{ padding: 2 }}
>
  <Animated.View style={{ transform: [{ scale: dotsScale }] }}>
    <ThreeDotsSVG />
  </Animated.View>
</RNPressable>
          </View>
          <Text className="text-white text-md font-regular flex-row items-end mt-2">
            {title}
          </Text>
        
  </Animated.View>
</Pressable>
      {/* Menu popover ao lado dos três pontinhos */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={{ flex: 1 }} onPress={() => setModalVisible(false)}>
          <View style={{
            position: 'absolute',
            left: menuPos.x,
            top: menuPos.y,
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: 20,
            elevation: 8,
            minWidth: 180,
            maxWidth: 220,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
          }}>
            <Text className="text-base font-bold mb-2 text-gray-800">Opções</Text>
            <RNPressable className="py-2 w-full" onPress={() => {}}>
              <Text className="text-blue-600 text-base text-center">Como usar</Text>
            </RNPressable>
            <RNPressable className="py-2 w-full" onPress={() => {}}>
              <Text className="text-yellow-600 text-base text-center">Favoritar</Text>
            </RNPressable>
            <RNPressable className="py-2 w-full" onPress={() => {}}>
              <Text className="text-red-600 text-base text-center">Esconder</Text>
            </RNPressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}