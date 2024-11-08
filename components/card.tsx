


export default function Card() {
    return (
        <a className="p-3 ml-auto mr-auto mt-3 flex">
          <div className="flex p-4 bg-zinc-600/20 round-full rounded-xl">
            <img className="mr-3 justify-center" height={150} width={150} src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="placeholder" />
            <div className="grid grid-rows-4">
              <h2 className="color-white font-bold text-xl">TITULO DO CARD</h2>
              <h2 className="color-white">SUBTITULO DO CARTÃO</h2>
              <h2 className="color-white">CONTEUDO 1</h2>
              <h2 className="color-white">CONTEUDO 2 KK</h2>
            </div>
          </div>
        </a>
    )
}

