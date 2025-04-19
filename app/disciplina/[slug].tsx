import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

type Formula = {
    name: string;
    description: string;
    latex: string[];
};

type Disciplina = {
    name: string;
    description: string;
    formulas: Formula[];
    // adicione outros campos conforme necessário
};

export default function DisciplinaDetail() {
    const { slug } = useLocalSearchParams();
    const [disciplina, setDisciplina] = useState<Disciplina | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Carregar os dados da disciplina
        fetch(`../../../LISTA DE JSON/${slug}.json`)
            .then(response => response.json())
            .then((data: Disciplina) => {
                setDisciplina(data);

                // Atualizar o título da página com o nome da disciplina
                // router.setOptions({
                //     title: data.name,
                // });
            })
            .catch(error => console.error("Erro ao carregar disciplina:", error));
    }, [slug]);

    if (!disciplina) return <Text className="text-center mt-5 text-lg text-gray-600">Carregando...</Text>;

    return (
        <ScrollView className="flex-1 bg-gray-100 p-4">
            {/* Cabeçalho */}
            <View className="bg-green-500 p-4 rounded-lg mb-4">
                <Text className="text-2xl font-bold text-white text-center">{disciplina.name}</Text>
            </View>

            {/* Descrição */}
            <View className="bg-white p-4 rounded-lg mb-4 shadow-md">
                <Text className="text-base text-gray-800 leading-6">{disciplina.description}</Text>
            </View>

            {/* Fórmulas */}
            <View className="mt-4">
                {disciplina.formulas.length > 0 ? (
                    disciplina.formulas.map((formula, index) => (
                        <View key={index} className="bg-white p-4 rounded-lg mb-4 shadow-md">
                            <Text className="text-lg font-semibold text-gray-800 mb-2">{formula.name}</Text>
                            <Text className="text-sm text-gray-600 mb-2">{formula.description}</Text>
                            <View className="bg-gray-200 p-2 rounded-md">
                                {formula.latex.map((ltx, i) => (
                                    <Latex key={i}>{`$${ltx}$`}</Latex>
                                ))}
                            </View>
                        </View>
                    ))
                ) : (
                    <Text className="text-center text-base text-gray-500">
                        Nenhuma fórmula disponível para esta disciplina.
                    </Text>
                )}
            </View>
        </ScrollView>
    );
}