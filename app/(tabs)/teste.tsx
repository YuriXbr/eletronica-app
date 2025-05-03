
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';


export default function Teste() {

    return (
        <>
            <div className='m-3 p-3 bg-zinc-400 w-auto h-auto flex flex-row space-x-5'>
                <h1 className=''>TEST PAGE</h1>
                <Latex>{`$1,6\\times 10^{-19} C$`}</Latex>

            </div>
        </>
    )
}