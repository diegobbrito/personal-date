import React from "react";

interface PackageSelectorProps {
  onSelectPackage: (packageType: 'simple' | 'complete') => void;
  selectedPackage: 'simple' | 'complete';
}

const PackageSelector: React.FC<PackageSelectorProps> = ({ onSelectPackage, selectedPackage }) => {
  return (
    <div className="flex flex-col items-center py-8 gap-4">
      <h2 className="text-xl font-bold text-white">Escolha seu pacote:</h2>
      <div className="flex gap-4">
        {['simple', 'complete'].map((type) => (
          <button
            key={type}
            onClick={() => onSelectPackage(type as 'simple' | 'complete')}
            className={`px-4 py-2 rounded font-bold ${
              selectedPackage === type ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {type === 'simple' ? 'Pacote Simples' : 'Pacote Especial'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PackageSelector;
