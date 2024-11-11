'use client'

import React, { useState, useRef, useEffect } from 'react';
import { LockIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import LoginButton from './components/Login/LoginButton';
import TextInput from './components/Login/TextInput';

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSuccess = () => {
    router.push('/dashboard');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emailRef.current && !emailRef.current.contains(event.target as Node)) {
        if (formData.email === "") setFocusedField(null);
      }
      if (passwordRef.current && !passwordRef.current.contains(event.target as Node)) {
        if (formData.password === "") setFocusedField(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formData]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dfe1d5] to-[#8fbdc7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#e3d6ab] p-8 rounded-xl shadow-2xl">
        <div>
          <div className="flex justify-center">
            <LockIcon className="h-12 w-12 text-[#415f63]" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#415f63]">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <TextInput
            id="email-address"
            name="email"
            type="email"
            placeholder="Email address"
            value={formData.email}
            error={errors.email}
            onChange={handleInputChange}
          />
          <TextInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            error={errors.password}
            onChange={handleInputChange}
            toggleVisibility={togglePasswordVisibility}
            showPassword={showPassword}
          />
          <div>
            <LoginButton
              formData={formData}
              setErrors={setErrors}
              setLoginError={setLoginError}
              onLoginSuccess={handleLoginSuccess}
            />
          </div>
          {loginError && <p className="text-red-500 text-sm mt-4 text-center">{loginError}</p>}
        </form>
      </div>
    </div>
  );
}
