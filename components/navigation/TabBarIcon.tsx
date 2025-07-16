// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { View } from 'react-native';

export function TabBarIcon({ style, color, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return (
    <View style={{ 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: 4,
    }}>
      <Ionicons 
        size={24} 
        style={[{ 
          marginBottom: -2,
        }, style]} 
        color={color}
        {...rest} 
      />
    </View>
  );
}
