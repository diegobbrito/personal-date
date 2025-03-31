interface SelectButtonProps {
    isSelected: boolean;
    onClick: () => void;
    disabled: boolean;
  }
  
  export const SelectButton = ({ isSelected, onClick, disabled }: SelectButtonProps) => (
    <button
      onClick={onClick}
      className={`w-full py-3 px-6 rounded-lg font-bold transition-all ${
        isSelected
          ? "bg-green-500 text-white shadow-inner"
          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
      }`}
      disabled={disabled}
    >
      {isSelected ? (
        <span className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Convite Selecionado
        </span>
      ) : (
        "Selecionar Este Convite"
      )}
    </button>
  );