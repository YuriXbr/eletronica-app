import React from 'react';
import { Text, View, ScrollView } from 'react-native';

interface MathRendererProps {
  latex: string;
  style?: any;
  fontSize?: number;
}

// Componente para renderizar fórmulas matemáticas sem LaTeX
export default function MathRenderer({ latex, style, fontSize = 16 }: MathRendererProps) {
  // Função para converter LaTeX básico para texto formatado
  const parseLaTeX = (latexString: string): string => {
    let processed = latexString;
    
    // Substituições básicas de símbolos LaTeX
    const replacements = {
      // Frações
      '\\frac{': '(',
      '}': ')',
      '}{': ')÷(',
      
      // Expoentes
      '^{': '^(',
      '^2': '²',
      '^3': '³',
      '^4': '⁴',
      
      // Subscritos (usando aproximação visual)
      '_{': '₍',
      '_o': 'ₒ',
      '_c': 'ᶜ',
      '_s': 'ₛ',
      '_i': 'ᵢ',
      '_{cs}': '₍ᶜˢ₎',
      '_{ci}': '₍ᶜⁱ₎',
      '_{PB}': '₍ᴾᴮ₎',
      
      // Símbolos matemáticos
      '\\times': '×',
      '\\cdot': '·',
      '\\pi': 'π',
      '\\omega': 'ω',
      '\\Omega': 'Ω',
      '\\alpha': 'α',
      '\\beta': 'β',
      '\\gamma': 'γ',
      '\\delta': 'δ',
      '\\theta': 'θ',
      '\\lambda': 'λ',
      '\\mu': 'μ',
      '\\sigma': 'σ',
      '\\phi': 'φ',
      '\\psi': 'ψ',
      
      // Operações
      '\\sqrt{': '√(',
      '\\log': 'log',
      '\\ln': 'ln',
      '\\sin': 'sin',
      '\\cos': 'cos',
      '\\tan': 'tan',
      
      // Inequações
      '\\le': '≤',
      '\\ge': '≥',
      '\\approx': '≈',
      '\\ne': '≠',
      
      // Parênteses especiais
      '\\left(': '(',
      '\\right)': ')',
      '\\left[': '[',
      '\\right]': ']',
      
      // Remover comandos LaTeX restantes
      '\\': '',
    };
    
    // Aplicar substituições
    for (const [latex, replacement] of Object.entries(replacements)) {
      processed = processed.replace(new RegExp(latex.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
    }
    
    // Limpar chaves extras
    processed = processed.replace(/[{}]/g, '');
    
    return processed;
  };

  const renderFormula = (formula: string) => {
    const parsed = parseLaTeX(formula);
    
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Text style={[{
          fontSize: fontSize,
          fontFamily: 'monospace',
          color: '#1f2937',
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: '#f8f9fa',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#e5e7eb',
          textAlign: 'center',
          ...style
        }]}>
          {parsed}
        </Text>
      </ScrollView>
    );
  };

  return (
    <View style={{ marginVertical: 8 }}>
      {renderFormula(latex)}
    </View>
  );
}

// Componente para exibir múltiplas fórmulas
export function FormulaList({ formulas, title }: { formulas: string[], title?: string }) {
  return (
    <View style={{ marginVertical: 16 }}>
      {title && (
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: 12,
          textAlign: 'center'
        }}>
          {title}
        </Text>
      )}
      {formulas.map((formula, index) => (
        <View key={index} style={{ marginBottom: 8 }}>
          <MathRenderer latex={formula} />
        </View>
      ))}
    </View>
  );
}