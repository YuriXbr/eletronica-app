import React, { useEffect, useState } from "react";
import "../../global.css";
import { Link, useRouter } from "expo-router";
import { View, ScrollView, Text, TouchableOpacity, Dimensions } from "react-native";
import Svg, { Path, LinearGradient, Stop, Defs } from 'react-native-svg';

const { width } = Dimensions.get('window');

type Disciplina = {
  name: string;
  slug: string;
  description: string;
  status: string;
  semmester: number;
  course: string;
  chapters?: string[];
  period?: string;
};

// Componente do ícone de disciplina
const BookIcon = ({ color = "#873939" }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M6.5 2H20V22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

// Componente do ícone de capítulos
const ChaptersIcon = ({ color = "#6b7280" }) => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path d="M3 6H21M3 12H21M3 18H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export default function Formulas() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [filteredDisciplinas, setFilteredDisciplinas] = useState<Disciplina[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');
  const [searchText, setSearchText] = useState('');
  const [availableSemesters, setAvailableSemesters] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadDisciplinas = () => {
      try {
        // Importar arquivos locais diretamente
        const files = require("../../LISTA DE JSON/index.json");

        const disciplinasAtivas: Disciplina[] = [];
        
        // Mapear todos os arquivos
        const fileMap: Record<string, any> = {
          "eletricidade-i.json": require("../../LISTA DE JSON/eletricidade-i.json"),
          "eletricidade-ii.json": require("../../LISTA DE JSON/eletricidade-ii.json"),
          "analise-de-circuitos-i.json": require("../../LISTA DE JSON/analise-de-circuitos-i.json"),
          "analise-de-circuitos-ii.json": require("../../LISTA DE JSON/analise-de-circuitos-ii.json"),
          "analise-de-circuitos-iii.json": require("../../LISTA DE JSON/analise-de-circuitos-iii.json"),
          "analise-de-circuitos-iv.json": require("../../LISTA DE JSON/analise-de-circuitos-iv.json"),
          "eletronica-geral-iii.json": require("../../LISTA DE JSON/eletronica-geral-iii.json"),
        };

        for (const file of files) {
          const disciplinaData = fileMap[file];
          
          if (disciplinaData && disciplinaData.status === "active") {
            disciplinasAtivas.push({
              name: disciplinaData.name,
              slug: disciplinaData.slug,
              description: disciplinaData.description,
              status: disciplinaData.status,
              semmester: disciplinaData.semmester,
              course: disciplinaData.course,
              chapters: disciplinaData.chapters || [],
              period: disciplinaData.period || "integrado",
            });
          }
        }

        // Ordenar por semestre
        disciplinasAtivas.sort((a, b) => a.semmester - b.semmester);
        
        // Extrair semestres únicos
        const semestres = [...new Set(disciplinasAtivas.map(d => d.semmester))].sort((a, b) => a - b);
        
        setDisciplinas(disciplinasAtivas);
        setFilteredDisciplinas(disciplinasAtivas);
        setAvailableSemesters(semestres);
      } catch (error) {
        // Erro ao carregar disciplinas
      } finally {
        setLoading(false);
      }
    };

    loadDisciplinas();
  }, []);

  // Função para filtrar disciplinas
  useEffect(() => {
    let filtered = disciplinas;

    // Filtrar por semestre
    if (selectedSemester !== 'all') {
      filtered = filtered.filter(d => d.semmester === selectedSemester);
    }

    // Filtrar por texto de busca
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(d => {
        const nameMatch = d.name.toLowerCase().includes(searchLower);
        const descriptionMatch = d.description.toLowerCase().includes(searchLower);
        const courseMatch = d.course.toLowerCase().includes(searchLower);
        
        // Busca por palavras-chave principais (ex: "eletricidade" encontra "Eletricidade I", "Eletricidade II")
        const mainKeyword = d.name.toLowerCase().split(' ')[0];
        const keywordMatch = mainKeyword.includes(searchLower) || searchLower.includes(mainKeyword);
        
        return nameMatch || descriptionMatch || courseMatch || keywordMatch;
      });
    }

    setFilteredDisciplinas(filtered);
  }, [disciplinas, selectedSemester, searchText]);

  const getSemesterColor = (semester: number) => {
    const colors = [
      '#d8cc39', '#873939', '#6e2f2f', '#5a2525', '#4a1f1f', '#3a1818'
    ];
    return colors[semester - 1] || '#873939';
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      {/* Header fixo */}
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


        {/* Título centralizado */}
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: 8,
          }}>
            Disciplinas
          </Text>
          <Text style={{
            fontSize: 16,
            color: '#f4e976',
            textAlign: 'center',
          }}>
            Explore o conhecimento em eletrônica
          </Text>
        </View>
      </View>

      {/* Conteúdo principal com scroll */}
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Seção principal de conteúdo */}
        <View style={{ padding: 20, paddingTop: 30 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1f2937', marginBottom: 8 }}>
            Disciplinas Disponíveis
          </Text>
          <Text style={{ fontSize: 16, color: '#6b7280', marginBottom: 24 }}>
            Escolha uma disciplina para estudar suas fórmulas
          </Text>

          {/* Filtros melhorados */}
          <View style={{
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 20,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 16 }}>
              Filtros de Busca
            </Text>
            
            {/* Barra de busca melhorada */}
            <TouchableOpacity 
              style={{
                backgroundColor: '#f8f9fa',
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 16,
                marginBottom: 20,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: searchText ? '#873939' : '#e5e7eb',
              }}
              onPress={() => {
                const texto = prompt("Digite o nome da disciplina (ex: eletricidade, análise, eletrônica):");
                if (texto !== null) {
                  setSearchText(texto);
                }
              }}
            >
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: 12 }}>
                <Path d="M21 21L16.514 16.506M19 10.5A8.5 8.5 0 1 1 10.5 2A8.5 8.5 0 0 1 19 10.5Z" stroke={searchText ? "#873939" : "#6b7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </Svg>
              <Text 
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: searchText ? '#1f2937' : '#9ca3af',
                  fontWeight: searchText ? '600' : '400',
                }}
              >
                {searchText || "Buscar disciplinas..."}
              </Text>
              {searchText ? (
                <TouchableOpacity onPress={() => setSearchText('')} style={{ padding: 4 }}>
                  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <Path d="M18 6L6 18M6 6L18 18" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </Svg>
                </TouchableOpacity>
              ) : null}
            </TouchableOpacity>

            {/* Filtros por semestre melhorados */}
            <View>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 16 }}>
                Filtrar por Semestre
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -4 }}>
                <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 4 }}>
                  <TouchableOpacity
                    onPress={() => setSelectedSemester('all')}
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 12,
                      borderRadius: 24,
                      backgroundColor: selectedSemester === 'all' ? '#873939' : 'white',
                      borderWidth: 2,
                      borderColor: selectedSemester === 'all' ? '#873939' : '#e5e7eb',
                      shadowColor: selectedSemester === 'all' ? '#873939' : '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: selectedSemester === 'all' ? 0.3 : 0.1,
                      shadowRadius: 4,
                      elevation: selectedSemester === 'all' ? 6 : 2,
                    }}
                  >
                    <Text style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: selectedSemester === 'all' ? 'white' : '#6b7280',
                      textAlign: 'center',
                    }}>
                      Todos
                    </Text>
                    <Text style={{
                      fontSize: 12,
                      color: selectedSemester === 'all' ? '#f4e976' : '#9ca3af',
                      textAlign: 'center',
                      marginTop: 2,
                    }}>
                      {disciplinas.length} disciplinas
                    </Text>
                  </TouchableOpacity>
                  
                  {availableSemesters.map(semester => {
                    const count = disciplinas.filter(d => d.semmester === semester).length;
                    const isSelected = selectedSemester === semester;
                    const color = getSemesterColor(semester);
                    
                    return (
                      <TouchableOpacity
                        key={semester}
                        onPress={() => setSelectedSemester(semester)}
                        style={{
                          paddingHorizontal: 20,
                          paddingVertical: 12,
                          borderRadius: 24,
                          backgroundColor: isSelected ? color : 'white',
                          borderWidth: 2,
                          borderColor: isSelected ? color : '#e5e7eb',
                          shadowColor: isSelected ? color : '#000',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: isSelected ? 0.3 : 0.1,
                          shadowRadius: 4,
                          elevation: isSelected ? 6 : 2,
                        }}
                      >
                        <Text style={{
                          fontSize: 14,
                          fontWeight: '700',
                          color: isSelected ? 'white' : '#6b7280',
                          textAlign: 'center',
                        }}>
                          {semester}º Sem
                        </Text>
                        <Text style={{
                          fontSize: 12,
                          color: isSelected ? 'rgba(255,255,255,0.8)' : '#9ca3af',
                          textAlign: 'center',
                          marginTop: 2,
                        }}>
                          {count} disciplina{count !== 1 ? 's' : ''}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>

          {loading ? (
            // Loading state melhorado
            <View style={{
              backgroundColor: 'white',
              borderRadius: 16,
              padding: 40,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}>
              <View style={{
                width: 60, height: 60,
                borderWidth: 4,
                borderColor: '#e5e7eb',
                borderTopColor: '#d8cc39',
                borderRadius: 30,
                marginBottom: 20,
              }} />
              <Text style={{ color: '#6b7280', fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
                Carregando disciplinas...
              </Text>
              <Text style={{ color: '#9ca3af', fontSize: 14, textAlign: 'center' }}>
                Aguarde enquanto buscamos as informações
              </Text>
            </View>
          ) : filteredDisciplinas.length === 0 ? (
            // Estado vazio melhorado
            <View style={{
              backgroundColor: 'white',
              borderRadius: 16,
              padding: 40,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}>
              <View style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: '#f3f4f6',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
              }}>
                <Svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <Path d="M21 21L16.514 16.506M19 10.5A8.5 8.5 0 1 1 10.5 2A8.5 8.5 0 0 1 19 10.5Z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </Svg>
              </View>
              <Text style={{ color: '#1f2937', fontSize: 20, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' }}>
                Nenhuma disciplina encontrada
              </Text>
              <Text style={{ color: '#6b7280', fontSize: 16, textAlign: 'center', marginBottom: 24, lineHeight: 24 }}>
                Tente ajustar os filtros ou buscar por outro termo para encontrar as disciplinas desejadas.
              </Text>
              {(searchText || selectedSemester !== 'all') && (
                <TouchableOpacity
                  onPress={() => {
                    setSearchText('');
                    setSelectedSemester('all');
                  }}
                  style={{
                    paddingHorizontal: 24,
                    paddingVertical: 12,
                    backgroundColor: '#873939',
                    borderRadius: 12,
                    shadowColor: '#873939',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 6,
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                    Limpar Filtros
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            // Lista de disciplinas com melhor organização
            <View>
              {/* Indicador de resultados melhorado */}
              {(searchText || selectedSemester !== 'all') && (
                <View style={{
                  backgroundColor: 'white',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 20,
                  borderLeftWidth: 4,
                  borderLeftColor: '#0ea5e9',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: '#0ea5e9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 12,
                    }}>
                      <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                        {filteredDisciplinas.length}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 16, color: '#0369a1', fontWeight: 'bold', marginBottom: 2 }}>
                        {filteredDisciplinas.length} disciplina{filteredDisciplinas.length !== 1 ? 's' : ''} encontrada{filteredDisciplinas.length !== 1 ? 's' : ''}
                      </Text>
                      <Text style={{ fontSize: 14, color: '#6b7280' }}>
                        {selectedSemester !== 'all' && `Semestre ${selectedSemester}`}
                        {searchText && selectedSemester !== 'all' && ' • '}
                        {searchText && `Busca: "${searchText}"`}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              
              {/* Grid de disciplinas */}
              <View style={{ gap: 16 }}>
                {filteredDisciplinas.map((disciplina, index) => (
                <Link key={disciplina.slug} href={`../disciplina/${disciplina.slug}`} asChild>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 16,
                      padding: 20,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.1,
                      shadowRadius: 12,
                      elevation: 6,
                      borderLeftWidth: 6,
                      borderLeftColor: getSemesterColor(disciplina.semmester),
                    }}
                    activeOpacity={0.95}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                      <View style={{
                        backgroundColor: `${getSemesterColor(disciplina.semmester)}20`,
                        borderRadius: 12,
                        padding: 12,
                        marginRight: 16,
                      }}>
                        <BookIcon color={getSemesterColor(disciplina.semmester)} />
                      </View>
                      
                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                          <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#1f2937',
                            flex: 1,
                          }}>
                            {disciplina.name}
                          </Text>
                          <View style={{
                            backgroundColor: '#10b981',
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            borderRadius: 12,
                          }}>
                            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                              ATIVO
                            </Text>
                          </View>
                        </View>
                        
                        <Text style={{
                          fontSize: 14,
                          color: '#6b7280',
                          lineHeight: 20,
                          marginBottom: 12,
                        }}>
                          {disciplina.description}
                        </Text>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <View style={{ flexDirection: 'row', gap: 16 }}>
                            <View style={{
                              backgroundColor: '#f3f4f6',
                              paddingHorizontal: 8,
                              paddingVertical: 4,
                              borderRadius: 8,
                            }}>
                              <Text style={{ fontSize: 12, color: '#374151', fontWeight: '600' }}>
                                {disciplina.semmester}º Semestre
                              </Text>
                            </View>
                            <View style={{
                              backgroundColor: '#eff6ff',
                              paddingHorizontal: 8,
                              paddingVertical: 4,
                              borderRadius: 8,
                            }}>
                              <Text style={{ fontSize: 12, color: '#1e40af', fontWeight: '600' }}>
                                {disciplina.course.toUpperCase()}
                              </Text>
                            </View>
                          </View>
                          
                          {disciplina.chapters && disciplina.chapters.length > 0 && (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <ChaptersIcon />
                              <Text style={{ fontSize: 12, color: '#6b7280', marginLeft: 4 }}>
                                {disciplina.chapters.length} capítulos
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Link>
              ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}