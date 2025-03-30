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

  const payload = {
    client: {
      name: name,
      mail: email
    },
    meetings: formData.map(invite => ({
      receiverName: invite.sender,
      eventDate: invite.eventDate,
      eventTime: invite.eventTime,
      message: invite.message,
      fontFamily: invite.fontFamily,
      address: invite.address,
      template: invite.template
    }))
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados:", payload);
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

        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl p-6">
          <h2 className="text-2xl text-white font-bold mb-4">Informações Pessoais</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500"
              placeholder="Nome Completo"
              required
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500"
              placeholder="E-mail"
              required
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg"
            >
              Finalizar Compra
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
