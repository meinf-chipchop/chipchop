import React, { useRef, useState } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

interface TextInputProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  toggleVisibility?: () => void;
  showPassword?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  type,
  placeholder,
  value,
  error,
  onChange,
  onFocus,
  onBlur,
  toggleVisibility,
  showPassword,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <div className="relative flex flex-col">
      <input
        id={id}
        name={name}
        type={showPassword && type === 'password' ? 'text' : type}
        required
        className={`appearance-none rounded-md block w-full px-3 py-2 border ${error ? 'border-red-300' : 'border-gray-300'} text-gray-900`}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
      />
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all duration-300 ease-in-out z-10 ${focused || value ? '-top-3 text-xs text-[#415f63] bg-[#e3d6ab] px-1 rounded-[2px]' : 'top-2 text-sm text-gray-500'}`}
      >
        {placeholder}
      </label>
      {toggleVisibility && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={toggleVisibility}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-500" />
          ) : (
            <Eye className="h-5 w-5 text-gray-500" />
          )}
        </button>
      )}
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
