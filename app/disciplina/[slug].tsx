import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
// import 'katex/dist/katex.min.css';
// import Latex from 'react-latex-next';

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

// Função auxiliar que verifica se o texto possui comandos LaTeX (ex.: \frac, \sqrt, etc.)
function renderLatexIfNeeded(text: string) {
    // Verifica se o texto contém um comando LaTeX com uma expressão regular.
    const latexRegex = /\\[a-zA-Z]+/; // Regex para detectar comandos LaTeX (ex.: \frac, \sqrt)
    if (latexRegex.test(text)) {
        // Se detectar, renderiza o texto como LaTeX
        return <text>{`$${text}$`}</text>;
    }
    // Caso contrário, retorna o texto simples
    return text;
}

export default function DisciplinaDetail() {
    // Obtém o slug da URL para identificar qual disciplina carregar
    const { slug } = useLocalSearchParams();
    // Estado que armazena os dados da disciplina carregada do JSON
    const [disciplina, setDisciplina] = useState<Disciplina | null>(null);
    // Estado para controlar a expansão/colapso dos detalhes das fórmulas
    const [expandedFormulas, setExpandedFormulas] = useState<{ [index: number]: boolean }>({});

    useEffect(() => {
        // Carrega os dados da disciplina a partir do JSON correspondente ao slug
        fetch(`../../../LISTA DE JSON/${slug}.json`)
            .then(response => response.json())
            .then((data: Disciplina) => {
                setDisciplina(data);
            })
            .catch(error => console.error("Erro ao carregar disciplina:", error));
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
                                {/* Renderiza as expressões em LaTeX */}
                                <View className="bg-gray-200 p-2 rounded-md">
                                    {formula.latex.map((ltx, i) => (
                                        // Renderiza cada expressão LaTeX individualmente
                                        <text key={i}>{`$${ltx}$`}</text>
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
                                                        {renderLatexIfNeeded(value)}
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
                                                        {renderLatexIfNeeded(value)}
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