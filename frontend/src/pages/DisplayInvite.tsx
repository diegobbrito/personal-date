import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InvitePreview from "../components/Preview/InvitePreview";
import { ImSpinner7 } from "react-icons/im";
import CountdownTimer from "../components/Timer/CountdownTimer";

interface InviteData {
  id: string;
  sender: string;
  receiverName: string;
  eventDate: string;
  eventTime: string;
  message: string;
  fontFamily: string;
  address: string;
  template: "classic" | "modern" | "elegant" | "fun";
  clientName: string;
}

interface ApiResponse {
  id: string;
  meetings: InviteData[];
}

const DisplayInvite: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [invite, setInvite] = useState<InviteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvite = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `https://vs-invite-diegobrito-dev.apps.rm1.0a51.p1.openshiftapps.com/api/v1/invites/${id}`
        );

        console.log(response)

        if (response.data.meetings && response.data.meetings.length > 1) {
          alert("Seu convite ainda não foi selecionado!")
        } else if(response.data.meetings && response.data.meetings.length === 1){
          setInvite(response.data.meetings[0]);
        }
        else {
          setError("Convite não encontrado");
        }
      } catch (err) {
        console.error("Erro ao buscar convite:", err);
        setError("Erro ao carregar o convite. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvite();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-purple-900">
        <ImSpinner7 className="text-white animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-purple-900">
        <div className="text-white text-2xl">{error}</div>
      </div>
    );
  }

  if (!invite) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-purple-900">
        <div className="text-white text-2xl">Convite não encontrado</div>
      </div>
    );
  }

  

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl text-white font-bold text-center mb-8">
          Convite
        </h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl p-6">
          <div className="flex justify-center">
            <InvitePreview
              formData={{
                clientName: invite.clientName,
                receiverName: invite.receiverName,
                eventDate: invite.eventDate,
                eventTime: invite.eventTime,
                message: invite.message,
                address: invite.address,
                fontFamily: invite.fontFamily,
                template: invite.template,
                sender: invite.sender,
              }}
            />
          </div>
        </div>
        <div className="mt-6">
          <CountdownTimer
            targetDate={invite.eventDate}
            eventTime={invite.eventTime}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayInvite;
