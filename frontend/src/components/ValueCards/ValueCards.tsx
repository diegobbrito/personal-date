const ValueCards = () => {
    return (
      <div className="w-full py-[10rem] px-4">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
          
          <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 bg-white">
            <h2 className="text-2xl font-bold text-center py-8">Pacote Básico</h2>
            <p className="text-center text-4xl font-bold">R$ 1.99</p>
            <div className="text-center font-medium flex-grow">
              <p className="py-2 border-b mx-8 mt-8">Convites estáticos</p>
              <p className="py-2 border-b mx-8">Templates limitados</p>
              <p className="py-2 border-b mx-8">Personalização simples</p>
            </div>
            <button className="bg-[#f76d02] text-white w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 self-end">
              Comprar Agora
            </button>
          </div>
  
          <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 bg-white">
            <h2 className="text-2xl font-bold text-center py-8">Pacote Intermediário</h2>
            <p className="text-center text-4xl font-bold">R$ 9.99</p>
            <div className="text-center font-medium flex-grow">
              <p className="py-2 border-b mx-8 mt-8">Convites dinâmicos</p>
              <p className="py-2 border-b mx-8">Mais templates</p>
              <p className="py-2 border-b mx-8">Personalização avançada</p>
            </div>
            <button className="bg-[#f76d02]  text-white w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 self-end">
              Comprar Agora
            </button>
          </div>
  
          <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 bg-white">
            <h2 className="text-2xl font-bold text-center py-8">Pacote Premium</h2>
            <p className="text-center text-4xl font-bold">R$ 19.99</p>
            <div className="text-center font-medium flex-grow">
              <p className="py-2 border-b mx-8 mt-8">Convites totalmente personalizáveis</p>
              <p className="py-2 border-b mx-8">Templates exclusivos</p>
              <p className="py-2 border-b mx-8">Animações</p>
            
            </div>
            <button className="bg-[#f76d02]  text-white w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 self-end">
              Comprar Agora
            </button>
          </div>
  
        </div>
      </div>
    );
  };
  
  export default ValueCards;
  