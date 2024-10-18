"use client";

import React, { useState } from 'react';
import { LockIcon, Mail, AlertCircle } from 'lucide-react';

import { useRouter } from 'next/navigation';

import * as dotenv from 'dotenv'

dotenv.config();

export default function LoginForm() {
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();

        const url = process.env.NEXT_PUBLIC_API_URL + '/api/logout/';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }).then(response => {
            if (response.ok) {
                router.push('/login');
            } else {
                setError('An error occurred while logging out.');
            }
        }).catch(() => {
            setError('An error occurred while logging out request.');
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-md">
                <div>
                    <div className="flex justify-center">
                        <LockIcon className="h-12 w-12 text-blue-400" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Log out
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogout}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-300 mb-1">
                                Are you sure you want to log out?
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <button
                            type="button"
                            className="mb-3 group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() => router.back()}
                        >
                            Go back
                        </button>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Log out
                        </button>
                    </div>
                </form>
                {
                    error && (
                        <p className="mt-2 text-center text-red-500 text-sm flex items-center justify-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {error}
                        </p>
                    )
                }
            </div >
        </div >
    );
}