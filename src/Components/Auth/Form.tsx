import React from 'react';

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const Form: React.FC<FormProps> = ({ onSubmit, children, title, subtitle }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-green-700 mb-2">{title}</h2>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
      </form>
    </div>
  );
};

export default Form;