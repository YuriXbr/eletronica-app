import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

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

// Função auxiliar que renderiza texto matemático de forma simplificada
function renderMathText(text: string) {
    // Substitui comandos LaTeX básicos por texto legível
    let processedText = text
        .replace(/\\times/g, '×')
        .replace(/\\cdot/g, '·')
        .replace(/\\div/g, '÷')
        .replace(/\\pm/g, '±')
        .replace(/\\leq/g, '≤')
        .replace(/\\geq/g, '≥')
        .replace(/\\neq/g, '≠')
        .replace(/\\approx/g, '≈')
        .replace(/\\infty/g, '∞')
        .replace(/\\pi/g, 'π')
        .replace(/\\alpha/g, 'α')
        .replace(/\\beta/g, 'β')
        .replace(/\\gamma/g, 'γ')
        .replace(/\\theta/g, 'θ')
        .replace(/\\omega/g, 'ω')
        .replace(/\\mu/g, 'μ')
        .replace(/\\sigma/g, 'σ')
        .replace(/\^{([^}]+)}/g, '$1') // Expoentes simples
        .replace(/_{([^}]+)}/g, '$1') // Índices simples
        .replace(/\\frac{([^}]+)}{([^}]+)}/g, '($1)/($2)') // Frações
        .replace(/\\sqrt{([^}]+)}/g, '√($1)') // Raiz quadrada
        .replace(/\\\\/g, '\n') // Quebras de linha
        .replace(/\${2}/g, '') // Remove delimitadores duplos
        .replace(/\$/g, ''); // Remove delimitadores simples
    
    return processedText;
}

export default function DisciplinaDetail() {
    // Obtém o slug da URL para identificar qual disciplina carregar
    const { slug } = useLocalSearchParams();
    // Estado que armazena os dados da disciplina carregada do JSON
    const [disciplina, setDisciplina] = useState<Disciplina | null>(null);
    // Estado para controlar a expansão/colapso dos detalhes das fórmulas
    const [expandedFormulas, setExpandedFormulas] = useState<{ [index: number]: boolean }>({});

    useEffect(() => {
        // Dados estáticos das disciplinas baseados nos arquivos JSON
        const disciplinasData: { [key: string]: Disciplina } = {
            'eletricidade-i': {
                name: "Eletricidade I",
                description: "Apresentação sobre eletricidade básica. Eletricidade I é a disciplina inicial do nosso curso, ela é ofertada no segundo semestre e vem logo após 'Introdução a Eletrônica'. Aqui começamos de fato os estudos na eletrônica aprendendo sobre a base dela.",
                formulas: [
                    {
                        name: "Carga Elétrica",
                        description: "Carga Elétrica é a quantidade de elétrons que passam por um ponto em um determinado tempo.",
                        latex: ["q=n\\times e"],
                        constants: {
                            "e": "1,6\\times{10}^{-19} C"
                        },
                        variables: {
                            "q": "Carga Elétrica (C)",
                            "n": "Número de Elétrons",
                            "e": "Carga Elementar (C)"
                        }
                    },
                    {
                        name: "Lei de Ohm",
                        description: "A lei de Ohm relaciona tensão, corrente e resistência em um circuito elétrico.",
                        latex: ["V = I \\times R"],
                        variables: {
                            "V": "Tensão (V)",
                            "I": "Corrente (A)", 
                            "R": "Resistência (Ω)"
                        }
                    },
                    {
                        name: "Potência Elétrica",
                        description: "A potência elétrica é a quantidade de energia elétrica consumida por unidade de tempo.",
                        latex: ["P = V \\times I", "P = I^2 \\times R", "P = \\frac{V^2}{R}"],
                        variables: {
                            "P": "Potência (W)",
                            "V": "Tensão (V)",
                            "I": "Corrente (A)",
                            "R": "Resistência (Ω)"
                        }
                    }
                ]
            },
            'eletricidade-ii': {
                name: "Eletricidade II",
                description: "Continuação dos estudos de eletricidade, abordando capacitores, indutores e circuitos mais complexos.",
                formulas: [
                    {
                        name: "Capacitância",
                        description: "A capacitância é a capacidade de armazenar carga elétrica.",
                        latex: ["C = \\frac{Q}{V}"],
                        variables: {
                            "C": "Capacitância (F)",
                            "Q": "Carga (C)",
                            "V": "Tensão (V)"
                        }
                    }
                ]
            },
            'analise-de-circuitos-i': {
                name: "Análise de Circuitos I",
                description: "Análise de circuitos elétricos básicos utilizando métodos sistemáticos.",
                formulas: [
                    {
                        name: "Lei de Kirchhoff das Tensões",
                        description: "A soma algébrica das tensões em uma malha fechada é igual a zero.",
                        latex: ["\\sum V = 0"],
                        variables: {
                            "V": "Tensão (V)"
                        }
                    },
                    {
                        name: "Lei de Kirchhoff das Correntes",
                        description: "A soma algébrica das correntes em um nó é igual a zero.",
                        latex: ["\\sum I = 0"],
                        variables: {
                            "I": "Corrente (A)"
                        }
                    }
                ]
            }
        };

        // Carrega a disciplina baseada no slug
        if (slug && typeof slug === 'string' && disciplinasData[slug]) {
            setDisciplina(disciplinasData[slug]);
        } else {
            console.error("Disciplina não encontrada para o slug:", slug);
        }
    }, [slug]);

    if (!disciplina)
        return <Text className="text-center mt-5 text-lg text-gray-600">Carregando...</Text>;

    // Função para alternar a visualização dos detalhes de uma fórmula
    const toggleFormula = (index: number) => {
        setExpandedFormulas(prev => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <ScrollView className="flex-1 bg-gray-100 p-4">
            {/* Cabeçalho: exibe o nome da disciplina */}
            <View className="bg-green-500 p-4 rounded-lg mb-4">
                <Text className="text-2xl font-bold text-white text-center">{disciplina.name}</Text>
            </View>

            {/* Descrição da disciplina */}
            <View className="bg-white p-4 rounded-lg mb-4 shadow-md">
                <Text className="text-base text-gray-800 leading-6">{disciplina.description}</Text>
            </View>

            {/* Seção de Fórmulas: itera sobre as fórmulas disponíveis e renderiza cada uma */}
            <View className="mt-4">
                {disciplina.formulas.length > 0 ? (
                    disciplina.formulas.map((formula, index) => (
                        <TouchableOpacity 
                            key={index}
                            onPress={() => toggleFormula(index)}
                            activeOpacity={0.8}
                        >
                            <View className="bg-white p-4 rounded-lg mb-4 shadow-md">
                                {/* Exibe o nome e a descrição da fórmula */}
                                <Text className="text-lg font-semibold text-gray-800 mb-2">{formula.name}</Text>
                                <Text className="text-sm text-gray-600 mb-2">{formula.description}</Text>
                                {/* Renderiza as expressões matemáticas */}
                                <View className="bg-gray-200 p-2 rounded-md">
                                    {formula.latex.map((ltx, i) => (
                                        // Renderiza cada expressão matemática de forma simplificada
                                        <Text key={i} className="text-lg font-mono text-center text-gray-800">
                                            {renderMathText(ltx)}
                                        </Text>
                                    ))}
                                </View>
                                {/* Se a fórmula estiver expandida, exibe variáveis e constantes */}
                                {expandedFormulas[index] && (formula.variables || formula.constants) && (
                                    <View className="mt-4 p-2 border-t border-gray-300">
                                        {formula.variables && (
                                            <>
                                                <Text className="font-bold text-gray-800 mb-2">Variáveis:</Text>
                                                {Object.entries(formula.variables).map(([key, value]) => (
                                                    <Text key={key} className="text-gray-700">
                                                        {`${key}: `}
                                                        {renderMathText(value)}
                                                    </Text>
                                                ))}
                                            </>
                                        )}
                                        {formula.constants && (
                                            <>
                                                <Text className="font-bold text-gray-800 mt-4 mb-2">Constantes:</Text>
                                                {Object.entries(formula.constants).map(([key, value]) => (
                                                    <Text key={key} className="text-gray-700">
                                                        {`${key}: `}
                                                        {renderMathText(value)}
                                                    </Text>
                                                ))}
                                            </>
                                        )}
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    // Caso não existam fórmulas, informa ao usuário
                    <Text className="text-center text-base text-gray-500">
                        Nenhuma fórmula disponível para esta disciplina.
                    </Text>
                )}
            </View>
        </ScrollView>
    );
}