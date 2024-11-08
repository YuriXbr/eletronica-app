import { Alert, Button } from "react-native"


export default function ExamCard() {
    return (
        <a href="" className="transition-transform m-5 p-4 w-auto h-48 flex justify-center bg-slate-400/60 rounded-lg ">
        <div>
          <h1 className="font-bold text-xl">VOCÊ TEM UMA PROVA PARA HOJE</h1>
          <h3>Você tem uma prova de MATERIA para hoje</h3>
          <button className="p-2 bg-gray-500 align-middle justify-center m-3 mt-4 rounded-full">VER PROVA</button>
          <button className="p-2 align-middle justify-center m-3 ml-0 mt-4 rounded-full">Ignorar</button>
            <Button title="VER PROVA" onPress={() => { Alert.alert("Você me pressionou")}} />
        </div>
      </a>
    )
}