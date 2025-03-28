import React, { useState, FormEvent, ChangeEvent } from "react";

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
  const [formData, setFormData] = useState<InviteFormData>({
    sender: "",
    eventDate: "",
    eventTime: "",
    message: "",
    address: "",
    fontFamily: "Arial, sans-serif",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

      // Check if any date component is undefined
      if (day === undefined || month === undefined || year === undefined) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: "XX/XX/XXXX",
        }));
        return;
      }

      const formattedDate = `${day}/${month}/${year}`;
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedDate,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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

      <div className="flex flex-col items-center py-5 px-4 sm:px-6 md:px-8 w-full max-w-screen-lg mx-auto lg:flex-row">
        <div className="w-full lg:w-1/2 max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
          <div>
              <label className="block text-white font-bold mb-2" htmlFor="sender">
                Remetente
              </label>
              <input
                className="border rounded w-full py-3 px-3 text-white"
                id="sender"
                name="sender"
                type="text"
                value={formData.sender}
                onChange={handleChange}
                placeholder="Quem quer enviar esse convite?"
              />
            </div>

            <div>
              <label className="block text-white font-bold mb-2" htmlFor="address">
                Endereço
              </label>
              <input
                className="border rounded w-full py-3 px-3 text-white"
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                placeholder="Endereço do evento"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-bold mb-2" htmlFor="eventDate">
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
              <div>
                <label className="block text-white font-bold mb-2" htmlFor="eventTime">
                  Hora do Evento
                </label>
                <input
                  className="border rounded w-full py-2 px-3 text-white"
                  id="eventTime"
                  name="eventTime"
                  type="time"
                  value={formData.eventTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-bold mb-2" htmlFor="fontFamily">
                Fonte do Convite
              </label>
              <select
                className="border rounded w-full py-2 px-3 text-white"
                id="fontFamily"
                name="fontFamily"
                value={formData.fontFamily}
                onChange={handleChange}
              >
                {fontOptions.map((font) => (
                  <option value={font.value} key={font.value} className="text-black">
                    {font.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-bold mb-2" htmlFor="message">
                Mensagem
              </label>
              <textarea
                className="border rounded w-full py-2 px-3 text-white"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Escreva sua mensagem..."
                rows={6}
              />
            </div>

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

        <div
          className="w-full lg:w-1/2 bg-white p-6 rounded-3xl shadow-lg lg:ml-15 flex flex-col items-center space-y-4 mb-8 lg:mb-0 "
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
      </div>
    </>
  );
};

export default MakeYourInvite;
