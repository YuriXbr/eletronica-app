import React from "react";
import "../../global.css"
import { Link } from "expo-router";
import { Ellipsis } from "lucide-react";

export default function Formulas() {
  return (
    <>
      <div className='h-1/5 w-full bg-backgreen'>
        <div className="flex items-center">
          <div className="w-[50] h-[50] z-10 p-4 m-5 bg-zinc-400/20 rounded-xl items-center">
            <svg fill="white" xmlns="http://www.w3.org/2000/svg" 
              width="24px" height="24px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve">
              <path d="M48.6,23H15.4c-0.9,0-1.3-1.1-0.7-1.7l9.6-9.6c0.6-0.6,0.6-1.5,0-2.1l-2.2-2.2c-0.6-0.6-1.5-0.6-2.1,0
                L2.5,25c-0.6,0.6-0.6,1.5,0,2.1L20,44.6c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1l-9.6-9.6C14,30.1,14.4,29,15.3,29
                h33.2c0.8,0,1.5-0.6,1.5-1.4v-3C50,23.8,49.4,23,48.6,23z"/>
            </svg>
          </div>
          <h1 className="text-white text-2xl font-bold poppins-black">FÓRMULAS</h1>
        </div>
      </div>
      <div className="bg-white rounded-t-3xl w-full h-4/5 bottom-0 flex flex-grow flex-col pl-6">
        <a className="text-textprimary text-2xl font-bold poppins-black mt-3">Disciplinas Disponiveis</a>
        <a className="text-textsecundary font-bold poppins-black mb-5">Escolha as fórmulas de uma disciplina</a>

        <div className="flex flex-col items-start mr-8 space-y-3">
          {/* Envolvendo o card com Link para a página dinâmica */}
          <Link href={`../disciplina/eletricidade-i`}>
            <div className="flex flex-row h-full bg-zinc-400/20 rounded-xl items-center p-3 w-full ">
              <div className="flex-col w-full">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex space-x-2">
                    <h2 className="">ELETRICIDADE I</h2>
                    <h3 className="bg-lime-300 rounded-full px-2">NOVO</h3>
                  </div>
                  <Ellipsis className="font-black" />
                </div>
                <p className="mt-2">Apresentação sobre eletricidade basica</p>
                <div className="mt-2 flex justify-between items-center">
                  <div className="flex space-x-5 items-center">
                    <h2 className="text-blue-500 text-xs">2º Semestre</h2>
                    <h3 className="text-blue-500 text-xs">TEC.TRO_COD</h3>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <h2 className="text-blue-500 text-xs">18/02/2025</h2>
                    <h3 className="text-lime-500 text-4xl ml-5">•</h3>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          {/* Outros cards podem ser adicionados da mesma forma */}
          <Link href={`../disciplina/eletricidade-ii`}>
            <div className="flex flex-row h-full bg-zinc-400/20 rounded-xl items-center p-3 w-full ">
              <div className="flex-col w-full">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex space-x-2">
                    <h2 className="">ELETRICIDADE II</h2>
                    <h3 className="bg-lime-300 rounded-full px-2">NOVO</h3>
                  </div>
                  <Ellipsis className="font-black" />
                </div>
                <p className="mt-2">Apresentação sobre eletricidade basica</p>
                <div className="mt-2 flex justify-between items-center">
                  <div className="flex space-x-5 items-center">
                    <h2 className="text-blue-500 text-xs">2º Semestre</h2>
                    <h3 className="text-blue-500 text-xs">TEC.TRO_COD</h3>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <h2 className="text-blue-500 text-xs">18/02/2025</h2>
                    <h3 className="text-lime-500 text-4xl ml-5">•</h3>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}