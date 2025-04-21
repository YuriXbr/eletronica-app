import React, { useState } from 'react';
import { Dimensions, View, Text, ScrollView } from 'react-native';
import Card from "@/components/card";
import Svg, { Path } from 'react-native-svg';

const windowHeight = Dimensions.get('window').height;
const initialHeight = windowHeight * 0.66; // 66% da tela

export default function HomeScreen() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleScroll = (event: any) => {
    // Se o usuário scrolar verticalmente mais de 50, expande o container
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 50 && !isExpanded) {
      setIsExpanded(true);
    } else if (offsetY <= 50 && isExpanded) {
      setIsExpanded(false);
    }
  };

  return (
    <View className="flex-1 bg-backgreen relative">
      {/* Top background e decorações */}
      <View className="absolute top-0 left-0">
        <View className="w-12 h-12 z-10 p-4 m-7 bg-zinc-400/20 rounded-xl items-center justify-center">
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M21.71 20.29L18 16.61C19.4401 14.8144 20.1375 12.5353 19.9488 10.2413C19.7601 7.9473 18.6997 5.81278 16.9855 4.27664C15.2714 2.7405 13.0338 1.91951 10.7329 1.98247C8.43203 2.04543 6.24272 2.98756 4.61514 4.61514C2.98756 6.24272 2.04543 8.43203 1.98247 10.7329C1.91951 13.0338 2.7405 15.2714 4.27664 16.9855C5.81278 18.6997 7.9473 19.7601 10.2413 19.9488C12.5353 20.1375 14.8144 19.4401 16.61 18L20.29 21.68C20.383 21.7737 20.4936 21.8481 20.6154 21.8989C20.7373 21.9497 20.868 21.9758 21 21.9758C21.132 21.9758 21.2627 21.9497 21.3846 21.8989C21.5064 21.8481 21.617 21.7737 21.71 21.68C21.8902 21.4935 21.991 21.2443 21.991 20.985C21.991 20.7257 21.8902 20.4765 21.71 20.29ZM11 18C9.61553 18 8.26215 17.5895 7.111 16.8203C5.95986 16.0511 5.06265 14.9579 4.53284 13.6788C4.00303 12.3997 3.8644 10.9922 4.1345 9.63436C4.4046 8.2765 5.07128 7.02922 6.05025 6.05025C7.02922 5.07128 8.2765 4.4046 9.63436 4.1345C10.9922 3.8644 12.3997 4.00303 13.6788 4.53284C14.9579 5.06265 16.0511 5.95986 16.8203 7.111C17.5895 8.26215 18 9.61553 18 11C18 12.8565 17.2625 14.637 15.9497 15.9497C14.637 17.2625 12.8565 18 11 18Z" fill="white"/>
          </Svg>
        </View>
        <View className="pt-12">
          <View className="items-end">
            <Svg width="299" height="299" viewBox="0 0 299 299" fill="none">
              <Path opacity="0.05" d="M57.1749 298.404C37.6749 298.604 8.57494 287.804 13.4749 263.604C16.7749 247.204 2.97494 231.804 0.474936 215.304C-2.42506 196.304 8.17493 176.104 26.2749 166.204C32.6749 162.704 40.2749 160.204 44.6749 154.604C58.3749 137.604 35.3749 116.404 44.1749 93.6038C49.2749 80.5038 64.1749 73.3038 84.0749 74.5038C104.475 75.8038 124.075 72.0038 126.575 53.5038C128.675 38.6038 128.475 28.1038 144.275 15.3038C170.475 -5.99622 235.975 -8.79622 249.275 31.2038C253.175 42.8038 264.175 68.2038 302.475 46.7038C332.275 29.9038 402.875 49.3038 380.275 97.7038C371.375 116.804 388.875 122.904 415.975 132.804C436.275 140.204 453.275 177.104 411.675 208.804C405.675 213.304 419.675 226.204 425.475 230.904C458.875 257.904 427.475 297.704 396.075 298.404C396.075 298.404 76.6749 298.204 57.1749 298.404Z" fill="white"/>
            </Svg>
            <View className="absolute -translate-y-20 z-10">
              <Svg width="160" height="211" viewBox="0 0 160 211" fill="none">
                <Path d="M105.272 4.62249L37.304 153.54L40.1241 154.828L108.092 5.90961L105.272 4.62249Z" fill="#00664F"/>
                <Path d="M36.7749 158.346C34.4749 157.346 33.4749 154.546 34.4749 152.246C35.4749 149.946 38.2749 148.946 40.5749 149.946C79.3749 167.646 125.275 150.546 142.975 111.746C160.675 72.9463 143.575 27.0463 104.775 9.34627C102.475 8.34627 101.475 5.54627 102.475 3.24627C103.475 0.946268 106.275 -0.0537354 108.575 0.946265C151.875 20.7463 171.075 72.0463 151.275 115.446C131.475 159.046 80.1749 178.146 36.7749 158.346Z" fill="#00664F"/>
                <Path d="M72.6749 152.146C112.66 152.146 145.075 119.732 145.075 79.7463C145.075 39.7608 112.66 7.34625 72.6749 7.34625C32.6895 7.34625 0.274937 39.7608 0.274937 79.7463C0.274937 119.732 32.6895 152.146 72.6749 152.146Z" fill="#B0DDC9"/>
              </Svg>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom content: container que expande com o scroll vertical */}
      <ScrollView 
        onScroll={handleScroll}
        scrollEventThrottle={16} 
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{
          height: isExpanded ? windowHeight : initialHeight,
        }}
        className="bg-white rounded-t-3xl absolute bottom-0 w-full pl-6"
      >
        <Text className="text-textprimary text-2xl font-bold pt-7">Cartões</Text>
        <Text className="text-textsecundary text-lg font-bold">Recomendado para você</Text>
        <View className="relative">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            className="flex-row mt-4"
          >
            <Card type="formulas" icon="formulas" title="Fórmulas" bgColor="#FF7648" link="formulas" />
            <Card type="disciplines" icon="disciplines" title="Disciplinas" bgColor="#8F98FF" link="formulas" />
            <Card type="formulas" icon="" title="Work In Progress" bgColor="#FF7648" link="formulas" />
            <Card type="formulas" icon="" title="Work In Progress" bgColor="#FF7648" link="formulas" />
          </ScrollView>
          {/* Indicadores de scroll horizontal */}
          <View className="absolute inset-y-0 left-0 justify-center">
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M15 6l-6 6 6 6" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
          <View className="absolute inset-y-0 right-0 justify-center">
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M9 6l6 6-6 6" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
        </View>
        {/* Seção de Últimas Disciplinas Acessadas em lista vertical */}
        <View className="mt-6 pb-4">
          <Text className="text-textprimary text-2xl font-bold">Últimas Disciplinas Acessadas</Text>
          <View className="mt-4">
            <Card type="disciplines" icon="disciplines" title="Eletricidade I" bgColor="#8F98FF" link="disciplina/eletricidade-i" />
            <Card type="disciplines" icon="disciplines" title="Eletricidade II" bgColor="#8F98FF" link="disciplina/eletricidade-ii" />
            <Card type="disciplines" icon="disciplines" title="Eletricidade III" bgColor="#8F98FF" link="disciplina/eletricidade-iii" />
            {/* Adicione mais cards verticalmente conforme necessário */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}