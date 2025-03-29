import React from "react";

interface InvitePreviewProps {
  formData: {
    sender: string;
    eventDate: string;
    eventTime: string;
    message: string;
    address: string;
    fontFamily: string;
    template: string; 
  };
}

const InvitePreview: React.FC<InvitePreviewProps> = ({ formData }) => {
  const renderTemplate = () => {
    switch(formData.template) {
      case 'modern':
        return (
          <div className="modern-template">
            <h2 className="text-3xl font-light uppercase tracking-widest">Convite</h2>
            <div className="border-l-4 border-purple-500 pl-4 my-4">
              <p className="text-xl">{formData.sender || "XXXXXXXXXX"} convida</p>
            </div>
            <div className="grid grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm text-gray-500">DATA</p>
                <p>{formData.eventDate || "DD/MM/AAAA"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">HORÁRIO</p>
                <p>{formData.eventTime || "XX:XX"}</p>
              </div>
            </div>
            <p className="my-4">{formData.address || "XXXXXXXXXX"}</p>
            <div className="bg-gray-100 p-4 rounded">
              <p className="italic">{formData.message || "Nenhuma mensagem informada"}</p>
            </div>
          </div>
        );
      case 'elegant':
        return (
          <div className="elegant-template text-center">
            <h2 className="text-4xl font-serif mb-8">Convite</h2>
            <p className="text-xl mb-2">É com grande prazer que</p>
            <p className="text-2xl font-serif mb-8">{formData.sender || "XXXXXXXXXX"}</p>
            <p className="mb-8">convida para o evento que ocorrerá em</p>
            <p className="text-xl mb-2">{formData.eventDate || "DD/MM/AAAA"} às {formData.eventTime || "XX:XX"}</p>
            <p className="mb-8">no endereço:</p>
            <p className="text-xl mb-8">{formData.address || "XXXXXXXXXX"}</p>
            <div className="border-t pt-8">
              <p>{formData.message || "Nenhuma mensagem informada"}</p>
            </div>
          </div>
        );
      case 'fun':
        return (
          <div className="fun-template">
            <h2 className="text-4xl font-bold text-yellow-500 mb-4">🎉 Você está convidado! 🎉</h2>
            <p className="text-xl mb-2">Quem: {formData.sender || "XXXXXXXXXX"}</p>
            <p className="text-xl mb-2">Quando: {formData.eventDate || "DD/MM/AAAA"} às {formData.eventTime || "XX:XX"}</p>
            <p className="text-xl mb-2">Onde: {formData.address || "XXXXXXXXXX"}</p>
            <div className="bg-yellow-100 p-4 rounded-lg mt-4">
              <p className="text-lg">💌 Mensagem especial:</p>
              <p>{formData.message || "Nenhuma mensagem informada"}</p>
            </div>
          </div>
        );
      default: // classic
        return (
          <div className="classic-template">
            <h2 className="text-4xl font-bold">Convite</h2>
            <div className="w-full space-y-4">
              <p className="text-xl md:text-2xl break-words w-full">Nome: {formData.sender || "XXXXXXXXXX"}</p>
              <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0">
                <p className="text-xl md:text-2xl break-words">Data: {formData.eventDate || "DD/MM/AAAA"}</p>
                <p className="text-xl md:text-2xl break-words">Horário: {formData.eventTime || "XX:XX"}</p>
              </div>
              <p className="text-xl md:text-2xl break-words w-full">Endereço: {formData.address || "XXXXXXXXXX"}</p>
              <p className="font-semibold text-xl md:text-2xl break-words w-full">Mensagem:</p>
              <div className="w-full">
                <p className="mt-2 p-4 md:p-6 bg-gray-50 rounded break-words whitespace-pre-line min-h-[300px] md:min-h-[400px] overflow-auto w-full text-lg">
                  {formData.message || "Nenhuma mensagem informada"}
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`w-full max-w-2xl bg-white p-8 md:p-10 rounded-3xl shadow-lg flex flex-col items-center space-y-6 mb-8 ${formData.template}`}
      style={{ fontFamily: formData.fontFamily }}
    >
      {renderTemplate()}
    </div>
  );
};

export default InvitePreview;
