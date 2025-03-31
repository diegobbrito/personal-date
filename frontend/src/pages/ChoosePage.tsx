import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import InvitePreview from "../components/Preview/InvitePreview";
import { ImSpinner7 } from "react-icons/im";
import { SelectButton } from "../components/Selects/SelectButton";
import { SuccessModal } from "../components/Modals/SuccessModal";

interface Meeting {
  id: string;
  sender: string;
  receiverName: string;
  eventDate: string;
  eventTime: string;
  message: string;
  address: string;
  fontFamily: string;
  clientName: string;
  template: "classic" | "modern" | "elegant" | "fun";
}


const ChoosePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedMeetId, setSelectedMeetId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://vs-invite-diegobrito-dev.apps.rm1.0a51.p1.openshiftapps.com/api/v1/invites/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 404) {
          setError("Convite já selecionado ou expirado");
          return;
        }

        if (response.data.meetings && response.data.meetings.length >= 2) {
          setMeetings(response.data.meetings);
        } else {
          setError("É necessário ter pelo menos dois convites para escolher.");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setError("Convite já selecionado ou expirado");
        } else {
          console.error("Error:", error);
          setError("Erro ao carregar os convites. Por favor, tente novamente.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMeetings();
    }
  }, [id]);

  const handleSelectMeeting = async (meetId: string) => {
    try {
      setLoading(true);
      await axios.patch(
        `https://vs-invite-diegobrito-dev.apps.rm1.0a51.p1.openshiftapps.com/api/v1/invites/${id}`,
        { meetId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSelectedMeetId(meetId);
      setShowSuccessModal(true);
      
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 py-12 px-4 relative">
      
      <SuccessModal show={showSuccessModal} />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Escolha Seu Convite
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Selecione abaixo o convite que melhor representa o seu evento
          
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {meetings.map((invite) => (
            <div
              key={invite.id}
              className={`relative rounded-xl overflow-hidden shadow-2xl transition-all ${
                selectedMeetId === invite.id
                  ? "ring-4 ring-blue-400 scale-[1.02]"
                  : isHovering === invite.id
                  ? "ring-2 ring-white scale-[1.01]"
                  : ""
              }`}
              onMouseEnter={() => setIsHovering(invite.id)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <div className="bg-white p-1">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <InvitePreview formData={invite} />
                </div>
              </div>

              <div className="bg-white px-6 pb-6 pt-3">
              <div className="bg-white px-6 pb-6 pt-3">
                <SelectButton
                  isSelected={selectedMeetId === invite.id}
                  onClick={() => handleSelectMeeting(invite.id)}
                  disabled={selectedMeetId === invite.id || loading}
                />
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChoosePage;