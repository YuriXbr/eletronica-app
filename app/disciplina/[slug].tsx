import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MathRenderer from '../../components/MathRenderer';
import Svg, { Path } from 'react-native-svg';

// Tipos para fórmulas e disciplina para melhor entendimento da estrutura dos dados.
type Formula = {
    name: string;
    description: string;
    latex: string[];
    constants?: { [key: string]: string } | null;
    variables?: { [key: string]: string };
};

type Disciplina = {
    name: string;
    description: string;
    formulas: Formula[];
};

// Componente do ícone de voltar
const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5M12 19L5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

// Função auxiliar que renderiza variáveis e constantes com formatação melhorada
function renderVariableValue(text: string) {
    return (
        <Text style={{ color: '#6b7280', fontSize: 14, lineHeight: 20 }}>
            {text}
        </Text>
    );
}

export default function DisciplinaDetail() {
    // Obtém o slug da URL para identificar qual disciplina carregar
    const { slug } = useLocalSearchParams();
    const router = useRouter();
    // Estado que armazena os dados da disciplina carregada do JSON
    const [disciplina, setDisciplina] = useState<Disciplina | null>(null);
    // Estado para controlar a expansão/colapso dos detalhes das fórmulas
    const [expandedFormulas, setExpandedFormulas] = useState<{ [index: number]: boolean }>({});

    useEffect(() => {
        // Carrega os dados da disciplina usando imports diretos (compatível com Expo)
        const loadDisciplina = async () => {
            try {
                let disciplinaData: Disciplina | null = null;
                
                // Mapear arquivos disponíveis
                const fileMap = {
                  "eletricidade-i": () => require("../../LISTA DE JSON/eletricidade-i.json"),
                  "eletricidade-ii": () => require("../../LISTA DE JSON/eletricidade-ii.json"),
                  "analise-de-circuitos-i": () => require("../../LISTA DE JSON/analise-de-circuitos-i.json"),
                  "analise-de-circuitos-ii": () => require("../../LISTA DE JSON/analise-de-circuitos-ii.json"),
                  "analise-de-circuitos-iii": () => require("../../LISTA DE JSON/analise-de-circuitos-iii.json"),
                  "analise-de-circuitos-iv": () => require("../../LISTA DE JSON/analise-de-circuitos-iv.json"),
                  "eletronica-geral-iii": () => require("../../LISTA DE JSON/eletronica-geral-iii.json"),
                } as const;
                
                const loader = fileMap[slug as keyof typeof fileMap];
                if (loader) {
                    disciplinaData = loader();
                }
                
                if (disciplinaData) {
                    setDisciplina(disciplinaData);
                } else {
                    console.error("Disciplina não encontrada:", slug);
                }
            } catch (error) {
                console.error("Erro ao carregar disciplina:", error);
            }
        };
        
        loadDisciplina();
    }, [slug]);

    // Função para alternar a visualização dos detalhes de uma fórmula
    const toggleFormula = (index: number) => {
        setExpandedFormulas(prev => ({ ...prev, [index]: !prev[index] }));
    };

    if (!disciplina) {
        return (
            <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
                <View style={{ 
                    backgroundColor: '#873939',
                    paddingTop: 50,
                    paddingBottom: 20,
                    paddingHorizontal: 20,
                }}>
                    <Text style={{
                        fontSize: 28,
                        fontWeight: 'bold',
                        color: 'white',
                        textAlign: 'center',
                    }}>
                        Carregando...
                    </Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#6b7280' }}>
                        Carregando disciplina...
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
            {/* Header com botão de voltar */}
            <View style={{ 
                backgroundColor: '#873939',
                paddingTop: 50,
                paddingBottom: 20,
                paddingHorizontal: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 8,
            }}>
                {/* Botão de voltar */}
                <Pressable 
                    onPress={() => router.back()}
                    style={{ 
                        position: 'absolute', 
                        left: 20, 
                        top: 50, 
                        zIndex: 999,
                        width: 44,
                        height: 44,
                        borderRadius: 22,
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: 'rgba(255,255,255,0.3)',
                    }}
                >
                    <BackIcon />
                </Pressable>

                {/* Título centralizado */}
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={{
                        fontSize: 28,
                        fontWeight: 'bold',
                        color: 'white',
                        textAlign: 'center',
                        marginBottom: 8,
                    }}>
                        {disciplina.name}
                    </Text>
                    <Text style={{
                        fontSize: 16,
                        color: '#f4e976',
                        textAlign: 'center',
                    }}>
                        Fórmulas e Conceitos
                    </Text>
                </View>
            </View>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
                {/* Descrição da disciplina */}
                <View style={{
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 16,
                    marginBottom: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 4,
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: '#1f2937',
                        lineHeight: 24,
                        textAlign: 'center'
                    }}>
                        {disciplina.description}
                    </Text>
                </View>

                {/* Seção de Fórmulas */}
                <View>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#1f2937',
                        marginBottom: 16,
                        textAlign: 'center'
                    }}>
                        Fórmulas ({disciplina.formulas.length})
                    </Text>
                    
                    {disciplina.formulas.length > 0 ? (
                        disciplina.formulas.map((formula, index) => (
                            <TouchableOpacity 
                                key={index}
                                onPress={() => toggleFormula(index)}
                                activeOpacity={0.95}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: 16,
                                    marginBottom: 16,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 12,
                                    elevation: 6,
                                    overflow: 'hidden'
                                }}
                            >
                                <View style={{ padding: 20 }}>
                                    {/* Cabeçalho da fórmula */}
                                    <View style={{ marginBottom: 16 }}>
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            color: '#1f2937',
                                            marginBottom: 8
                                        }}>
                                            {formula.name}
                                        </Text>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#6b7280',
                                            lineHeight: 20
                                        }}>
                                            {formula.description}
                                        </Text>
                                    </View>
                                    
                                    {/* Renderização das fórmulas LaTeX */}
                                    <View style={{
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: 12,
                                        padding: 16,
                                        borderWidth: 2,
                                        borderColor: '#e5e7eb'
                                    }}>
                                        {formula.latex.map((ltx, i) => (
                                            <MathRenderer 
                                                key={i} 
                                                latex={ltx}
                                                fontSize={18}
                                                style={{ 
                                                    backgroundColor: 'white',
                                                    marginVertical: 4,
                                                    borderWidth: 1,
                                                    borderColor: '#d1d5db'
                                                }}
                                            />
                                        ))}
                                    </View>
                                    
                                    {/* Indicador de expansão */}
                                    <View style={{
                                        marginTop: 16,
                                        paddingTop: 16,
                                        borderTopWidth: 1,
                                        borderTopColor: '#e5e7eb',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#6b7280',
                                            marginRight: 8
                                        }}>
                                            {expandedFormulas[index] ? 'Ver menos detalhes' : 'Ver mais detalhes'}
                                        </Text>
                                        <Text style={{
                                            fontSize: 16,
                                            color: '#873939',
                                            fontWeight: 'bold'
                                        }}>
                                            {expandedFormulas[index] ? '▲' : '▼'}
                                        </Text>
                                    </View>
                                    
                                    {/* Detalhes expandidos */}
                                    {expandedFormulas[index] && (formula.variables || formula.constants) && (
                                        <View style={{
                                            marginTop: 20,
                                            paddingTop: 20,
                                            borderTopWidth: 2,
                                            borderTopColor: '#e5e7eb',
                                            backgroundColor: '#fafafa',
                                            borderRadius: 12,
                                            padding: 16
                                        }}>
                                            {formula.variables && (
                                                <View style={{ marginBottom: 16 }}>
                                                    <Text style={{
                                                        fontSize: 18,
                                                        fontWeight: 'bold',
                                                        color: '#1f2937',
                                                        marginBottom: 12
                                                    }}>
                                                        📋 Variáveis:
                                                    </Text>
                                                    {Object.entries(formula.variables).map(([key, value]) => (
                                                        <View key={key} style={{
                                                            backgroundColor: 'white',
                                                            padding: 12,
                                                            borderRadius: 8,
                                                            marginBottom: 8,
                                                            borderLeftWidth: 4,
                                                            borderLeftColor: '#3b82f6'
                                                        }}>
                                                            <Text style={{
                                                                fontSize: 16,
                                                                fontWeight: '600',
                                                                color: '#1f2937',
                                                                marginBottom: 4
                                                            }}>
                                                                {key}
                                                            </Text>
                                                            {renderVariableValue(value)}
                                                        </View>
                                                    ))}
                                                </View>
                                            )}
                                            {formula.constants && (
                                                <View>
                                                    <Text style={{
                                                        fontSize: 18,
                                                        fontWeight: 'bold',
                                                        color: '#1f2937',
                                                        marginBottom: 12
                                                    }}>
                                                        🔢 Constantes:
                                                    </Text>
                                                    {Object.entries(formula.constants).map(([key, value]) => (
                                                        <View key={key} style={{
                                                            backgroundColor: 'white',
                                                            padding: 12,
                                                            borderRadius: 8,
                                                            marginBottom: 8,
                                                            borderLeftWidth: 4,
                                                            borderLeftColor: '#10b981'
                                                        }}>
                                                            <Text style={{
                                                                fontSize: 16,
                                                                fontWeight: '600',
                                                                color: '#1f2937',
                                                                marginBottom: 4
                                                            }}>
                                                                {key}
                                                            </Text>
                                                            {renderVariableValue(value)}
                                                        </View>
                                                    ))}
                                                </View>
                                            )}
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={{
                            backgroundColor: 'white',
                            padding: 40,
                            borderRadius: 16,
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 8,
                            elevation: 4,
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: '#6b7280',
                                textAlign: 'center',
                                lineHeight: 28
                            }}>
                                📚 Nenhuma fórmula disponível para esta disciplina.
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}