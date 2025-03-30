import React from "react";
import { useLocation } from "react-router-dom";
import InvitePreview from "../components/Preview/InvitePreview";

interface InviteFormData {
  sender: string;
  eventDate: string;
  eventTime: string;
  message: string;
  address: string;
  fontFamily: string;
  template: "classic" | "modern" | "elegant" | "fun";
}

const Checkout: React.FC = () => {
  const location = useLocation();
  const formData = location.state?.formData as InviteFormData[] || [];
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados:", { name, email, invites: formData });
    alert("Convites enviados para processamento!");
  };

  return (
    <div className=" bg-gradient-to-b from-blue-900 to-purple-900 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl text-white font-bold text-center mb-8">
          Finalize seu Pedido
        </h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl p-6 mb-6">
          <h2 className="text-2xl text-white font-bold mb-4">Seus Convites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.map((invite, index) => (
              <div key={index} className="border border-white/20 p-4 rounded-lg">
                <InvitePreview formData={invite} />
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Checkout;
