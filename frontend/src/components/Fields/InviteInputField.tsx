import React from "react";

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const InviteInputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  className = ""
}) => (
  <div>
    <label className="block text-white font-bold mb-2" htmlFor={id}>
      {label}
    </label>
    <input
      className={`border rounded w-full py-3 px-3 text-white ${className}`}
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default InviteInputField;