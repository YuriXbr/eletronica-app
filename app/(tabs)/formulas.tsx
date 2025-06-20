import React, { useEffect, useState } from "react";
import "../../global.css";
import { Link, useRouter } from "expo-router";
import { Ellipsis } from "lucide-react";

type Disciplina = {
  name: string;
  slug: string;
  description: string;
  status: string;
  semmester: number;
  course: string;
};

export default function Formulas() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const router = useRouter();

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        // Buscar o índice de arquivos JSON
        const response = await fetch("../../../LISTA DE JSON/index.json");
        const files = await response.json();

        // Carregar os dados de cada arquivo JSON
        const disciplinasAtivas: Disciplina[] = [];
        for (const file of files) {
          const disciplinaResponse = await fetch(`../../../LISTA DE JSON/${file}`);
          const disciplinaData = await disciplinaResponse.json();

          // Filtrar apenas disciplinas com status "active"
          if (disciplinaData.status === "active") {
            disciplinasAtivas.push({
              name: disciplinaData.name,
              slug: disciplinaData.slug,
              description: disciplinaData.description,
              status: disciplinaData.status,
              semmester: disciplinaData.semmester,
              course: disciplinaData.course,
            });
          }
        }

        setDisciplinas(disciplinasAtivas);
      } catch (error) {
        console.error("Erro ao carregar disciplinas:", error);
      } finally {
        setLoading(false); // Finalizar o carregamento
      }
    };

    fetchDisciplinas();
  }, []);

  return (
    <>
      {/* Cabeçalho */}
      <div className="h-1/5 w-full bg-backgreen flex items-center justify-between px-5">
        <button
          onClick={() => router.push("/")}
          className="w-[50px] h-[50px] bg-zinc-400/20 rounded-xl flex items-center justify-center"
        >
          <svg
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 52 52"
            enableBackground="new 0 0 52 52"
            xmlSpace="preserve"
          >
            <path d="M48.6,23H15.4c-0.9,0-1.3-1.1-0.7-1.7l9.6-9.6c-0.6-0.6-0.6-1.5,0-2.1l-2.2-2.2c-0.6-0.6-1.5-0.6-2.1,0 L2.5,25c-0.6,0.6-0.6,1.5,0,2.1L20,44.6c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1l-9.6-9.6C14,30.1,14.4,29,15.3,29 h33.2c0.8,0,1.5-0.6,1.5-1.4v-3C50,23.8,49.4,23,48.6,23z" />
          </svg>
        </button>
        <h1 className="text-white text-2xl font-bold poppins-black">DISCIPLINAS</h1>
      </div>

      {/* Conteúdo */}
      <div className="bg-white rounded-t-3xl w-full h-4/5 bottom-0 flex flex-grow flex-col px-6 py-4">
        <h2 className="text-textprimary text-2xl font-bold poppins-black mt-3">
          Disciplinas Disponíveis
        </h2>
        <p className="text-textsecundary font-bold poppins-black mb-5">
          Escolha as fórmulas de uma disciplina
        </p>

        {/* Carregamento */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-10 h-10 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
            <p className="text-green-500 text-lg font-semibold mt-4">Carregando disciplinas...</p>
          </div>
        ) : (
          /* Lista de Disciplinas */
          <div className="flex flex-col items-center space-y-3 w-full">
            {disciplinas.map((disciplina) => (
              <Link key={disciplina.slug} href={`../disciplina/${disciplina.slug}`} className="w-full">
                <div className="flex flex-row bg-zinc-400/20 rounded-xl items-center p-4 w-full hover:bg-zinc-300 transition">
                  <div className="flex-col w-full">
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex space-x-2">
                        <h2 className="text-lg font-bold">{disciplina.name.toUpperCase()}</h2>
                        <span className="bg-lime-300 rounded-full px-2 text-xs font-semibold flex items-center justify-center">
                          NOVO
                        </span>
                      </div>
                      <Ellipsis className="font-black" />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{disciplina.description}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="flex space-x-5 items-center">
                        <span className="text-blue-500 text-xs">
                          {disciplina.semmester}º Semestre
                        </span>
                        <span className="text-blue-500 text-xs">
                          {disciplina.course.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}