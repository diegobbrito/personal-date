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
    className="w-full lg:w-1/2 bg-white p-6 rounded-3xl shadow-lg lg:ml-15 flex flex-col items-center space-y-4 mb-8 lg:mb-0"
    style={{ fontFamily: formData.fontFamily }}
  >
    <h2 className="text-2xl font-bold">Convite</h2>
    <div className="flex flex-col items-center space-y-4 w-full">
      <p>Nome: {formData.sender || "XXXXXXXXXX"}</p>
      <div className="flex flex-row items-center space-x-4">
        <p>Data: {formData.eventDate || "DD/MM/AAAA"}</p>
        <p>Horário: {formData.eventTime || "XX:XX"}</p>
      </div>
      <p>Endereço: {formData.address || "XXXXXXXXXX"}</p>
      <p className="font-semibold">Mensagem:</p>
      <div className="w-full">
        <p className="mt-2 p-4 bg-gray-50 rounded break-words whitespace-pre-line min-h-[400px] overflow-auto w-full">
          {formData.message || "Nenhuma mensagem informada"}
        </p>
      </div>
    </div>
  </div>
);

export default InvitePreview;