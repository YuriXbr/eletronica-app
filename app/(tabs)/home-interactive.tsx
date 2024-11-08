import React from "react";
import "../../global.css"
import { Alert, Button, ScrollView, View } from "react-native";
import Card from '../../components/card';
import { TextHeader } from "../../components/TextHeader";
import ExamCard from "@/components/ExamCard";

export default function HomeInteractive() {

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-white p-2">
        <div className="flex justify-between items-center">
          <svg xmlns="http://www.w3.org/2000/svg" 
            width="32" height="32" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
            className="lucide lucide-chevron-left">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          <h1 className=" flex m-auto justify-center items-center align-middle font-bold text-center text-xl color-black">
            Home
          </h1>
          <svg xmlns="http://www.w3.org/2000/svg" 
            className="lucide lucide-bell"
            width="32" height="32" viewBox="0 0 24 24" fill="full" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
            strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
          </svg>
        </div>
      </div>
          
      {/* EXAM CARD */}
      <ExamCard />

      {/* CARD */}
      <TextHeader text="Materiais" />
      <ScrollView>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </ScrollView>
      {/* MAIN CONTAINER */}
      
      <div className="">
        <TextHeader text="Atalho1" />
        <h3 className="">A</h3>
        <h3 className="">B</h3>
        <h3 className="">C</h3>
        <h3 className="">D</h3>
      </div>
      <div className="">
      <TextHeader text="Atalho2" />
        <h3>A</h3>
        <h3>B</h3>
        <h3>C</h3>
        <h3>D</h3>
      </div>
    </>
  );
}
