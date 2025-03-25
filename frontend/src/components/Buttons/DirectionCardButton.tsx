import { useNavigate } from 'react-router-dom';

export const DirectionCardButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/makeyourinvite');
  };

  return (
    <button
      type="button"
      className="w-full max-w-[450px] h-[50px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-3xl font-medium hover:shadow-[0_6px_24px_rgba(0,0,0,0.4)] transition-shadow"
      onClick={handleClick}
    >
      Do your invite
    </button>
  );
};