import React from "react";
import ValueCard from "./ValueCard/Card";

const ValueCards: React.FC = () => {
  const basicFeatures: string[] = [
    "Convites estáticos",
    "Templates limitados",
    "Personalização simples",
  ];

  const intermediateFeatures: string[] = [
    "Convites dinâmicos",
    "Mais templates",
    "Personalização avançada",
  ];



  return (
    <div className="w-full py-[10rem] px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8">

        <ValueCard
          title="Pacote Simples"
          price="R$ 1.99"
          features={basicFeatures}
          buttonText="Comprar Agora"
          buttonColor="[#f76d02]"
        />

        <ValueCard
          title="Pacote Completo"
          price="R$ 9.99"
          features={intermediateFeatures}
          buttonText="Comprar Agora"
          buttonColor="[#f76d02]"
        />

        

      </div>
    </div>
  );
};

export default ValueCards;
