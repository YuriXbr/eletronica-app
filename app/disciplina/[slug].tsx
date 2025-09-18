import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Pressable, Dimensions, Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
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
      <View style={{ 
        backgroundColor: 'transparent',
        minHeight: 20,
        justifyContent: 'center',
      }}>
        <LaTeXRenderer 
          latex={children} 
          fontSize={style?.fontSize || 13}
          textColor={style?.color || '#6b7280'}
          backgroundColor="#ffffff"
          style={{ 
            marginVertical: 2,
            minHeight: 20,
          }}
        />
      </View>
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
    const [formulaPositions, setFormulaPositions] = useState<{ [key: number]: number }>({});
    const [viewportInfo, setViewportInfo] = useState({ top: 0, height: Dimensions.get('window').height });
    const spinValue = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<ScrollView>(null);

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
                    
                    // Carregamento inicial inteligente
                    const initialLoadCount = Math.min(2, disciplinaData.formulas.length);
                    const initialSet = new Set<number>();
                    
                    for (let i = 0; i < initialLoadCount; i++) {
                        initialSet.add(i);
                        setLoadingFormulas(prev => new Set(prev).add(i));
                    }
                    
                    // Simular carregamento das primeiras fórmulas
                    setTimeout(() => {
                        setLoadedFormulas(initialSet);
                        setLoadingFormulas(new Set());
                        setIsLoading(false);
                    }, 300);
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
            }, 150);
        }
    };

    // Função para descarregar fórmulas que estão muito longe da viewport
    const unloadDistantFormulas = (visibleIndexes: number[]) => {
        if (visibleIndexes.length === 0) return;
        
        const BUFFER_SIZE = 3; // Manter 3 fórmulas antes e depois da viewport
        const MAX_LOADED = 10; // Máximo de fórmulas carregadas simultaneamente
        
        const minVisible = Math.min(...visibleIndexes);
        const maxVisible = Math.max(...visibleIndexes);
        const minKeep = Math.max(0, minVisible - BUFFER_SIZE);
        const maxKeep = Math.min((disciplina?.formulas.length || 0) - 1, maxVisible + BUFFER_SIZE);
        
        setLoadedFormulas(prev => {
            // Se não há muitas fórmulas carregadas, não descarregar
            if (prev.size <= MAX_LOADED) return prev;
            
            const newSet = new Set<number>();
            
            // Manter fórmulas na viewport e buffer
            prev.forEach(index => {
                if (index >= minKeep && index <= maxKeep) {
                    newSet.add(index);
                }
            });
            
            // Se removemos muitas, manter pelo menos as visíveis
            if (newSet.size < visibleIndexes.length) {
                visibleIndexes.forEach(index => newSet.add(index));
            }
            
            return newSet;
        });
    };

    // Função para determinar quais fórmulas estão visíveis na viewport
    const getVisibleFormulas = () => {
        const { top, height } = viewportInfo;
        
        // Verificação de segurança
        if (typeof top !== 'number' || typeof height !== 'number') {
            return [];
        }
        
        const visibleIndexes: number[] = [];
        const VIEWPORT_BUFFER = 400; // Buffer para pré-carregar fórmulas próximas
        
        Object.entries(formulaPositions).forEach(([indexStr, position]) => {
            const index = parseInt(indexStr);
            const formulaHeight = 250; // Altura estimada mais generosa
            
            // Verificar se a posição é válida
            if (typeof position !== 'number') return;
            
            // Verificar se a fórmula está na viewport expandida
            const isInViewport = (
                position + formulaHeight >= top - VIEWPORT_BUFFER && 
                position <= top + height + VIEWPORT_BUFFER
            );
            
            if (isInViewport) {
                visibleIndexes.push(index);
            }
        });
        
        return visibleIndexes.sort((a, b) => a - b);
    };

    // Função para carregar fórmulas automaticamente baseado na viewport
    const loadVisibleFormulas = () => {
        const visibleIndexes = getVisibleFormulas();
        const BUFFER_SIZE = 1; // Carregar 1 fórmula antes e depois das visíveis
        
        visibleIndexes.forEach(index => {
            // Carregar fórmula visível
            loadFormula(index);
            
            // Carregar buffer antes e depois
            if (index - BUFFER_SIZE >= 0) loadFormula(index - BUFFER_SIZE);
            if (index + BUFFER_SIZE < (disciplina?.formulas.length || 0)) loadFormula(index + BUFFER_SIZE);
        });
        
        // Descarregar fórmulas distantes se houver muitas carregadas
        if (loadedFormulas.size > 6) {
            unloadDistantFormulas(visibleIndexes);
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

    // useEffect para carregar fórmulas automaticamente quando viewport muda
    useEffect(() => {
        if (disciplina && formulaPositions && Object.keys(formulaPositions).length > 0) {
            const timeoutId = setTimeout(() => {
                loadVisibleFormulas();
            }, 100); // Throttle para evitar muitas chamadas
            
            return () => clearTimeout(timeoutId);
        }
    }, [viewportInfo, formulaPositions, disciplina]);

    // Handler para scroll (extrai dados imediatamente para evitar synthetic event issues)
    const handleScrollData = (offsetY: number, layoutHeight: number) => {
        setViewportInfo({
            top: offsetY,
            height: layoutHeight
        });
    };

    // Throttle otimizado para scroll handler
    const throttledScrollHandler = useRef<number | null>(null);
    const lastScrollTime = useRef<number>(0);
    
    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        // Verificação de segurança e extração imediata dos dados
        if (!event?.nativeEvent?.contentOffset || !event?.nativeEvent?.layoutMeasurement) return;
        
        // Extrair dados imediatamente para evitar synthetic event issues
        const offsetY = event.nativeEvent.contentOffset.y;
        const layoutHeight = event.nativeEvent.layoutMeasurement.height;
        const now = Date.now();
        
        // Throttle mais agressivo para melhor performance
        if (now - lastScrollTime.current < 50) {
            if (throttledScrollHandler.current) {
                clearTimeout(throttledScrollHandler.current);
            }
            
            throttledScrollHandler.current = setTimeout(() => {
                handleScrollData(offsetY, layoutHeight);
                lastScrollTime.current = Date.now();
            }, 150) as any;
        } else {
            handleScrollData(offsetY, layoutHeight);
            lastScrollTime.current = now;
        }
    };

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

            <ScrollView 
                ref={scrollViewRef}
                style={{ flex: 1 }} 
                contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
                onScroll={onScroll}
                scrollEventThrottle={16}
            >
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
                                onLayout={(event) => {
                                    if (!event?.nativeEvent?.layout) return;
                                    
                                    const { y } = event.nativeEvent.layout;
                                    
                                    if (typeof y === 'number') {
                                        setFormulaPositions(prev => ({
                                            ...prev,
                                            [index]: y
                                        }));
                                    }
                                }}
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
                                                <Animated.View style={{
                                                    width: 20,
                                                    height: 20,
                                                    borderWidth: 2,
                                                    borderColor: '#e5e7eb',
                                                    borderTopColor: '#873939',
                                                    borderRadius: 10,
                                                    marginBottom: 8,
                                                    transform: [{
                                                        rotate: spinValue.interpolate({
                                                            inputRange: [0, 1],
                                                            outputRange: ['0deg', '360deg']
                                                        })
                                                    }]
                                                }} />
                                                <Text style={{
                                                    color: '#6b7280',
                                                    fontSize: 12,
                                                }}>
                                                    Carregando automaticamente...
                                                </Text>
                                            </View>
                                        ) : (
                                            <View style={{
                                                minHeight: 50,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: '#f8f9fa',
                                                borderRadius: 6,
                                            }}>
                                                <View style={{
                                                    width: 30,
                                                    height: 4,
                                                    backgroundColor: '#d1d5db',
                                                    borderRadius: 2,
                                                    marginBottom: 6,
                                                }} />
                                                <View style={{
                                                    width: 50,
                                                    height: 4,
                                                    backgroundColor: '#e5e7eb',
                                                    borderRadius: 2,
                                                    marginBottom: 4,
                                                }} />
                                                <View style={{
                                                    width: 20,
                                                    height: 4,
                                                    backgroundColor: '#e5e7eb',
                                                    borderRadius: 2,
                                                }} />
                                            </View>
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