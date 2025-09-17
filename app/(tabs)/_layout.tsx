import { Tabs } from 'expo-router';
import React from 'react';

import CustomTabBar from '@/components/navigation/CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
        }}
      />
      <Tabs.Screen
        name="formulas"
        options={{
          title: 'Disciplinas',
        }}
      />
      <Tabs.Screen
        name="resistor"
        options={{
          title: 'Calculadora de Resistores',
        }}
      />

      <Tabs.Screen
        name="teste"
        options={{
          title: 'Desenvolvedores',
        }}
      />
    </Tabs>
  );
}
