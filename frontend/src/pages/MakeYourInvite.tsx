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

const MakeYourInvite: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<"simple" | "complete">(
    "simple"
  );
  const [formData, setFormData] = useState<InviteFormData>({
    sender: "",
    eventDate: "",
    eventTime: "",
    message: "",
    address: "",
    fontFamily: "Arial, sans-serif",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "eventDate") {
      const [year, month, day] = value.split("-");
      const selectedDate = new Date(`${year}-${month}-${day}`);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      if (selectedDate < currentDate) {
        alert("Você não pode selecionar uma data anterior ao dia atual.");
        return;
      }

      const formattedDate =
        day && month && year ? `${day}/${month}/${year}` : "XX/XX/XXXX";
      setFormData((prev) => ({ ...prev, [name]: formattedDate }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectPackage = (packageType: "simple" | "complete") => {
    setSelectedPackage(packageType);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start py-5 lg:py-20 px-4 sm:px-6 mx-auto w-full">
        <h1 className="text-5xl md:text-7xl tracking-tighter text-white font-mono text-center">
          Crie seu Convite!
        </h1>
      </div>

      <PackageSelector
        onSelectPackage={handleSelectPackage}
        selectedPackage={selectedPackage}
      />

      <div className="flex flex-col items-center py-5 px-4 sm:px-6 md:px-8 w-full max-w-screen-lg mx-auto lg:flex-row">
        <div className="w-full lg:w-1/2 max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InviteInputField
              label="Remetente"
              id="sender"
              name="sender"
              value={formData.sender}
              onChange={handleChange}
              placeholder="Quem quer enviar esse convite?"
            />

            <InviteInputField
              label="Endereço"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Endereço do evento"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-white font-bold mb-2"
                  htmlFor="eventDate"
                >
                  Data do Evento
                </label>
                <input
                  className="border rounded w-full py-2 px-3 text-white"
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  onChange={handleChange}
                />
              </div>
              <InviteInputField
                label="Hora do Evento"
                id="eventTime"
                name="eventTime"
                type="time"
                value={formData.eventTime}
                onChange={handleChange}
                className="py-2"
              />
            </div>

            <InviteSelectField
              label="Fonte do Convite"
              id="fontFamily"
              name="fontFamily"
              value={formData.fontFamily}
              onChange={handleChange}
              options={fontOptions}
            />

            <InviteTextAreaField
              label="Mensagem"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Escreva sua mensagem..."
              rows={6}
            />

            <div className="mb-10">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Criar Convite
              </button>
            </div>
          </form>
        </div>

        <InvitePreview formData={formData} />
      </div>
    </>
  );
};

export default MakeYourInvite;
