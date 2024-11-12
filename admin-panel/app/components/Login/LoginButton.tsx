import React, { useState } from 'react';
import { login } from '@/lib/api/login';

interface FormData {
  email: string;
  password: string;
}

interface LoginButtonProps {
  formData: FormData;
  setErrors: React.Dispatch<React.SetStateAction<Partial<FormData>>>;
  setLoginError: React.Dispatch<React.SetStateAction<string | null>>;
  onLoginSuccess: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  formData,
  setErrors,
  setLoginError,
  onLoginSuccess
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.email) {
      newErrors.email = "Email address is required.";
    } else if (!/^\S+@\S+$/i.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true); // Ativa o estado de carregamento
      try {
        await login(formData);
        onLoginSuccess();
      } catch (error) {
        console.error("Login error:", error);
        setLoginError("Oops! Something went wrong during login. Please try again.");
      } finally {
        setIsLoading(false); // Desativa o estado de carregamento
      }
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#dfe1d5] to-[#8fbdc7] z-50">
          <div className="flex flex-col items-center space-y-4 p-8 rounded-xl">
          <svg
              className="animate-spin h-10 w-10 text-[#415f63]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M12 2a10 10 0 00-10 10h4a6 6 0 016-6V2z"
              ></path>
            </svg>
            <p className="text-lg font-semibold text-[#415f63]">Loading...</p>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={handleSubmit}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#415f63] hover:bg-[#966d35] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8fbdc7]"
      >
        Sign In
      </button>
    </>
  );
};

export default LoginButton;
