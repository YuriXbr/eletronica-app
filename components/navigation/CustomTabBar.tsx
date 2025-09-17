import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

interface TabIconProps {
  name: string;
  focused: boolean;
  color: string;
}

const TabIcon: React.FC<TabIconProps> = ({ name, focused, color }) => {
  const getIconName = (name: string, focused: boolean) => {
    switch (name) {
      case 'index':
        return focused ? 'home' : 'home-outline';
      case 'formulas':
        return focused ? 'library' : 'library-outline';
      case 'equipe':
        return focused ? 'person' : 'person-outline';
      default:
        return 'help-outline';
    }
  };

  // Ícone customizado do resistor
  if (name === 'resistor') {
    return (
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: focused ? 'rgba(135, 57, 57, 0.1)' : 'transparent',
        transform: [{ rotate: '45deg' }],
      }}>
        <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          {/* Corpo principal do resistor - retângulo */}
          <Path 
            d="M7 10H17C17.5 10 18 10.5 18 11V13C18 13.5 17.5 14 17 14H7C6.5 14 6 13.5 6 13V11C6 10.5 6.5 10 7 10Z" 
            stroke={color} 
            strokeWidth={focused ? "2" : "1.5"} 
            fill={focused ? color : "none"}
            fillOpacity={focused ? "0.2" : "0"}
          />
          {/* Faixas de cor do resistor */}
          <Path 
            d="M8.5 10V14M10 10V14M11.5 10V14" 
            stroke={color} 
            strokeWidth={focused ? "1.5" : "1"} 
            strokeLinecap="round"
          />
          {/* Terminais do resistor */}
          <Path 
            d="M2 12H6M18 12H22" 
            stroke={color} 
            strokeWidth={focused ? "2.5" : "2"} 
            strokeLinecap="round"
          />
        </Svg>
      </View>
    );
  }

  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: focused ? 'rgba(135, 57, 57, 0.1)' : 'transparent',
    }}>
      <Ionicons
        name={getIconName(name, focused) as any}
        size={22}
        color={color}
      />
    </View>
  );
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {

  const getTabLabel = (routeName: string) => {
    switch (routeName) {
      case 'index':
        return 'Início';
      case 'formulas':
        return 'Disciplinas';
      case 'resistor':
        return 'Código de cores';
      case 'equipe':
        return 'Equipe';
      default:
        return routeName;
    }
  };

  return (
    <View style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 12,
      paddingBottom: 24,
      paddingHorizontal: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 12,
    }}>
      {/* Indicador visual no topo */}
      <View style={{
        position: 'absolute',
        top: 6,
        left: '50%',
        marginLeft: -20,
        width: 40,
        height: 4,
        backgroundColor: '#E5E5E5',
        borderRadius: 2,
      }} />

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 8,
      }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // Pequena vibração de feedback (se disponível)
              // Feedback.impactAsync(Feedback.ImpactFeedbackStyle.Light);
              navigation.navigate(route.name);
            }
          };

          const color = isFocused ? '#873939' : '#9BA1A6';

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={{
                flex: 1,
                alignItems: 'center',
                paddingVertical: 8,
                transform: [{ scale: isFocused ? 1.05 : 1 }],
              }}
              activeOpacity={0.6}
            >
              <TabIcon
                name={route.name}
                focused={isFocused}
                color={color}
              />
              <Text style={{
                color: color,
                fontSize: 11,
                fontWeight: isFocused ? '600' : '500',
                marginTop: 4,
                textAlign: 'center',
              }}>
                {getTabLabel(route.name)}
              </Text>
              
              {/* Indicador de tab ativa */}
              {isFocused && (
                <View style={{
                  position: 'absolute',
                  top: -4,
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#d8cc39',
                }} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;
