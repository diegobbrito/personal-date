import React from "react";
import ValueCard from "./ValueCard/Card";

const ValueCards: React.FC = () => {
  const basicFeatures: string[] = [
    "Única opção de convite",
    "Templates limitados",
 
  ];

  const intermediateFeatures: string[] = [
    "Mais opções de convite",
    "Mais templates",
   
  ];

  return (
    <div className="w-full py-[10rem] px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8">
        <ValueCard
          title="Pacote Simples"
          price="De R$ 1.99 por R$ 0.00"
          features={basicFeatures}
          buttonText="Comprar Agora"
          buttonColor="[#f76d02]"
        />

        <ValueCard
          title="Pacote Completo"
          price="De R$ 4.99 por R$ 0.00"
          features={intermediateFeatures}
          buttonText="Comprar Agora"
          buttonColor="[#f76d02]"
        />
      </div>
    </div>
  );
};

export default ValueCards;
