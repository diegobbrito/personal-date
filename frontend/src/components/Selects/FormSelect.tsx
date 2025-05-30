import React from "react";

interface FormSelectProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <div>
      <label className="block text-white font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <select
        className="border rounded w-full py-2 px-3 text-white"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option
            value={option.value}
            key={option.value}
            className="text-black"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
