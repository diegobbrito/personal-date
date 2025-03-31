import React from "react";
import { useNavigate } from "react-router-dom";

interface ValueCardProps {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  buttonColor: string;
}

const ValueCard: React.FC<ValueCardProps> = ({
  title,
  price,
  features,
  buttonText,
}) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/makeyourinvite");
  };
  
  return (
    <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 bg-white">
      <h2 className="text-2xl font-bold text-center py-8">{title}</h2>
      <p className="text-center text-4xl font-bold">{price}</p>
      <div className="text-center font-medium flex-grow">
        {features.map((feature, index) => (
          <p key={index} className="py-2 border-b mx-4 mt-6">
            {feature}
          </p>
        ))}
      </div>
      <button
        className={`bg-[#f76d02] text-white w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 self-end`}
        onClick={handleRedirect}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ValueCard;
