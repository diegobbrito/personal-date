import React, { useEffect, useState } from "react";
import InviteInputField from "../components/Fields/InviteInputField";
import InviteSelectField from "../components/Fields/InviteSelectField";
import InviteTextAreaField from "../components/Fields/InviteTextAreaField";
import InvitePreview from "../components/Preview/InvitePreview";
import PackageSelector from "../components/Buttons/PackageSelector";
import { useNavigate } from "react-router-dom";

type TemplateType = "classic" | "modern" | "elegant" | "fun";

interface InviteFormData {
  clientName: string;
  sender: string;
  eventDate: string;
  receiverName: string;
  eventTime: string;
  message: string;
  address: string;
  fontFamily: string;
  template: TemplateType;
}

const fontOptions = [
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "'Times New Roman', serif", label: "Times New Roman" },
  { value: "'Courier New', monospace", label: "Courier New" },
  { value: "'Georgia', serif", label: "Georgia" },
  {
    value: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
    label: "Palatino",
  },
  { value: "'Brush Script MT', cursive", label: "Brush Script" },
];

const templateOptions = [
  { value: "classic", label: "Clássico" },
  { value: "modern", label: "Moderno" },
  { value: "elegant", label: "Elegante" },
  { value: "fun", label: "Divertido" },
];

const MakeYourInvite: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<"simple" | "complete">(
    "simple"
  );
  const [formData, setFormData] = useState<InviteFormData[]>([
    {
      sender: "",
      eventDate: "",
      receiverName: "",
      eventTime: "",
      message: "",
      address: "",
      fontFamily: "Arial, sans-serif",
      template: "classic",
      clientName: "",
    },
  ]);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateDate = (dateString: string): boolean => {
    if (!dateString) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(dateString);
    return selectedDate >= today;
  };

  useEffect(() => {
    const isValid = formData.every((invite) => {
      return (
        invite.sender.trim() !== "" &&
        invite.receiverName.trim() !== "" &&
        invite.eventDate.trim() !== "" &&
        invite.eventTime.trim() !== "" &&
        invite.address.trim() !== "" &&
        validateDate(invite.eventDate)
      );
    });
    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
            {
              sender: "",
              receiverName: "",
              eventDate: "",
              eventTime: "",
              message: "",
              address: "",
              fontFamily: "Arial, sans-serif",
              template: "classic",
              clientName: "",
            },
          ]
        : [formData[0]]
    );
  };

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      alert(
        "Por favor, preencha todos os campos obrigatórios corretamente antes de gerar o convite."
      );
      return;
    }
    navigate("/checkout", { state: { formData } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900">
      <div className="flex flex-col items-center py-5 lg:py-12 px-4 sm:px-6 mx-auto w-full">
        <h1 className="text-4xl md:text-6xl text-white font-mono text-center">
          Crie seu Convite!
        </h1>
      </div>

      <PackageSelector
        onSelectPackage={handleSelectPackage}
        selectedPackage={selectedPackage}
      />

      <div className="flex flex-col lg:flex-row items-start gap-8 py-8 px-4 sm:px-6 md:px-8 w-full max-w-7xl mx-auto">
        <div className="w-full lg:w-1/2 bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {formData.map((invite, index) => (
              <div
                key={index}
                className="border border-white/20 p-6 mb-6 rounded-lg bg-white/5"
              >
                <h2 className="text-white text-xl font-bold mb-4">
                  Convite {index + 1}
                </h2>
                <InviteInputField
                  label="Remetente*"
                  name="sender"
                  value={invite.sender}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Quem está enviando este convite?"
                  id={""}
                />
                <InviteInputField
                  label="Nome do Convidado*"
                  name="receiverName"
                  value={invite.receiverName}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Para quem é este convite?"
                  id={""}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InviteInputField
                    label="Data do Evento*"
                    name="eventDate"
                    type="date"
                    value={invite.eventDate}
                    onChange={(e) => handleChange(e, index)}
                    id={""}
                  />
                  <InviteInputField
                    label="Horário*"
                    name="eventTime"
                    type="time"
                    value={invite.eventTime}
                    onChange={(e) => handleChange(e, index)}
                    id={""}
                  />
                </div>

                <InviteInputField
                  label="Endereço*"
                  name="address"
                  value={invite.address}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Onde será o evento?"
                  id={""}
                />
                <InviteSelectField
                  label="Estilo da Fonte"
                  name="fontFamily"
                  value={invite.fontFamily}
                  onChange={(e) => handleChange(e, index)}
                  options={fontOptions}
                  id={""}
                />
                <InviteSelectField
                  label="Modelo do Convite"
                  name="template"
                  value={invite.template}
                  onChange={(e) => handleChange(e, index)}
                  options={templateOptions}
                  id={""}
                />
                <InviteTextAreaField
                  label="Mensagem Personalizada"
                  name="message"
                  value={invite.message}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Escreva sua mensagem especial..."
                  rows={8}
                  id={""}
                />
              </div>
            ))}
            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg ${
                !isFormValid
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:from-blue-600 hover:to-purple-700"
              }`}
              disabled={!isFormValid}
            >
              Gerar Convite
            </button>
            {!isFormValid && (
              <p className="text-red-300 text-sm text-center">
                Preencha todos os campos obrigatórios marcados com *
              </p>
            )}
          </form>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center space-y-8">
          {formData.map((invite, index) => (
            <div key={index} className="w-full max-w-2xl">
              <h3 className="text-white text-xl font-bold mb-4 text-center">
                Prévia do Convite {index + 1}
              </h3>
              <InvitePreview formData={invite} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MakeYourInvite;
