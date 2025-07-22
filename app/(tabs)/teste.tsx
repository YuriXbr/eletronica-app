
import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking, Modal, Alert } from 'react-native';
import Svg, { Path, LinearGradient, Stop, Defs } from 'react-native-svg';

// Dados dos membros da equipe
const teamMembers = [
  {
    id: 1,
    name: "Yuri Andrade dos Anjos",
    github: "github.com/YuriXbr",
    contact: "+53 984620902",
    position: "Desenvolvedor Full-Stack",
    bio: "Apaixonado por tecnologia e educação, focado em criar soluções inovadoras.",
    skills: ["Node.js", "JavaScript", "HTML/CSS", "React Native", "TypeScript", "MongoDB", "Expo", "Tailwind CSS", "FIGMA", "Git"],
    avatar: "https://i.imgur.com/rE9kG5v.jpeg"
  },
  {
    id: 2,
    name: "Pablo Maciel Pinto",
    github: "github.com/Mablozin",
    contact: "+53 984660202",
    position: "Desenvolvedor Full-Stack",
    bio: "Amante de C e C++, apaixonado por arduino.",
    skills: ["C", "C++", "Arduino", "Node.js", "JavaScript", "HTML/CSS", "React Native", "TypeScript", "Expo", "Git"],
    avatar: "https://i.imgur.com/iZ1ajd1.jpeg"
  },
  {
    id: 3,
    name: "Alexandre Nunes da Silva Filho",
    github: "github.com/ale1zin",
    contact: "53 981362695",
    position: "Desenvolvedor Full-Stack",
    bio: "Breve descrição sobre você e suas contribuições.",
    skills: ["Habilidade 1", "Habilidade 2", "Habilidade 3"],
    avatar: "https://i.imgur.com/C3Rodm6.jpeg"
  },
  {
    id: 4,
    name: "Carlos Alexandre Dutra Volz",
    github: "github.com/Carlosvolz",
    contact: "53 9927-7854",
    position: "Desenvolvedor Front-end",
    bio: "Breve descrição sobre você e suas contribuições.",
    skills: ["Habilidade 1", "Habilidade 2", "Habilidade 3"],
    avatar: "https://i.imgur.com/yvezboY.png"
  },
  {
    id: 5,
    name: "Eduardo Peixoto Alves Decker",
    github: "github.com/eduardodecker2006",
    contact: "53 98421-5326",
    position: "Desenvolvedor Front-end",
    bio: "Breve descrição sobre você e suas contribuições.",
    skills: ["Habilidade 1", "Habilidade 2", "Habilidade 3"],
    avatar: "https://i.imgur.com/7c5C78g.jpeg"
    avatar: "https://i.imgur.com/7c5C78g.jpeg"
  },
];

const professors = [
  {
    id: 1,
    name: "Fabricio Neitzke Ferreira",
    contact: "fabricioferreira@ifsul.edu.br",
    position: "Professor Orientador",
    bio: "Bio do professor, incluindo suas áreas de pesquisa e contribuições.",
    department: "Doutor em Computação",
    avatar: "https://i.imgur.com/rRCsaeY.png"
  },
  {
    id: 2,
    name: "Rodrigo Nuevo Lellis",
    contact: "rodrigolellis@ifsul.edu.br",
    name: "Fabricio Neitzke Ferreira",
    contact: "fabricioferreira@ifsul.edu.br",
    position: "Professor Orientador",
    bio: "Bio do professor, incluindo suas áreas de pesquisa e contribuições.",
    department: "Doutor em Computação",
    avatar: "https://i.imgur.com/rRCsaeY.png"
  },
  {
    id: 2,
    name: "Rodrigo Nuevo Lellis",
    contact: "rodrigolellis@ifsul.edu.br",
    position: "Professor Orientador",
    bio: "Bio do professor, incluindo suas áreas de pesquisa e contribuições.",
    department: "Doutor em Computação",
    avatar: "https://i.imgur.com/rJaadYz.jpeg"
    department: "Doutor em Computação",
    avatar: "https://i.imgur.com/rJaadYz.jpeg"
  }
];

const GitHubIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
      fill="#4f46e5"
    />
  </Svg>
);

const EmailIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 8L10.89 13.26c.53.29 1.17.29 1.7 0L20 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      stroke="#666"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PhoneIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
      stroke="#666"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface MemberCardProps {
  member: {
    name: string;
    github?: string;
    contact: string;
    position: string;
    bio?: string;
    skills?: string[];
    department?: string;
    avatar: string;
  };
  onPress?: () => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onPress }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleGitHubPress = () => {
    if (member.github) {
      Linking.openURL(`https://${member.github}`);
    }
  };

  const handleContactPress = () => {
    if (member.contact.includes('@')) {
      Linking.openURL(`mailto:${member.contact}`);
    } else {
      Linking.openURL(`tel:${member.contact}`);
    }
  };

  return (
    <View>
      <TouchableOpacity 
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          marginHorizontal: 20,
          marginVertical: 8,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.12,
          shadowRadius: 12,
          elevation: 6,
        }}
        onPress={() => setShowDetails(!showDetails)}
        activeOpacity={0.95}
      >
        {/* Gradient Header */}
        <View style={{ height: 6 }}>
          <Svg height="6" width="100%" style={{ position: 'absolute' }}>
            <Defs>
              <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor="#873939" />
                <Stop offset="100%" stopColor="#d8cc39" />
              </LinearGradient>
            </Defs>
            <Path d="M0,0 L100%,0 L100%,6 L0,6 Z" fill="url(#grad)" />
          </Svg>
        </View>

        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              position: 'relative',
              marginRight: 16,
            }}>
              <Image
                source={{ uri: member.avatar }}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  borderWidth: 3,
                  borderColor: '#f0f0f0',
                }}
              />
              {/* Status indicator */}
              <View style={{
                position: 'absolute',
                bottom: 2,
                right: 2,
                width: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: '#10b981',
                borderWidth: 3,
                borderColor: 'white',
              }} />
            </View>
            
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 19,
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: 4,
              }}>
                {member.name}
              </Text>
              
              <View style={{
                backgroundColor: member.position.includes('Professor') ? '#873939' : '#d8cc39',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 16,
                alignSelf: 'flex-start',
                marginBottom: 8,
              }}>
                <Text style={{
                  fontSize: 12,
                  color: member.position.includes('Professor') ? 'white' : '#1f2937',
                  fontWeight: '700',
                  letterSpacing: 0.5,
                }}>
                  {member.position}
                </Text>
              </View>

              {member.department && (
                <Text style={{
                  fontSize: 13,
                  color: '#6b7280',
                  fontStyle: 'italic',
                  marginBottom: 8,
                }}>
                  {member.department}
                </Text>
              )}
              
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {member.github && (
                  <TouchableOpacity 
                    onPress={handleGitHubPress}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#f8fafc',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: '#e2e8f0',
                    }}
                  >
                    <GitHubIcon />
                    <Text style={{
                      fontSize: 12,
                      color: '#4f46e5',
                      marginLeft: 4,
                      fontWeight: '500',
                    }}>
                      GitHub
                    </Text>
                  </TouchableOpacity>
                )}
                
                <TouchableOpacity 
                  onPress={handleContactPress}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#f8fafc',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#e2e8f0',
                  }}
                >
                  {member.contact.includes('@') ? <EmailIcon /> : <PhoneIcon />}
                  <Text style={{
                    fontSize: 12,
                    color: '#6b7280',
                    marginLeft: 4,
                    fontWeight: '500',
                  }}>
                    Contato
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Expand indicator */}
            <View style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: '#f3f4f6',
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{ rotate: showDetails ? '180deg' : '0deg' }],
            }}>
              <Text style={{ color: '#6b7280', fontSize: 12, fontWeight: 'bold' }}>
                ▼
              </Text>
            </View>
          </View>
          
          {/* Expandable details */}
          {showDetails && (
            <View style={{
              marginTop: 16,
              paddingTop: 16,
              borderTopWidth: 1,
              borderTopColor: '#f3f4f6',
            }}>
              {member.bio && (
                <View style={{ marginBottom: 12 }}>
                  <Text style={{
                    fontSize: 14,
                    color: '#4b5563',
                    lineHeight: 20,
                  }}>
                    {member.bio}
                  </Text>
                </View>
              )}
              
              {member.skills && (
                <View>
                  <Text style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: 8,
                  }}>
                    Habilidades
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                    {member.skills.map((skill, index) => (
                      <View
                        key={index}
                        style={{
                          backgroundColor: '#eff6ff',
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 12,
                          borderWidth: 1,
                          borderColor: '#dbeafe',
                        }}
                      >
                        <Text style={{
                          fontSize: 11,
                          color: '#1e40af',
                          fontWeight: '500',
                        }}>
                          {skill}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function Teste() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredMembers = selectedFilter === 'all' 
    ? [...teamMembers, ...professors] 
    : selectedFilter === 'students' 
    ? teamMembers 
    : professors;

  return (
    <ScrollView 
      style={{ 
        flex: 1, 
        backgroundColor: '#f8f9fa' 
      }}
      contentContainerStyle={{
        paddingBottom: 120, // Espaço para a tab bar
      }}
    >
      {/* Header com gradiente */}
      <View style={{ position: 'relative', overflow: 'hidden' }}>
        <Svg height="200" width="100%" style={{ position: 'absolute' }}>
          <Defs>
            <LinearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#873939" />
              <Stop offset="50%" stopColor="#a84545" />
              <Stop offset="100%" stopColor="#d8cc39" />
            </LinearGradient>
          </Defs>
          <Path d="M0,0 L100%,0 L100%,180 Q50%,200 0,180 Z" fill="url(#headerGrad)" />
        </Svg>
        
        <View style={{
          paddingTop: 60,
          paddingBottom: 40,
          paddingHorizontal: 20,
          position: 'relative',
          zIndex: 1,
        }}>
          <Text style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: '#1f2937',
            textAlign: 'center',
            textShadowColor: 'rgba(255,255,255,0.8)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
            marginBottom: 8,
          }}>
            Nossa Equipe
          </Text>
          <Text style={{
            fontSize: 16,
            color: '#4b5563',
            textAlign: 'center',
            fontWeight: '600',
            textShadowColor: 'rgba(255,255,255,0.5)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 1,
          }}>
            Conheça quem desenvolve este projeto
          </Text>
        </View>
      </View>

      {/* Filtros */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}>
        {[
          { key: 'all', label: 'Todos' },
          { key: 'students', label: 'Alunos' },
          { key: 'professors', label: 'Professores' }
        ].map((filter) => (
          <TouchableOpacity
            key={filter.key}
            onPress={() => setSelectedFilter(filter.key)}
            style={{
              flex: 1,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 12,
              backgroundColor: selectedFilter === filter.key ? '#873939' : 'transparent',
            }}
          >
            <Text style={{
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '600',
              color: selectedFilter === filter.key ? 'white' : '#6b7280',
            }}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stats Cards */}
      <View style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 24,
        gap: 12,
      }}>
        <View style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 16,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 3,
        }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#d8cc39',
            marginBottom: 4,
          }}>
            {teamMembers.length}
          </Text>
          <Text style={{
            fontSize: 12,
            color: '#6b7280',
            fontWeight: '500',
          }}>
            Desenvolvedores
          </Text>
        </View>
        
        <View style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 16,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 3,
        }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#873939',
            marginBottom: 4,
          }}>
            {professors.length}
          </Text>
          <Text style={{
            fontSize: 12,
            color: '#6b7280',
            fontWeight: '500',
          }}>
            Professores
          </Text>
        </View>
      </View>

      {/* Lista de membros filtrada */}
      <View style={{ marginBottom: 32 }}>
        {selectedFilter === 'all' || selectedFilter === 'students' ? (
          <View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 20,
              marginBottom: 16,
            }}>
              <View style={{
                width: 4,
                height: 24,
                backgroundColor: '#d8cc39',
                borderRadius: 2,
                marginRight: 12,
              }} />
              <Text style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: '#1f2937',
              }}>
                Desenvolvedores
              </Text>
              <View style={{
                backgroundColor: '#f3f4f6',
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 8,
                marginLeft: 8,
              }}>
                <Text style={{
                  fontSize: 12,
                  color: '#6b7280',
                  fontWeight: '600',
                }}>
                  {teamMembers.length}
                </Text>
              </View>
            </View>
            
            {teamMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </View>
        ) : null}

        {selectedFilter === 'all' || selectedFilter === 'professors' ? (
          <View style={{ marginTop: selectedFilter === 'all' ? 32 : 0 }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 20,
              marginBottom: 16,
            }}>
              <View style={{
                width: 4,
                height: 24,
                backgroundColor: '#873939',
                borderRadius: 2,
                marginRight: 12,
              }} />
              <Text style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: '#1f2937',
              }}>
                Professores
              </Text>
              <View style={{
                backgroundColor: '#f3f4f6',
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 8,
                marginLeft: 8,
              }}>
                <Text style={{
                  fontSize: 12,
                  color: '#6b7280',
                  fontWeight: '600',
                }}>
                  {professors.length}
                </Text>
              </View>
            </View>
            
            {professors.map((professor) => (
              <MemberCard key={professor.id} member={professor} />
            ))}
          </View>
        ) : null}
      </View>

      {/* Footer modernizado */}
      <View style={{
        marginTop: 40,
        marginHorizontal: 20,
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
      }}>
        <View style={{
          backgroundColor: 'white',
          padding: 24,
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 5,
        }}>
          <View style={{
            alignItems: 'center',
            marginBottom: 16,
          }}>
            <View style={{
              width: 60,
              height: 4,
              backgroundColor: '#d8cc39',
              borderRadius: 2,
              marginBottom: 16,
            }} />
            
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: 8,
            }}>
              Projeto Educacional
            </Text>
            
            <Text style={{
              textAlign: 'center',
              color: '#6b7280',
              fontSize: 14,
              lineHeight: 20,
              marginBottom: 16,
            }}>
              Este aplicativo foi desenvolvido como projeto educacional de estudantes de eletrônica para estudantes de eletrônica, visando facilitar o aprendizado e a prática de conceitos fundamentais da área.
            </Text>
          </View>
          
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: '#f3f4f6',
          }}>
            <Text style={{
              color: '#9ca3af',
              fontSize: 12,
              fontWeight: '500',
            }}>
              © 2025 IFSul Campus Pelotas
            </Text>
            
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#10b981',
                marginRight: 6,
              }} />
              <Text style={{
                color: '#6b7280',
                fontSize: 12,
                fontWeight: '500',
              }}>
                Em desenvolvimento
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}