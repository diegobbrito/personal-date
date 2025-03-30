import React from "react";

type TemplateType = "classic" | "modern" | "elegant" | "fun";

interface InvitePreviewProps {
  formData: {
    sender: string;
    receiverName: string;
    eventDate: string;
    eventTime: string;
    message: string;
    address: string;
    fontFamily: string;
    template: TemplateType;
  };
}

const InvitePreview: React.FC<InvitePreviewProps> = ({ formData }) => {
  const messageStyles =
    "p-4 rounded break-words whitespace-pre-wrap overflow-auto text-base w-full max-h-[300px]";

  const formatDate = (dateString: string) => {
    if (!dateString) return "DD/MM/AAAA";
    
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };


  const displayDate = formatDate(formData.eventDate);

  const renderTemplate = () => {
    switch (formData.template) {
      case "modern":
        return (
          <div className="space-y-6 break-words">
            <h2 className="text-3xl font-light uppercase tracking-widest">
              Convite
            </h2>
            <div className="border-l-4 border-purple-500 pl-4 my-4">
              <p className="text-xl">
                {formData.sender || "Remetente"} convida
              </p>
              <p className="text-lg mt-2">
                {formData.receiverName || "Nome do Convidado"}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm text-gray-500">DATA</p>
                <p>{displayDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">HORÁRIO</p>
                <p>{formData.eventTime || "XX:XX"}</p>
              </div>
            </div>
            <p className="my-4 break-words">
              {formData.address || "Endereço do evento"}
            </p>
            <div className={`bg-gray-100 ${messageStyles}`}>
              <p className="italic break-words">
                {formData.message || "Nenhuma mensagem informada"}
              </p>
            </div>
          </div>
        );
      case "elegant":
        return (
          <div className="text-center space-y-6 break-words">
            <h2 className="text-4xl font-serif mb-8">Convite</h2>
            <p className="text-xl mb-2">É com grande prazer que</p>
            <p className="text-2xl font-serif mb-4">
              {formData.sender || "Remetente"}
            </p>
            <p className="text-xl mb-6">convida</p>
            <p className="text-2xl font-serif mb-8">
              {formData.receiverName || "Nome do Convidado"}
            </p>
            <p className="mb-8">para o evento que ocorrerá em</p>
            <p className="text-xl mb-2">
              {displayDate} às{" "}
              {formData.eventTime || "XX:XX"}
            </p>
            <p className="mb-8">no endereço:</p>
            <p className="text-xl mb-8 break-words">
              {formData.address || "Endereço do evento"}
            </p>
            <div className={`border-t pt-8 ${messageStyles}`}>
              <p className="break-words">
                {formData.message || "Nenhuma mensagem informada"}
              </p>
            </div>
          </div>
        );
      case "fun":
        return (
          <div className="space-y-4 break-words">
            <h2 className="text-4xl font-bold text-yellow-500 mb-4 text-center">
              🎉 Você está convidado! 🎉
            </h2>
            <p className="text-xl mb-2">
              <span className="font-semibold">De:</span>{" "}
              {formData.sender || "Remetente"}
            </p>
            <p className="text-xl mb-2">
              <span className="font-semibold">Para:</span>{" "}
              {formData.receiverName || "Nome do Convidado"}
            </p>
            
            <p className="text-xl mb-2">
              <span className="font-semibold">Quando:</span>{" "}
              {displayDate} às{" "}
              {formData.eventTime || "XX:XX"}
            </p>
            <p className="text-xl mb-2">
              <span className="font-semibold">Onde:</span>{" "}
              {formData.address || "Endereço do evento"}
            </p>
            <div className={`bg-yellow-100 ${messageStyles}`}>
              <p className="text-lg font-semibold mb-2">
                💌 Mensagem especial:
              </p>
              <p className="break-words">
                {formData.message || "Nenhuma mensagem informada"}
              </p>
            </div>
          </div>
        );
      default: // classic
        return (
          <div className="space-y-4 break-words">
            <h2 className="text-4xl font-bold text-center">Convite</h2>
            <p className="text-xl md:text-2xl break-words w-full">
              <span className="font-semibold">De:</span>{" "}
              {formData.sender || "Remetente"}
            </p>
            <p className="text-xl md:text-2xl break-words w-full">
              <span className="font-semibold">Para:</span>{" "}
              {formData.receiverName || "Nome do Convidado"}
            </p>
            
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0">
              <p className="text-xl md:text-2xl break-words">
                <span className="font-semibold">Data:</span>{" "}
                {displayDate}
              </p>
              <p className="text-xl md:text-2xl break-words">
                <span className="font-semibold">Horário:</span>{" "}
                {formData.eventTime || "XX:XX"}
              </p>
            </div>
            <p className="text-xl md:text-2xl break-words w-full">
              <span className="font-semibold">Endereço:</span>{" "}
              {formData.address || "Endereço do evento"}
            </p>
            <p className="font-semibold text-xl md:text-2xl break-words w-full">
              Mensagem:
            </p>
            <div className={`bg-gray-50 ${messageStyles}`}>
              <p className="break-words">
                {formData.message || "Nenhuma mensagem informada"}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`w-full h-[800px] bg-white p-8 md:p-10 rounded-3xl shadow-lg ${
        formData.template === "elegant" ? "font-serif" : ""
      } break-words`}
      style={{ fontFamily: formData.fontFamily }}
    >
      {renderTemplate()}
    </div>
  );
};

export default InvitePreview;