import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Pressable, Dimensions, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import LaTeXRenderer from '../../components/LaTeXRenderer';
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

// Função auxiliar para verificar se o texto contém LaTeX
const hasLatexSyntax = (text: string): boolean => {
  return text.includes('\\') || text.includes('^') || text.includes('_') || 
         text.includes('{') || text.includes('}') || text.includes('$');
};

// Componente para renderizar texto com LaTeX quando necessário
const TextWithLatex = ({ children, style }: { children: string; style?: any }) => {
  if (hasLatexSyntax(children)) {
    return (
      <LaTeXRenderer 
        latex={children} 
        fontSize={style?.fontSize || 13}
        textColor={style?.color || '#6b7280'}
        backgroundColor="transparent"
        style={{ marginVertical: 2 }}
      />
    );
  }
  return <Text style={style}>{children}</Text>;
};

export default function DisciplinaDetail() {
    // Obtém o slug da URL para identificar qual disciplina carregar
    const { slug } = useLocalSearchParams();
    const router = useRouter();
    // Estado que armazena os dados da disciplina carregada do JSON
    const [disciplina, setDisciplina] = useState<Disciplina | null>(null);
    // Estado para controlar a expansão/colapso dos detalhes das fórmulas
    const [expandedFormulas, setExpandedFormulas] = useState<{ [index: number]: boolean }>({});
    // Estados para otimização de renderização
    const [loadedFormulas, setLoadedFormulas] = useState<Set<number>>(new Set());
    const [loadingFormulas, setLoadingFormulas] = useState<Set<number>>(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Configurar animação do spinner
        const spin = Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        );
        spin.start();

        return () => spin.stop();
    }, []);

    useEffect(() => {
        // Carrega os dados da disciplina usando imports diretos (compatível com Expo)
        const loadDisciplina = async () => {
            try {
                let disciplinaData: Disciplina | null = null;
                
                // Mapear arquivos disponíveis
                const fileMap: Record<string, () => any> = {
                  "eletricidade-i": () => require("../../LISTA DE JSON/eletricidade-i.json"),
                  "eletricidade-ii": () => require("../../LISTA DE JSON/eletricidade-ii.json"),
                  "analise-de-circuitos-i": () => require("../../LISTA DE JSON/analise-de-circuitos-i.json"),
                  "analise-de-circuitos-ii": () => require("../../LISTA DE JSON/analise-de-circuitos-ii.json"),
                  "analise-de-circuitos-iii": () => require("../../LISTA DE JSON/analise-de-circuitos-iii.json"),
                  "analise-de-circuitos-iv": () => require("../../LISTA DE JSON/analise-de-circuitos-iv.json"),
                  "eletronica-geral-iii": () => require("../../LISTA DE JSON/eletronica-geral-iii.json"),
                };
                
                const loader = fileMap[slug as string];
                if (loader) {
                    disciplinaData = loader();
                }
                
                if (disciplinaData) {
                    setDisciplina(disciplinaData);
                    setIsLoading(false);
                    
                    // Precarregar as primeiras 3 fórmulas em background
                    setTimeout(() => {
                        const preloadSet = new Set<number>();
                        for (let i = 0; i < Math.min(3, disciplinaData.formulas.length); i++) {
                            preloadSet.add(i);
                        }
                        setLoadedFormulas(preloadSet);
                    }, 100);
                } else {
                    // Disciplina não encontrada
                    setIsLoading(false);
                }
            } catch (error) {
                // Erro ao carregar disciplina
                setIsLoading(false);
            }
        };
        
        loadDisciplina();
    }, [slug]);

    // Função para alternar a visualização dos detalhes de uma fórmula
    const toggleFormula = (index: number) => {
        setExpandedFormulas(prev => {
            const newExpanded = {
                ...prev,
                [index]: !prev[index]
            };
            
            // Se estiver expandindo, carregar fórmula se não estiver carregada
            if (!prev[index] && !loadedFormulas.has(index)) {
                loadFormula(index);
            }
            
            return newExpanded;
        });
    };

    // Função para carregar uma fórmula quando necessário
    const loadFormula = (index: number) => {
        if (!loadedFormulas.has(index) && !loadingFormulas.has(index)) {
            setLoadingFormulas(prev => new Set(prev).add(index));
            
            // Simular carregamento com pequeno delay para suavidade
            setTimeout(() => {
                setLoadedFormulas(prev => new Set(prev).add(index));
                setLoadingFormulas(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(index);
                    return newSet;
                });
            }, 200);
        }
    };

    // Hook para carregar fórmulas próximas quando uma é visualizada
    useEffect(() => {
        Object.keys(expandedFormulas).forEach(indexStr => {
            const index = parseInt(indexStr);
            if (expandedFormulas[index]) {
                // Carregar fórmulas adjacentes
                for (let i = Math.max(0, index - 1); i <= Math.min(disciplina?.formulas.length || 0 - 1, index + 1); i++) {
                    loadFormula(i);
                }
            }
        });
    }, [expandedFormulas, disciplina]);

    if (!disciplina || isLoading) {
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
                    <View style={{
                        backgroundColor: 'white',
                        borderRadius: 16,
                        padding: 30,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 4,
                        alignItems: 'center',
                    }}>
                        <Animated.View style={{
                            width: 40,
                            height: 40,
                            borderWidth: 3,
                            borderColor: '#e5e7eb',
                            borderTopColor: '#873939',
                            borderRadius: 20,
                            marginBottom: 16,
                            transform: [{
                                rotate: spinValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg']
                                })
                            }]
                        }} />
                        <Text style={{ 
                            fontSize: 16, 
                            color: '#1f2937',
                            fontWeight: '600',
                            marginBottom: 4
                        }}>
                            Carregando disciplina...
                        </Text>
                        <Text style={{ 
                            fontSize: 14, 
                            color: '#6b7280',
                            textAlign: 'center'
                        }}>
                            Preparando fórmulas e conteúdo
                        </Text>
                    </View>
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
                                onPress={(formula.variables || formula.constants) ? () => toggleFormula(index) : undefined}
                                activeOpacity={(formula.variables || formula.constants) ? 0.95 : 1}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: 16,
                                    marginBottom: 16,
                                    padding: 20,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.08,
                                    shadowRadius: 8,
                                    elevation: 4
                                }}
                            >
                                {/* Cabeçalho da fórmula */}
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: '#1f2937',
                                    marginBottom: 6
                                }}>
                                    {formula.name}
                                </Text>
                                <Text style={{
                                    fontSize: 14,
                                    color: '#6b7280',
                                    lineHeight: 18,
                                    marginBottom: 16
                                }}>
                                    {formula.description}
                                </Text>
                                    
                                {/* Renderização das fórmulas LaTeX - otimizada */}
                                {formula.latex.map((ltx, i) => (
                                    <View key={i} style={{
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: 8,
                                        padding: 12,
                                        marginBottom: 8,
                                        borderWidth: 1,
                                        borderColor: '#e5e7eb',
                                        minHeight: 60,
                                        justifyContent: 'center',
                                    }}>
                                        {loadedFormulas.has(index) ? (
                                            <LaTeXRenderer 
                                                latex={ltx}
                                                fontSize={16}
                                                backgroundColor="#f8f9fa"
                                                style={{ 
                                                    minHeight: 50
                                                }}
                                            />
                                        ) : loadingFormulas.has(index) ? (
                                            <View style={{
                                                minHeight: 50,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: '#f8f9fa',
                                            }}>
                                                <View style={{
                                                    width: 20,
                                                    height: 20,
                                                    borderWidth: 2,
                                                    borderColor: '#e5e7eb',
                                                    borderTopColor: '#873939',
                                                    borderRadius: 10,
                                                    marginBottom: 8,
                                                }} />
                                                <Text style={{
                                                    color: '#6b7280',
                                                    fontSize: 12,
                                                }}>
                                                    Carregando...
                                                </Text>
                                            </View>
                                        ) : (
                                            <TouchableOpacity 
                                                onPress={() => loadFormula(index)}
                                                style={{
                                                    minHeight: 50,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: '#f3f4f6',
                                                    borderRadius: 6,
                                                    borderWidth: 1,
                                                    borderColor: '#d1d5db',
                                                    borderStyle: 'dashed',
                                                }}
                                            >
                                                <Text style={{
                                                    color: '#873939',
                                                    fontSize: 14,
                                                    fontWeight: '500'
                                                }}>
                                                    📐 Tocar para carregar fórmula
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                ))}
                                    
                                    {/* Indicador de expansão - só mostra se há detalhes */}
                                    {(formula.variables || formula.constants) && (
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
                                    )}
                                    
                                    {/* Detalhes expandidos - simplificado */}
                                    {expandedFormulas[index] && (formula.variables || formula.constants) && (
                                        <View style={{
                                            marginTop: 20,
                                            paddingTop: 16,
                                            borderTopWidth: 1,
                                            borderTopColor: '#e5e7eb'
                                        }}>
                                            {formula.variables && (
                                                <View style={{ marginBottom: formula.constants ? 12 : 0 }}>
                                                    <Text style={{
                                                        fontSize: 15,
                                                        fontWeight: '600',
                                                        color: '#1f2937',
                                                        marginBottom: 6
                                                    }}>
                                                        📋 Variáveis
                                                    </Text>
                                                    {Object.entries(formula.variables).map(([key, value]) => (
                                                        <View key={key} style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'flex-start',
                                                            paddingVertical: 4,
                                                            paddingLeft: 8,
                                                            borderLeftWidth: 2,
                                                            borderLeftColor: '#3b82f6',
                                                            marginBottom: 4,
                                                        }}>
                                                            <TextWithLatex 
                                                                style={{
                                                                    fontSize: 13,
                                                                    fontWeight: '600',
                                                                    color: '#1f2937',
                                                                    marginRight: 8,
                                                                    minWidth: 20,
                                                                }}
                                                            >
                                                                {key + ':'}
                                                            </TextWithLatex>
                                                            <TextWithLatex 
                                                                style={{ 
                                                                    color: '#6b7280', 
                                                                    fontSize: 13,
                                                                    flex: 1,
                                                                    lineHeight: 16
                                                                }}
                                                            >
                                                                {value}
                                                            </TextWithLatex>
                                                        </View>
                                                    ))}
                                                </View>
                                            )}
                                            {formula.constants && (
                                                <View>
                                                    <Text style={{
                                                        fontSize: 15,
                                                        fontWeight: '600',
                                                        color: '#1f2937',
                                                        marginBottom: 6
                                                    }}>
                                                        🔢 Constantes
                                                    </Text>
                                                    {Object.entries(formula.constants).map(([key, value]) => (
                                                        <View key={key} style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'flex-start',
                                                            paddingVertical: 4,
                                                            paddingLeft: 8,
                                                            borderLeftWidth: 2,
                                                            borderLeftColor: '#10b981',
                                                            marginBottom: 4,
                                                        }}>
                                                            <TextWithLatex 
                                                                style={{
                                                                    fontSize: 13,
                                                                    fontWeight: '600',
                                                                    color: '#1f2937',
                                                                    marginRight: 8,
                                                                    minWidth: 20,
                                                                }}
                                                            >
                                                                {key + ':'}
                                                            </TextWithLatex>
                                                            <TextWithLatex 
                                                                style={{ 
                                                                    color: '#6b7280', 
                                                                    fontSize: 13,
                                                                    flex: 1,
                                                                    lineHeight: 16
                                                                }}
                                                            >
                                                                {value}
                                                            </TextWithLatex>
                                                        </View>
                                                    ))}
                                                </View>
                                            )}
                                        </View>
                                    )}
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