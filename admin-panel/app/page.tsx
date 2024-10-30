'use client'

import React, { useState, useRef, useEffect } from 'react';
import { LockIcon, Mail, AlertCircle, EyeOff, Eye } from 'lucide-react';

import { useRouter } from 'next/navigation';

import * as dotenv from 'dotenv'
import { login } from '@/lib/api/login';

dotenv.config();

interface FormData {
  email: string
  password: string
}

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loginError, setLoginError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(null)

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!formData.email) {
      newErrors.email = "Email address is required."
    } else if (!/^\S+@\S+$/i.test(formData.email)) {
      newErrors.email = "Please enter a valid email address."
    }
    if (!formData.password) {
      newErrors.password = "Password is required."
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        login(formData);
        router.push('/dashboard');
      } catch (error) {
        console.error("Login error:", error);
        setLoginError("Oops! Something went wrong during login. Please try again.");
      }
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleFocus = (field: "email" | "password") => {
    setFocusedField(field)
  }

  const handleBlur = () => {
    setFocusedField(null)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emailRef.current && !emailRef.current.contains(event.target as Node)) {
        if (formData.email === "") setFocusedField(null)
      }
      if (passwordRef.current && !passwordRef.current.contains(event.target as Node)) {
        if (formData.password === "") setFocusedField(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [formData])

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
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-6">
            <div className="relative flex flex-col">
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${errors.email ? "border-red-300" : "border-[#8fbdc7]"
                  } placeholder-transparent text-[#415f63] bg-white focus:outline-none focus:ring-[#8fbdc7] focus:border-[#8fbdc7] focus:z-10 sm:text-sm transition-all duration-300`}
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                ref={emailRef}
              />
              <label
                htmlFor="email-address"
                className={`absolute left-3 transition-all duration-300 ease-in-out z-10 ${focusedField === "email" || formData.email
                  ? "-top-3 text-xs text-[#415f63] bg-[#e3d6ab] px-1 rounded-[2px]"
                  : "top-2 text-xs text-[#415f63]"
                  }`}
              >
                Email Address
              </label>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>
            <div className="relative flex flex-col">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${errors.password ? "border-red-300" : "border-[#8fbdc7]"
                  } placeholder-transparent text-[#415f63] bg-white focus:outline-none focus:ring-[#8fbdc7] focus:border-[#8fbdc7] focus:z-10 sm:text-sm transition-all duration-300 pr-10`}
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => handleFocus("password")}
                onBlur={handleBlur}
                ref={passwordRef}
              />
              <label
                htmlFor="password"
                className={`absolute left-3 transition-all duration-300 ease-in-out z-10 ${focusedField === "password" || formData.password
                  ? "-top-3 text-xs text-[#415f63] bg-[#e3d6ab] px-1 rounded-[2px]"
                  : "top-2 text-xs text-[#415f63]"
                  }`}
              >
                Password
              </label>
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-[#415f63]" />
                ) : (
                  <Eye className="h-5 w-5 text-[#415f63]" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#415f63] hover:bg-[#966d35] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8fbdc7]"
            >
              Sign In
            </button>
          </div>
          {loginError && <p className="text-red-500 text-sm mt-4 text-center">{loginError}</p>}
        </form>
      </div>
    </div>
  )
}
