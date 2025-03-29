import React from "react";

interface TextAreaFieldProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}

const InviteTextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  rows = 4
}) => (
  <div>
    <label className="block text-white font-bold mb-2" htmlFor={id}>
      {label}
    </label>
    <textarea
      className="border rounded w-full py-2 px-3 text-white"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
    />
  </div>
);

export default InviteTextAreaField;