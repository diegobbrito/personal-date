import React, { useState } from "react";
import InviteInputField from "../components/Fields/InviteInputField";
import InviteSelectField from "../components/Fields/InviteSelectField";
import InviteTextAreaField from "../components/Fields/InviteTextAreaField";
import InvitePreview from "../components/Preview/InvitePreview";
import PackageSelector from "../components/Buttons/PackageSelector";

interface InviteFormData {
  sender: string;
  eventDate: string;
  eventTime: string;
  message: string;
  address: string;
  fontFamily: string;
  border?: string;
  borderColor?: string;
  specialBorder?: string;
}

const fontOptions = [
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "'Times New Roman', serif", label: "Times New Roman" },
  { value: "'Courier New', monospace", label: "Courier New" },
  { value: "'Georgia', serif", label: "Georgia" },
  { value: "'Palatino Linotype', 'Book Antiqua', Palatino, serif", label: "Palatino" },
  { value: "'Brush Script MT', cursive", label: "Brush Script" },
];

const MakeYourInvite: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<"simple" | "complete">("simple");
  const [formData, setFormData] = useState<InviteFormData[]>([{
    sender: "",
    eventDate: "",
    eventTime: "",
    message: "",
    address: "",
    fontFamily: "Arial, sans-serif",
    border: "no",
  }]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = [...prev];
      updatedFormData[index] = { ...updatedFormData[index], [name]: value };
      return updatedFormData;
    });
  };

  const handleSelectPackage = (packageType: "simple" | "complete") => {
    setSelectedPackage(packageType);
    setFormData(
      packageType === "complete"
        ? [
            { ...formData[0] },
            { sender: "", eventDate: "", eventTime: "", message: "", address: "", fontFamily: "Arial, sans-serif", border: "no" },
          ]
        : [formData[0]]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Convites enviados:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900">
      <div className="flex flex-col items-center justify-start py-5 lg:py-12 px-4 sm:px-6 mx-auto w-full">
        <h1 className="text-4xl md:text-6xl tracking-tighter text-white font-mono text-center">
          Crie seu Convite!
        </h1>
      </div>
    
      <PackageSelector onSelectPackage={handleSelectPackage} selectedPackage={selectedPackage} />

      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 py-8 px-4 sm:px-6 md:px-8 w-full max-w-7xl mx-auto">

        <div className="w-full lg:w-1/2 max-w-2xl bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {formData.map((invite, index) => (
              <div key={index} className="border border-white/20 p-6 mb-6 rounded-lg bg-white/5">
                <h2 className="text-white text-xl font-bold mb-4">Convite {index + 1}</h2>
                
                <InviteInputField
                  label="Remetente"
                  id={`sender-${index}`}
                  name="sender"
                  value={invite.sender}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Quem está enviando este convite?"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InviteInputField
                    label="Data do Evento"
                    id={`eventDate-${index}`}
                    name="eventDate"
                    type="date"
                    value={invite.eventDate}
                    onChange={(e) => handleChange(e, index)}
                  />

                  <InviteInputField
                    label="Horário"
                    id={`eventTime-${index}`}
                    name="eventTime"
                    type="time"
                    value={invite.eventTime}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <InviteInputField
                  label="Endereço"
                  id={`address-${index}`}
                  name="address"
                  value={invite.address}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Onde será o evento?"
                />

                <InviteSelectField
                  label="Estilo da Fonte"
                  id={`fontFamily-${index}`}
                  name="fontFamily"
                  value={invite.fontFamily}
                  onChange={(e) => handleChange(e, index)}
                  options={fontOptions}
                />

                <InviteTextAreaField
                  label="Mensagem Personalizada"
                  id={`message-${index}`}
                  name="message"
                  value={invite.message}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Escreva sua mensagem especial..."
                  rows={8}
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg"
            >
              Gerar Convite
            </button>
          </form>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center space-y-8 sticky top-8">
          {formData.map((invite, index) => (
            <div key={index} className="w-full max-w-2xl">
              <h3 className="text-white text-xl font-bold mb-4 text-center">Prévia do Convite {index + 1}</h3>
              <InvitePreview formData={invite} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MakeYourInvite;