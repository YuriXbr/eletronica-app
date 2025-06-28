import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

export default function DebugScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
          App Debug Screen
        </Text>
        <Text style={{ fontSize: 16, color: 'gray', marginTop: 20, textAlign: 'center' }}>
          Se você consegue ver esta tela, o app está funcionando!
        </Text>
        <Text style={{ fontSize: 14, color: 'blue', marginTop: 10 }}>
          Versão: 1.0.0
        </Text>
      </View>
    </SafeAreaView>
  );
}
