import React, { useState, useRef } from 'react';
import { Dimensions, View, Text, ScrollView, Animated } from 'react-native';
import Card from "@/components/card";
import Svg, { Path } from 'react-native-svg';

const SCROLL_INPUT_RANGE = [0, 1000];
const SCROLL_OUTPUT_RANGE = [0, -150];

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

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
    height: windowHeight * 0.33, // Ajuste a altura conforme necessário
    
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
      {/*View do top background*/} 
      <View style={{ flex: 1, backgroundColor: '#873939', position: 'relative', zIndex: 1}}>
      <View className="w-full">
         {/*Svg de detalhe do top background*/}
          <View style={{ position: 'absolute', top: -50, left: 0, right: 0, overflow: 'visible', zIndex: 1 }}>
            <Svg width= "100%" height={600} viewBox="0 400 1024 768" preserveAspectRatio="xMidYMid slice">
              <Path d="M 1009.767 393.750 C 1002.366 401.313, 990.217 414.250, 982.770 422.500 C 952.442 456.099, 925.174 479.840, 889.500 503.705 C 822.246 548.696, 735.747 579.953, 649.500 590.431 C 642.350 591.300, 634.700 592.261, 632.500 592.567 C 624.136 593.731, 578.813 595.968, 563.284 595.983 C 536.305 596.011, 504.679 593.875, 473 589.887 C 450.120 587.007, 435.216 584.342, 401 577.013 C 383.034 573.165, 368.354 570.442, 358 569.039 C 353.325 568.405, 346.575 567.470, 343 566.961 C 317.403 563.314, 302.814 562.535, 260 562.526 C 215.949 562.518, 207.739 562.954, 175.500 567.018 C 117.473 574.334, 68.964 586.795, 10.756 609.339 L 0.013 613.500 0.006 631.250 C 0.003 641.013, 0.275 649, 0.611 649 C 0.947 649, 4.885 646.799, 9.361 644.109 C 31.948 630.533, 67.696 614.528, 98.806 604.061 C 184.858 575.108, 272.284 569.320, 362.500 586.605 C 391.753 592.209, 421.582 601.158, 454.174 614.107 C 520.797 640.576, 568.276 652.397, 626.395 656.983 C 642.909 658.286, 685.956 658.278, 701.500 656.969 C 755.230 652.445, 802.166 639.941, 847.680 618.026 C 873.224 605.727, 890.578 594.675, 920 571.967 C 930.175 564.114, 946.150 552.613, 955.500 546.409 C 972.992 534.803, 1002.848 517.952, 1016.354 512.063 L 1024 508.730 1024 444.365 C 1024 408.964, 1023.825 380, 1023.612 380 C 1023.398 380, 1017.168 386.188, 1009.767 393.750" 
              fill="black" opacity={0.05} fillRule='evenodd'/>
              <Path d="M 1006.500 527.829 C 960.250 551.713, 923.280 579.730, 879.925 623.752 C 860.622 643.353, 847.436 654.775, 828.172 668.583 C 759.716 717.651, 672.018 744.011, 577.273 743.996 C 525.892 743.988, 492.206 739.699, 436 726.008 C 420.325 722.190, 401.200 717.911, 393.500 716.498 C 324.832 703.899, 253.637 705.640, 184.500 721.611 C 145.006 730.734, 99.751 747.412, 67.509 764.727 L 61.500 767.955 542.750 767.977 L 1024 768 1024 643.500 C 1024 575.025, 1023.888 519.011, 1023.750 519.025 C 1023.612 519.039, 1015.850 523.001, 1006.500 527.829"
              fill="black" opacity={0.15} fillRule='evenodd' />
              <Path d="M 1004.872 517.829 C 972.955 534.049, 951.212 547.924, 920 571.984 C 890.513 594.715, 873.189 605.744, 847.680 618.026 C 802.166 639.941, 755.230 652.445, 701.500 656.969 C 685.956 658.278, 642.909 658.286, 626.395 656.983 C 568.276 652.397, 520.797 640.576, 454.174 614.107 C 429.673 604.372, 415.029 599.496, 392.500 593.568 C 331.080 577.408, 265.792 572.976, 201 580.569 C 136.983 588.071, 64.319 612.112, 9.768 643.840 L 0.036 649.500 0.018 708.750 L 0 768 30.473 768 L 60.946 768 73.778 761.574 C 128.297 734.270, 186.402 717.403, 248 711 C 296.920 705.914, 345.908 707.766, 393.500 716.498 C 401.200 717.911, 420.325 722.190, 436 726.008 C 492.206 739.699, 525.892 743.988, 577.273 743.996 C 661.569 744.009, 737.160 724.113, 804.500 684.188 C 830.659 668.679, 854.469 649.600, 879.925 623.752 C 909.896 593.321, 935.458 571.805, 964.500 552.565 C 983.818 539.768, 991.967 535.020, 1010.750 525.618 L 1024 518.986 1024 513.993 C 1024 511.247, 1023.605 509, 1023.122 509 C 1022.639 509, 1014.426 512.973, 1004.872 517.829"
              fill="black" opacity={0.1} fillRule='evenodd'/>
            </Svg>
          </View>

        {/*Svg da senoide da tro*/}
              <View style={{
              position: 'absolute',  
              right: 20,             
              top: 20,
              zIndex: 999,
              }}>
              <Svg width="50" height="50" viewBox="0 0 285 400">
                <Path  fill="#d8cc39" d="M 122.5,10.5 C 184.096,5.70249 229.596,30.0358 259,83.5C 263.8,95.8999 267.8,108.567 271,121.5C 271.999,128.15 272.333,134.817 272,141.5C 268.5,148.507 264,154.84 258.5,160.5C 252.326,164.42 246.326,168.587 240.5,173C 225.158,182.956 208.491,185.956 190.5,182C 179.675,176.757 169.342,170.757 159.5,164C 149.203,155.041 140.369,144.874 133,133.5C 118.035,117.598 100.202,106.098 79.5,99C 75.8333,98.3333 72.1667,98.3333 68.5,99C 46.2653,105.611 27.932,117.945 13.5,136C 11.8876,136.72 10.3876,136.554 9,135.5C 12.5964,87.601 34.7631,51.101 75.5,26C 90.418,18.1957 106.085,13.0291 122.5,10.5 Z"/>
                <Path fill="#d8cc39" d="M 70.5,109.5 C 77.0547,109.444 83.388,110.611 89.5,113C 94.7244,117.859 100.224,122.359 106,126.5C 122.419,148.661 135.753,172.661 146,198.5C 151.167,204.333 156.333,210.167 161.5,216C 169.799,221.822 178.466,227.155 187.5,232C 200.95,236.876 214.284,236.543 227.5,231C 236.48,225.364 245.48,219.698 254.5,214C 259.167,208 263.833,202 268.5,196C 273.868,194.985 276.201,197.318 275.5,203C 274.887,208.287 273.72,213.454 272,218.5C 267.606,228.289 262.939,237.955 258,247.5C 251.667,256.5 245.333,265.5 239,274.5C 230.76,282.411 221.26,288.244 210.5,292C 201.635,292.713 193.635,290.379 186.5,285C 182.272,281.726 178.272,278.226 174.5,274.5C 157.421,252.569 143.921,228.569 134,202.5C 120.678,187.086 104.844,174.92 86.5,166C 79.5667,164.494 72.5667,164.161 65.5,165C 42.0356,172.884 23.7022,187.218 10.5,208C 9.16667,208.667 7.83333,208.667 6.5,208C 5.19612,201.189 5.36278,194.355 7,187.5C 14.9631,164.054 27.1298,143.221 43.5,125C 48.5,121.333 53.5,117.667 58.5,114C 62.4324,111.972 66.4324,110.472 70.5,109.5 Z"/>
                <Path fill="#d8cc39" d="M 64.5,216.5 C 79.1318,214.742 92.7985,217.575 105.5,225C 110.558,229.057 115.892,232.724 121.5,236C 135.239,249.735 148.239,264.069 160.5,279C 167.992,284.58 175.659,289.913 183.5,295C 197.675,301.931 212.009,302.264 226.5,296C 242.24,288.251 255.574,277.584 266.5,264C 268.134,263.506 269.801,263.34 271.5,263.5C 270.474,288.412 263.307,311.412 250,332.5C 226.325,364.773 194.492,383.939 154.5,390C 97.1561,392.223 53.6561,369.056 24,320.5C 14.1952,300.246 9.19517,278.913 9,256.5C 19.8015,240.704 33.9682,228.87 51.5,221C 55.9797,219.564 60.313,218.064 64.5,216.5 Z"/>              
              </Svg>
              </View>

        {/*View do botão de pesquisa*/}
        <View style={{
        position: 'absolute',  
        left: 20,             
        top: 20,                
        width: 50,
        height: 50,
        zIndex: 999,
        padding: 16,
        backgroundColor: '#6e2f2f',  // Cor de fundo
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
          }}>
          {/*Svg da lupa*/}
          
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M21.71 20.29L18 16.61C19.4401 14.8144 20.1375 12.5353 19.9488 10.2413C19.7601 7.9473 18.6997 5.81278 16.9855 4.27664C15.2714 2.7405 13.0338 1.91951 10.7329 1.98247C8.43203 2.04543 6.24272 2.98756 4.61514 4.61514C2.98756 6.24272 2.04543 8.43203 1.98247 10.7329C1.91951 13.0338 2.7405 15.2714 4.27664 16.9855C5.81278 18.6997 7.9473 19.7601 10.2413 19.9488C12.5353 20.1375 14.8144 19.4401 16.61 18L20.29 21.68C20.383 21.7737 20.4936 21.8481 20.6154 21.8989C20.7373 21.9497 20.868 21.9758 21 21.9758C21.132 21.9758 21.2627 21.9497 21.3846 21.8989C21.5064 21.8481 21.617 21.7737 21.71 21.68C21.8902 21.4935 21.991 21.2443 21.991 20.985C21.991 20.7257 21.8902 20.4765 21.71 20.29ZM11 18C9.61553 18 8.26215 17.5895 7.111 16.8203C5.95986 16.0511 5.06265 14.9579 4.53284 13.6788C4.00303 12.3997 3.8644 10.9922 4.1345 9.63436C4.4046 8.2765 5.07128 7.02922 6.05025 6.05025C7.02922 5.07128 8.2765 4.4046 9.63436 4.1345C10.9922 3.8644 12.3997 4.00303 13.6788 4.53284C14.9579 5.06265 16.0511 5.95986 16.8203 7.111C17.5895 8.26215 18 9.61553 18 11C18 12.8565 17.2625 14.637 15.9497 15.9497C14.637 17.2625 12.8565 18 11 18Z" fill="white" />{/*Lupa*/}
          </Svg>
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
      <View className="bg-white rounded-t-2xl w-full pl-6 pt-5 -mt-40 ">
        <Text className="text-textprimary text-2xl font-bold">Cartões</Text>
        <Text className="text-textsecundary text-lg font-bold">Recomendado para você</Text>
        
        <View className="relative">

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            className="flex-row mt-4"
          >
            {/* #d8cc39=amarelo queimado - #6e2f2f=vermelhotro escuro - #873939=vermelhotro */}
            <Card type="formulas" icon="formulas" title="Fórmulas" bgColor="#6e2f2f" link="formulas" />
            <Card type="disciplines" icon="disciplines" title="Disciplinas" bgColor="#873939" link="formulas" />
            <Card type="formulas" icon="ohm" title="Cálculo de Resistores" bgColor="#6e2f2f" link="resistor" />
            <Card type="formulas" icon="" title="Work In Progress" bgColor="#873939" link="formulas" />
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
            <Card type="disciplines" icon="disciplines" title="Eletricidade I" bgColor="#d8cc39" link="disciplina/eletricidade-i" />
            <Card type="disciplines" icon="disciplines" title="Eletricidade II" bgColor="#d8cc39" link="disciplina/eletricidade-ii" />
            <Card type="disciplines" icon="disciplines" title="Eletricidade III" bgColor="#d8cc39" link="disciplina/eletricidade-iii" />
          </View>
        </View>
      </View>
      </Animated.View>
    </Animated.ScrollView>
  );
}