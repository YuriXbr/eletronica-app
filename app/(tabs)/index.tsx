import React, { useState, useRef } from 'react';
import { Dimensions, View, Text, ScrollView, Animated } from 'react-native';
import Card from "@/components/card";
import Svg, { Path } from 'react-native-svg';

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
          <View className="items-start ml-40 mt-0">
            <Svg width="299" height="299" viewBox="0 0 299 299" fill="none">
              <Path opacity="0.05" d="M57.1749 298.404C37.6749 298.604 8.57494 287.804 13.4749 263.604C16.7749 247.204 2.97494 231.804 0.474936 215.304C-2.42506 196.304 8.17493 176.104 26.2749 166.204C32.6749 162.704 40.2749 160.204 44.6749 154.604C58.3749 137.604 35.3749 116.404 44.1749 93.6038C49.2749 80.5038 64.1749 73.3038 84.0749 74.5038C104.475 75.8038 124.075 72.0038 126.575 53.5038C128.675 38.6038 128.475 28.1038 144.275 15.3038C170.475 -5.99622 235.975 -8.79622 249.275 31.2038C253.175 42.8038 264.175 68.2038 302.475 46.7038C332.275 29.9038 402.875 49.3038 380.275 97.7038C371.375 116.804 388.875 122.904 415.975 132.804C436.275 140.204 453.275 177.104 411.675 208.804C405.675 213.304 419.675 226.204 425.475 230.904C458.875 257.904 427.475 297.704 396.075 298.404C396.075 298.404 76.6749 298.204 57.1749 298.404Z" fill="black" />{/*Sei la o que é isso*/}
            </Svg>
            
            <View className="absolute top-[40px]  -translate-y-60 z-20">
              <Svg width={350} height={350} viewBox="3000 3000 5000 2600" fill="none">
{/* Suporte do globo */}
<path d="M5171 5047 c-45 -83 -80 -151 -79 -152 2 -1 31 -18 66 -38 35 -20 67 -37 72 -37 5 0 28 36 51 79 l42 79 60 -36 c86 -52 302 -269 366 -367 97 -149 169 -318 206 -488 22 -97 31 -349 16 -459 -64 -478 -365 -879 -807 -1072 -328 -144 -705 -153 -1034 -25 -114 44 -110 35 -57 132 l47 86 -74 39 -74 38 -85 -158 -85 -157 74 -40 c40 -22 120 -58 176 -81 l103 -41 32 -62 c18 -34 34 -73 37 -87 9 -38 -23 -93 -82 -142 -151 -128 -247 -316 -259 -509 l-6 -89 693 0 693 0 -6 78 c-9 109 -30 182 -84 292 -39 79 -61 109 -140 190 -52 52 -99 103 -104 112 -19 35 -10 102 19 149 26 40 35 46 98 63 139 39 319 124 444 210 99 68 277 241 356 346 77 102 181 309 222 440 51 162 63 235 69 420 5 150 2 193 -16 299 -55 321 -198 600 -426 826 -123 123 -228 202 -356 267 l-87 45 -81 -150z"                                                                     
fill="black" transform="scale(1, -1) translate(0, -8200)"/>
{/* Água do globo */}
<path d="M4425 5014 c-176 -18 -399 -108 -555 -225 -91 -67 -221 -201 -279 -288 -49 -72 -109 -196 -140 -289 -140 -417 -30 -889 279 -1202 222 -225 522 -350 839 -350 312 0 593 109 809 314 275 262 402 593 370 971 -12 155 -47 278 -118 420 -155 311 -418 524 -765 622 -75 21 -116 25 -245 28 -85 2 -173 1 -195 -1z"                                                                  
fill="blue" transform="scale(1, -1) translate(0, -8200)"/>
{/* Terra do globo */}
<path d="M4374 4993 c1 -12 -9 -19 -28 -23 -51 -9 -41 -27 20 -34 56 -6 114 -29 114 -45 0 -5 -10 -15 -22 -23 -12 -8 -18 -19 -14 -26 10 -17 46 -15 46 2 0 8 14 17 31 21 23 5 28 10 20 18 -6 6 -11 24 -11 39 0 25 -3 28 -36 28 -38 0 -74 15 -74 30 0 6 8 10 18 11 14 0 14 2 -3 9 -35 15 -63 12 -61 -7z"         
fill="green" transform="scale(1.011, -1.011) translate(-50, -8160)"/>
<path d="M4681 4983 c-32 -40 -37 -71 -14 -101 27 -37 39 -37 70 -4 21 22 41 31 76 36 55 7 161 36 154 42 -9 9 -202 54 -233 54 -23 0 -38 -7 -53 -27z"    
fill="green" transform="scale(1.011, -1.011) translate(-50, -8160)"/>
<path d="M4219 4954 c-34 -37 -96 -64 -149 -64 -98 0 -349 -203 -468 -379 -73 -106 -95 -148 -88 -167 3 -8 42 -64 87 -125 88 -119 122 -144 206 -156 60 -8 83 -23 108 -70 12 -23 37 -47 63 -61 24 -14 46 -31 49 -38 3 -8 -6 -31 -19 -52 -33 -49 -39 -79 -22 -96 8 -8 14 -33 14 -55 0 -33 7 -47 38 -79 20 -21 60 -69 87 -108 l50 -69 1 -140 c0 -133 2 -142 27 -185 15 -25 29 -64 33 -87 3 -23 11 -49 18 -57 9 -12 126 -80 126 -73 0 1 -11 24 -25 51 -18 36 -25 65 -25 109 0 55 4 65 39 111 22 28 55 65 74 81 25 23 36 42 41 75 8 53 37 87 81 96 40 7 55 36 55 104 0 37 6 55 25 79 17 19 28 47 32 78 l5 49 -79 17 c-86 19 -98 28 -132 94 -23 47 -38 58 -93 66 -20 3 -68 24 -106 46 -77 46 -115 51 -201 25 -69 -20 -81 -17 -105 31 -12 22 -31 44 -44 50 -23 10 -28 30 -12 55 8 13 -1 16 -57 20 -57 4 -69 9 -86 32 -39 52 -6 99 90 130 81 25 89 23 118 -22 14 -22 29 -40 33 -40 5 0 13 21 18 48 9 45 12 48 66 74 43 21 70 43 111 95 75 95 79 97 120 82 41 -14 70 -6 65 18 -2 12 -16 20 -41 24 -21 3 -43 11 -50 18 -19 20 13 36 104 54 122 25 133 41 73 107 -58 64 -132 71 -198 19 -15 -12 -47 -27 -71 -35 -40 -11 -47 -11 -66 5 -14 11 -20 24 -16 34 9 23 72 53 158 75 40 11 75 24 77 30 2 6 -13 18 -33 26 -19 8 -43 29 -53 46 -9 16 -20 30 -23 30 -3 0 -16 -12 -30 -26z"                                                        
fill="green" transform="scale(1.011, -1.011) translate(-50, -8160)"/>
<path d="M5188 4804 c-19 -10 -28 -23 -28 -39 0 -22 3 -24 30 -19 19 4 38 1 55 -10 37 -24 55 -21 55 12 0 19 -9 33 -33 50 -39 26 -43 26 -79 6z"         
fill="green" transform="scale(1.011, -1.011) translate(-50, -8160)"/>
<path d="M5201 4703 c-1 -12 -18 -35 -42 -54 -25 -19 -52 -54 -68 -88 -23 -48 -32 -58 -66 -69 -46 -15 -65 -35 -65 -70 0 -23 2 -24 50 -20 55 6 82 24 100 68 8 19 24 33 46 40 38 13 55 6 98 -39 28 -29 56 -41 56 -23 0 5 -18 23 -40 41 -39 31 -53 61 -27 61 28 -1 93 -47 107 -77 17 -36 27 -40 56 -18 10 8 36 15 58 15 33 0 37 -2 26 -15 -11 -13 -8 -21 15 -45 20 -20 35 -28 49 -24 12 3 30 -2 40 -9 19 -14 19 -16 3 -41 -16 -23 -24 -26 -76 -26 -32 0 -75 7 -95 15 -34 14 -37 14 -57 -6 -17 -17 -29 -20 -57 -16 -40 7 -89 49 -94 81 -4 26 -16 25 -131 -7 -67 -18 -96 -32 -123 -58 -49 -47 -141 -187 -149 -226 -14 -69 37 -163 109 -200 31 -16 116 -20 187 -8 24 4 48 1 66 -8 15 -7 35 -12 44 -10 9 2 20 -6 26 -19 9 -19 7 -27 -13 -49 l-25 -26 31 -64 c34 -72 37 -105 14 -165 -15 -38 -14 -44 1 -74 10 -18 26 -57 36 -87 10 -30 27 -65 38 -79 11 -14 23 -38 26 -55 6 -25 19 -36 86 -69 43 -22 80 -40 82 -40 8 0 76 108 108 171 42 84 85 213 104 312 20 104 21 331 2 324 -23 -8 -34 5 -66 76 -17 37 -46 88 -65 113 -43 56 -54 100 -32 122 9 9 16 11 16 5 0 -6 25 -40 55 -76 30 -35 62 -80 70 -100 25 -61 25 -42 -1 54 -55 208 -170 405 -317 547 l-34 33 -31 -25 c-21 -18 -42 -26 -69 -26 -33 0 -41 4 -50 28 -10 24 -11 25 -12 5z"               
fill="green" transform="scale(1.011, -1.011) translate(-50, -8160)"/>
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