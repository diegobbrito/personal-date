import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import InvitePreview from "../components/Preview/InvitePreview";
import axios from "axios";

interface InviteFormData {
  sender: string;
  clientName: string;
  receiverName: string;
  eventDate: string;
  eventTime: string;
  message: string;
  address: string;
  fontFamily: string;
  template: "classic" | "modern" | "elegant" | "fun";
}

const Checkout: React.FC = () => {
  const location = useLocation();
  const formData = (location.state?.formData as InviteFormData[]) || [];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  if(formData.length === 0){
    return <Navigate to="/" replace/>
  }

  const payload = {
    client: { name, mail: email },
    meetings: formData.map((invite) => ({
      sender: invite.sender,
      receiverName: invite.receiverName,
      eventDate: invite.eventDate,
      eventTime: invite.eventTime,
      message: invite.message,
      fontFamily: invite.fontFamily,
      address: invite.address,
      template: invite.template,
    })),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://vs-invite-diegobrito-dev.apps.rm1.0a51.p1.openshiftapps.com/api/v1/invites",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 201) {
        
        alert("Convite gerado com sucesso, cheque seu email!");

      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Ocorreu um erro ao processar sua compra. Por favor, tente novamente.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-900 to-purple-900 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl text-white font-bold text-center mb-8">
          Finalize seu Pedido
        </h1>

        <div className="p-6 mb-6">
          <h2 className="text-2xl text-white font-bold mb-4">Seus Convites</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {formData.length > 0 ? (
              formData.map((invite, index) => (
                <div
                  key={index}
                  className="w-full sm:w-[90%] md:w-[58%] lg:w-[35%] flex justify-center"
                >
                  <InvitePreview formData={invite} />
                </div>
              ))
            ) : (
              <p className="text-white text-center w-full">Nenhum convite encontrado.</p>
            )}
          </div>
        </div>

        <div className="bg-white/10 rounded-xl shadow-xl p-6">
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
