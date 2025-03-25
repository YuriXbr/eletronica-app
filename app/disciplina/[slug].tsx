import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import '../../katex/dist/katex.min.css';
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

    useEffect(() => {
        // Carregue o JSON com base no slug – aqui usamos fetch local (ajuste conforme estrutura do projeto)
        fetch(`../../../LISTA DE JSON/${slug}.json`)
            .then(response => response.json())
            .then((data: Disciplina) => setDisciplina(data))
            .catch(error => console.error("Erro ao carregar disciplina:", error));
    }, [slug]);

    if (!disciplina) return <Text>Carregando...</Text>;

    return (
        <ScrollView style={{ padding: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{disciplina.name}</Text>
            <Text style={{ marginVertical: 8 }}>{disciplina.description}</Text>

            {disciplina.formulas.map((formula, index) => (
                <View key={index} style={{ marginVertical: 8, padding: 8, backgroundColor: '#EFEFEF', borderRadius: 8 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>{formula.name}</Text>
                    <Text>{formula.description}</Text>
                    {formula.latex.map((ltx, i) => (
                        <Latex key={i}>{ltx}</Latex>
                    ))}

                </View>
            ))}
        </ScrollView>
    );
}