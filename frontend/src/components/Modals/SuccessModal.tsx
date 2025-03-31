interface SuccessModalProps {
    show: boolean;
  }
  
  export const SuccessModal = ({ show }: SuccessModalProps) => {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-sm mx-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Sucesso!</h3>
          <p className="text-gray-600 mb-4">Convite selecionado com sucesso</p>
          <p className="text-sm text-gray-500">Redirecionando...</p>
        </div>
      </div>
    );
  };