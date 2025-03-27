import React, { useState, FormEvent, ChangeEvent } from "react";

interface InviteFormData {
  sender: string;
  eventDate: string;
  eventTime: string;
  message: string;
}

const MakeYourInvite: React.FC = () => {
  const [formData, setFormData] = useState<InviteFormData>({
    sender: "",
    eventDate: "",
    eventTime: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start gap-3 py-10 lg:py-40 px-4 sm:px-0 mx-auto w-full max-w-screen-xl">
        <h1 className="text-5xl md:text-7xl tracking-tighter text-white font-mono text-center">
          Crie seu Convite!
        </h1>
      </div>
      <div className="flex justify-start mx-10 sm:mx-20 md:mx-40 lg:mx-60 xl:mx-80 ">
        <div className="w-full max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block text-white font-bold mb-2 text-sm"
                htmlFor="sender"
              >
                Remetente
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="sender"
                name="sender"
                type="text"
                value={formData.sender}
                onChange={handleChange}
                placeholder="Quem quer enviar esse convite?"
              />
            </div>

            <div>
              <label
                className="block text-white font-bold mb-2 text-sm"
                htmlFor="eventDate"
              >
                Data do Evento
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="eventDate"
                name="eventDate"
                type="date"
                value={formData.eventDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                className="block text-white font-bold mb-2 text-sm"
                htmlFor="eventTime"
              >
                Hora do Evento
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="eventTime"
                name="eventTime"
                type="time"
                value={formData.eventTime}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                className="block text-white font-bold mb-2 text-sm"
                htmlFor="message"
              >
                Mensagem
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Escreva sua mensagem de convite aqui..."
                rows={4}
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Criar Convite
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MakeYourInvite;
