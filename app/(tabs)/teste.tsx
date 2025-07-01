
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { ScrollView } from 'react-native';

// Mude o o nome e os contatos em uma div em aberto para cada membro da equipe.
// Adicione a linha do github caso queira, trocando o link para o seu.
// -- Exemplo: <h2>GitHub: <img id='github icon' className='h-4 inline' src='https://cdn-icons-png.flaticon.com/512/25/25231.png'></img> github.com/YuriXbr</h2>
// 
// Se quiser, adicione sua oto no lugar da imagem do static.vecteezy.com
// -- Exemplo: <img className='h-14 rounded-full' src="https:// linda-imagem-do-seu-perfil"></img>
// Pode usar o imgur, mas tem que copiar o link direto da imagem, não do site.
// Evite mexer no CSS para não quebrar o layout ou tirar do padrão do projeto.
// caso queira adicionar mais membros, copie a div inteira e cole abaixo da última, mantendo o padrão.

export default function Teste() {

    return (
        <>
            <ScrollView>
                <div>
                    <h1 className='text-2xl font-bold text-center m-5 mt-6'>Equipe de Desenvolvimento</h1>
                </div>
                <div className='m-3 p-3 bg-zinc-300 border-l-8 border-l-yellow-300 w-auto h-auto flex flex-row space-x-5 items-center rounded-md hover:bg-zinc-400 transition-all duration-300'>
                    <img className='h-14 rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"></img>
                    <div className='flex flex-col'>
                        <h1 className='font-bold'>Yuri Andrade dos Anjos</h1>
                        <h2>GitHub: <img id='github icon' className='h-4 inline' src='https://cdn-icons-png.flaticon.com/512/25/25231.png'></img> github.com/YuriXbr</h2>
                        <h2>Contato: +53 984620902</h2>
                        <h2>Posição: Desenvolvedor</h2>
                    </div>
                    
                </div>
                <div className='m-3 p-3 bg-zinc-300 border-l-8 border-l-yellow-300 w-auto h-auto flex flex-row space-x-5 items-center rounded-md hover:bg-zinc-400 transition-all duration-300'>
                    <img className='h-14 rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"></img>
                    <div className='flex flex-col'>
                        <h1 className='font-bold'>Nome Da pessoa</h1>
                        <h2>Contato: </h2>
                        <h2>Posição: </h2>
                    </div>
                    
                </div>
                <div className='m-3 p-3 bg-zinc-300 border-l-8 border-l-yellow-300 w-auto h-auto flex flex-row space-x-5 items-center rounded-md hover:bg-zinc-400 transition-all duration-300'>
                    <img className='h-14 rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"></img>
                    <div className='flex flex-col'>
                        <h1 className='font-bold'>Nome Da pessoa</h1>
                        <h2>Contato: </h2>
                        <h2>Posição: </h2>
                    </div>
                    
                </div>
                <div className='m-3 p-3 bg-zinc-300 border-l-8 border-l-yellow-300 w-auto h-auto flex flex-row space-x-5 items-center rounded-md hover:bg-zinc-400 transition-all duration-300'>
                    <img className='h-14 rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"></img>
                    <div className='flex flex-col'>
                        <h1 className='font-bold'>Nome Da pessoa</h1>
                        <h2>Contato: </h2>
                        <h2>Posição: </h2>
                    </div>
                    
                </div>
                <div className='m-3 p-3 bg-zinc-300 border-l-8 border-l-yellow-300 w-auto h-auto flex flex-row space-x-5 items-center rounded-md hover:bg-zinc-400 transition-all duration-300'>
                    <img className='h-14 rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"></img>
                    <div className='flex flex-col'>
                        <h1 className='font-bold'>Nome Da pessoa</h1>
                        <h2>Contato: </h2>
                        <h2>Posição: </h2>
                    </div>
                    
                </div>
                <div className='m-3 p-3 bg-zinc-300 border-l-8 border-l-yellow-300 w-auto h-auto flex flex-row space-x-5 items-center rounded-md hover:bg-zinc-400 transition-all duration-300'>
                    <img className='h-14 rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"></img>
                    <div className='flex flex-col'>
                        <h1 className='font-bold'>Nome Da pessoa</h1>
                        <h2>Contato: </h2>
                        <h2>Posição: </h2>
                    </div>
                    
                </div>
                <div className='m-3 p-3 bg-zinc-300 border-l-8 border-l-yellow-300 w-auto h-auto flex flex-row space-x-5 items-center rounded-md hover:bg-zinc-400 transition-all duration-300'>
                    <img className='h-14 rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"></img>
                    <div className='flex flex-col'>
                        <h1 className='font-bold'>Nome Da pessoa</h1>
                        <h2>Contato: </h2>
                        <h2>Posição: </h2>
                    </div>
                    
                </div>
                <div>
                    <h1 className='text-2xl font-bold text-center m-5'>Professores</h1>
                </div>
                <div className='m-3 p-3 bg-zinc-300 border-l-8 border-l-yellow-300 w-auto h-auto flex flex-row space-x-5 items-center rounded-md hover:bg-zinc-400 transition-all duration-300'>
                    <img className='h-14 rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"></img>
                    <div className='flex flex-col'>
                        <h1 className='font-bold'>Nome Da pessoa</h1>
                        <h2>Contato: </h2>
                        <h2>Posição: </h2>
                    </div>
                    
                </div>
                <div className='m-3 p-3 bg-zinc-300 border-l-8 border-l-yellow-300 w-auto h-auto flex flex-row space-x-5 items-center rounded-md hover:bg-zinc-400 transition-all duration-300'>
                    <img className='h-14 rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"></img>
                    <div className='flex flex-col'>
                        <h1 className='font-bold'>Nome Da pessoa</h1>
                        <h2>Contato: </h2>
                        <h2>Posição: </h2>
                    </div>
                    
                </div>
                <div className='m-3 p-3 bg-zinc-300 border-l-8 border-l-yellow-300 w-auto h-auto flex flex-row space-x-5 items-center rounded-md hover:bg-zinc-400 transition-all duration-300'>
                    <img className='h-14 rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"></img>
                    <div className='flex flex-col'>
                        <h1 className='font-bold'>Nome Da pessoa</h1>
                        <h2>Contato: </h2>
                        <h2>Posição: </h2>
                    </div>
                    
                </div>
                {/* Footer com copyright */}
                {/* divisor */}
                <div className='border-t border-gray-300 my-5 mx-2 rounded-full'></div>

                <div className='text-center text-gray-500 text-sm mt-5 mb-10'>
                    <p>© 2025 Todos os direitos reservados.</p>
                    <p>Desenvolvido por alunos do IFSul Campus Pelotas.</p>
                </div>

                </ScrollView>
        </>
    )
}