import React from 'react';

interface InputProps {
  label?: string;
  type?: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  autoComplete,
  icon
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{icon}</span>
          </div>
        )}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className={`w-full px-4 py-3 ${icon ? 'pl-10' : ''} border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 bg-white`}
        />
      </div>
    </div>
  );
};

export default Input;