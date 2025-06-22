import React, { useState, useRef } from 'react';
import { Dimensions, View, Text, ScrollView, Animated } from 'react-native';
import Card from "@/components/card";
import Svg, { Path } from 'react-native-svg';

const SCROLL_INPUT_RANGE = [0, 500];
const SCROLL_OUTPUT_RANGE = [0, -130];

const windowHeight = Dimensions.get('window').height;

export default function HomeScreen() {

  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    
    /* Top background */
     <Animated.ScrollView
      
      onScroll={Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  )}
  scrollEventThrottle={16}
  
    >
      <Animated.View //Animação sutil do top background
  
  style={{ 
    
    
    transform: [
      {
        translateY: scrollY.interpolate({
          inputRange: SCROLL_INPUT_RANGE,
          outputRange: SCROLL_OUTPUT_RANGE,
          extrapolate: 'clamp',
        }),
      },
    ],
  }}
>
      <View className="flex-1 bg-backgreen relative">
      <View className="w-full">
        
        <View className="w-12 h-12 z-10 p-4 m-7 bg-zinc-400/20 rounded-xl items-center justify-center">
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M21.71 20.29L18 16.61C19.4401 14.8144 20.1375 12.5353 19.9488 10.2413C19.7601 7.9473 18.6997 5.81278 16.9855 4.27664C15.2714 2.7405 13.0338 1.91951 10.7329 1.98247C8.43203 2.04543 6.24272 2.98756 4.61514 4.61514C2.98756 6.24272 2.04543 8.43203 1.98247 10.7329C1.91951 13.0338 2.7405 15.2714 4.27664 16.9855C5.81278 18.6997 7.9473 19.7601 10.2413 19.9488C12.5353 20.1375 14.8144 19.4401 16.61 18L20.29 21.68C20.383 21.7737 20.4936 21.8481 20.6154 21.8989C20.7373 21.9497 20.868 21.9758 21 21.9758C21.132 21.9758 21.2627 21.9497 21.3846 21.8989C21.5064 21.8481 21.617 21.7737 21.71 21.68C21.8902 21.4935 21.991 21.2443 21.991 20.985C21.991 20.7257 21.8902 20.4765 21.71 20.29ZM11 18C9.61553 18 8.26215 17.5895 7.111 16.8203C5.95986 16.0511 5.06265 14.9579 4.53284 13.6788C4.00303 12.3997 3.8644 10.9922 4.1345 9.63436C4.4046 8.2765 5.07128 7.02922 6.05025 6.05025C7.02922 5.07128 8.2765 4.4046 9.63436 4.1345C10.9922 3.8644 12.3997 4.00303 13.6788 4.53284C14.9579 5.06265 16.0511 5.95986 16.8203 7.111C17.5895 8.26215 18 9.61553 18 11C18 12.8565 17.2625 14.637 15.9497 15.9497C14.637 17.2625 12.8565 18 11 18Z" fill="white" />{/*Lupa*/}
          </Svg>
        </View>
        <View className="pt-12">
          <View className="items-start ml-40 mt-0 left-10">
            <Svg width="299" height="299" viewBox="0 0 299 299" fill="none">
              <Path opacity="0.05" d="M57.1749 298.404C37.6749 298.604 8.57494 287.804 13.4749 263.604C16.7749 247.204 2.97494 231.804 0.474936 215.304C-2.42506 196.304 8.17493 176.104 26.2749 166.204C32.6749 162.704 40.2749 160.204 44.6749 154.604C58.3749 137.604 35.3749 116.404 44.1749 93.6038C49.2749 80.5038 64.1749 73.3038 84.0749 74.5038C104.475 75.8038 124.075 72.0038 126.575 53.5038C128.675 38.6038 128.475 28.1038 144.275 15.3038C170.475 -5.99622 235.975 -8.79622 249.275 31.2038C253.175 42.8038 264.175 68.2038 302.475 46.7038C332.275 29.9038 402.875 49.3038 380.275 97.7038C371.375 116.804 388.875 122.904 415.975 132.804C436.275 140.204 453.275 177.104 411.675 208.804C405.675 213.304 419.675 226.204 425.475 230.904C458.875 257.904 427.475 297.704 396.075 298.404C396.075 298.404 76.6749 298.204 57.1749 298.404Z" fill="black" />{/*Sei la o que é isso*/}
            </Svg>
            
            <View className="absolute top-[11px]  -translate-y-20 z-20 w-40 left-20">
              <Svg width="160" height="211" viewBox="0 0 160 211" fill="none">
  <g id="Group">
    <g id="Group_2">
      <Path id="Vector" d="M105.272 4.62249L37.304 153.54L40.1241 154.828L108.092 5.90961L105.272 4.62249Z" fill="#017567" />{/*cabo do globo*/}
    </g>
    <g id="Group_3">
      <Path id="Vector_2" d="M36.7749 158.346C34.4749 157.346 33.4749 154.546 34.4749 152.246C35.4749 149.946 38.2749 148.946 40.5749 149.946C79.3749 167.646 125.275 150.546 142.975 111.746C160.675 72.9463 143.575 27.0463 104.775 9.34627C102.475 8.34627 101.475 5.54627 102.475 3.24627C103.475 0.946268 106.275 -0.0537354 108.575 0.946265C151.875 20.7463 171.075 72.0463 151.275 115.446C131.475 159.046 80.1749 178.146 36.7749 158.346Z" 
      fill="#017567" />{/*cabo do globo*/}
    </g>
    <Path id="Vector_3" d="M72.6749 152.146C112.66 152.146 145.075 119.732 145.075 79.7463C145.075 39.7608 112.66 7.34625 72.6749 7.34625C32.6895 7.34625 0.274937 39.7608 0.274937 79.7463C0.274937 119.732 32.6895 152.146 72.6749 152.146Z" 
    fill="#B0DDC9" />
    <Path id="Vector_4" d="M138.575 109.846C136.075 115.346 132.975 120.346 129.375 124.946C120.775 128.546 111.175 129.746 101.975 128.146C100.775 127.946 99.5749 127.646 98.6749 126.846C95.9749 124.446 98.2749 120.146 98.2749 116.546C98.2749 113.546 96.4749 110.846 94.7749 108.346C90.9749 102.746 87.1749 95.8463 89.4749 89.3463C91.7749 82.8463 99.4749 79.3463 101.475 72.7463C103.275 66.4463 99.1749 59.9463 99.0749 53.3463C98.9749 48.2463 101.475 43.3463 104.975 39.7463C108.575 36.1463 113.175 33.7463 117.975 32.0463C120.475 31.1463 123.275 30.5463 125.975 30.5463C145.075 51.4463 151.075 82.5463 138.575 109.846ZM50.6749 147.346C54.3749 145.546 57.4749 142.146 58.1749 138.146C58.8749 133.746 56.6749 129.446 53.9749 125.946C51.1749 122.446 47.8749 119.446 45.5749 115.646C44.5749 114.046 43.8749 112.246 43.8749 110.346C43.9749 105.146 49.5749 101.546 50.1749 96.4463C50.7749 91.9463 47.1749 87.8463 43.1749 85.8463C39.0749 83.8463 34.4749 83.3463 30.0749 82.1463C25.6749 80.9463 21.2749 78.5463 19.4749 74.3463C17.2749 69.0463 20.0749 62.7463 17.0749 57.7463C15.1749 54.5463 10.1749 52.4463 5.87494 51.7463C-9.22507 87.6463 6.87493 129.346 42.5749 145.646C44.6749 146.546 46.6749 147.446 48.7749 148.146C49.4749 147.946 50.0749 147.646 50.6749 147.346ZM30.5749 20.8463C30.7749 21.6463 31.0749 22.4463 31.4749 23.1463C34.9749 30.5463 42.4749 36.1463 43.5749 44.2463C43.8749 46.4463 43.7749 48.9463 45.1749 50.6463C45.8749 51.5463 46.9749 52.0463 48.0749 52.5463C57.1749 56.3463 68.5749 53.6463 74.8749 46.0463C80.9749 38.6463 82.0749 28.3463 86.8749 20.0463C88.2749 17.6463 89.9749 15.3463 89.9749 12.5463C89.9749 11.3463 89.5749 10.2463 88.9749 9.24627C68.3749 4.44627 47.1749 8.94627 30.5749 20.8463Z" 
    fill="#2EA889" />
    <Path id="Vector_5" d="M79.7749 164.446H65.5749V198.246H79.7749V164.446Z" 
    fill="#017567" /> {/*cabo do globo*/}
    <Path id="Vector_6" d="M128.775 210.346H16.5749C12.8749 210.346 9.97493 207.346 9.97493 203.746C9.97493 200.046 12.9749 197.146 16.5749 197.146H128.675C132.375 197.146 135.275 200.146 135.275 203.746C135.375 207.346 132.375 210.346 128.775 210.346Z" 
    fill='#017567' />{/*cabo do globo*/}
  </g>
</Svg>
            </View>
          </View>
        </View>
      </View>
      </View>
      </Animated.View>

      {/* Conteúdo principal com Cartões */}
      <Animated.View 
  style={{
    transform: [
      {
        translateY: scrollY.interpolate({
          inputRange: [0, 200],
          outputRange: [0, -120],
          extrapolate: 'clamp',
        }),
      },
    ],
  }}
>
      <View className="bg-white rounded-t-3xl w-full pl-6 pt-7 -mt-40">
        <Text className="text-textprimary text-2xl font-bold">Cartões</Text>
        <Text className="text-textsecundary text-lg font-bold">Recomendado para você</Text>
        
        <View className="relative">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            className="flex-row mt-4"
          >
            <Card type="formulas" icon="formulas" title="Fórmulas" bgColor="#FF7648" link="formulas" />
            <Card type="disciplines" icon="disciplines" title="Disciplinas" bgColor="#8F98FF" link="formulas" />
            <Card type="formulas" icon="ohm" title="Cálculo de Resistores" bgColor="#FF7648" link="resistor" />
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

        {/* Últimas Disciplinas Acessadas */}
        <View className="mt-6 pb-10">
          <Text className="text-textprimary text-2xl font-bold">Últimas Disciplinas Acessadas</Text>
          <View className="mt-4">
            <Card type="disciplines" icon="disciplines" title="Eletricidade I" bgColor="#8F98FF" link="disciplina/eletricidade-i" />
            <Card type="disciplines" icon="disciplines" title="Eletricidade II" bgColor="#8F98FF" link="disciplina/eletricidade-ii" />
            <Card type="disciplines" icon="disciplines" title="Eletricidade III" bgColor="#8F98FF" link="disciplina/eletricidade-iii" />
          </View>
        </View>
      </View>
      </Animated.View>
    </Animated.ScrollView>
  );
}