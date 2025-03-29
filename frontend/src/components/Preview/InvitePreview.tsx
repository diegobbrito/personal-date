import React from "react";

interface InvitePreviewProps {
  formData: {
    sender: string;
    eventDate: string;
    eventTime: string;
    message: string;
    address: string;
    fontFamily: string;
  };
}

const InvitePreview: React.FC<InvitePreviewProps> = ({ formData }) => (
  <div
    className="w-full max-w-2xl bg-white p-8 md:p-10 rounded-3xl shadow-lg flex flex-col items-center space-y-6 mb-8"
    style={{ fontFamily: formData.fontFamily }}
  >
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

export default InvitePreview;
