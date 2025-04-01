import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import InvitePreview from "../components/Preview/InvitePreview";
import { ImSpinner7 } from "react-icons/im";
import CountdownTimer from "../components/Timer/CountdownTimer";
import { SelectButton } from "../components/Selects/SelectButton";
import { SuccessModal } from "../components/Modals/SuccessModal";

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

const InvitePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [inviteData, setInviteData] = useState<InviteData | null>(null);
  const [meetings, setMeetings] = useState<InviteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMeetId, setSelectedMeetId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  useEffect(() => {
    const fetchInviteData = async () => {
      try {
        const response = await axios.get<ApiResponse>(  
          `${import.meta.env.VITE_BACKEND_LINK}/api/v1/invites/${id}` //First we get the data from the api, having 1 or 2 invites
        );

        
        
        if (response.data.meetings) {
          if (response.data.meetings.length >= 2) { // if there's more than 1 invite, an choosing screen will show up
            setMeetings(response.data.meetings);
          } else if (response.data.meetings.length === 1) { //if there's 1 invite, the invitePage will show up
            setInviteData(response.data.meetings[0]); 
          } else {
            setError("Convite não encontrado");
          }
        }
      } catch (err) {
        console.error("Erro ao buscar convite:", err);
        setError("Erro ao carregar os convites. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchInviteData();
  }, [id]);

  const handleSelectMeeting = async (meetId: string) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_LINK}/api/v1/invites/${id}`, // When the invite is chosen, we do a patch on API
        { meetId },                                                  // The patch will leave only the selected invitation in the API
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSelectedMeetId(meetId);
        setShowSuccessModal(true);

        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.error("Error selecting meeting:", error);
      setError("Erro ao selecionar o convite. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-purple-900">
        <ImSpinner7 className="text-white animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-purple-900 p-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">Ops!</h2>
          <p className="text-white/80 mb-6">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-white text-blue-900 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Voltar para o início
          </button>
        </div>
      </div>
    );
  }

  if (meetings.length >= 2) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 py-12 px-4 relative">
        <SuccessModal show={showSuccessModal} />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Escolha Seu Convite
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Selecione o melhor convite
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {meetings.map((invite) => (
              <div
                key={invite.id}
                className={`relative rounded-xl overflow-hidden shadow-2xl transition-all ${
                  selectedMeetId === invite.id
                    ? "ring-4 ring-blue-400 scale-[1.02]"
                    : ""
                }`}
              >
                <div className="bg-white p-1">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <InvitePreview formData={invite} />
                  </div>
                </div>

                <div className="bg-white px-6 pb-6 pt-3">
                  <SelectButton
                    isSelected={selectedMeetId === invite.id}
                    onClick={() => handleSelectMeeting(invite.id)}
                    disabled={selectedMeetId === invite.id || loading}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (inviteData) {
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
                  clientName: inviteData.clientName,
                  receiverName: inviteData.receiverName,
                  eventDate: inviteData.eventDate,
                  eventTime: inviteData.eventTime,
                  message: inviteData.message,
                  address: inviteData.address,
                  fontFamily: inviteData.fontFamily,
                  template: inviteData.template,
                  sender: inviteData.sender,
                }}
              />
            </div>
          </div>

          <p className="text-white mt-4 text-center font-bold text-2xl"> Contagem regressiva para algo inesquecível!</p>
          <p className="text-center"> 👇</p>
          
          <div className="mt-6">
            <CountdownTimer
              targetDate={inviteData.eventDate}
              eventTime={inviteData.eventTime}
            />
          </div>
        </div>
      </div>
    );
  }

};

export default InvitePage;
