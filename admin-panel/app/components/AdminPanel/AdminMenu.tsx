// components/AdminPanel/AdminMenu.tsx
import { Users as UsersIcon, ChefHat, Truck, Settings as SettingsIcon, BarChart as BarChartIcon, LogOut as LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { me } from '@/lib/api/me';
import React, { useState, useEffect } from 'react';

import MenuItem from './MenuItem';

interface AdminMenuProps {
    activeItem: string;
    expandedItems: string[];
    handleItemClick: (item: { text: string }) => void;
}

function useOwnEmail() {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchEmail() {
            try {
                const data = await me();
                setEmail(data.email);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data');
            }
        }

        fetchEmail();
    }, []);

    return { email, error };
}

const AdminMenu: React.FC<AdminMenuProps> = ({ activeItem, expandedItems, handleItemClick }) => {
    const menuItems = [
        {
            icon: <UsersIcon className="h-5 w-5" />,
            text: 'User Petitions',
            subItems: [
                {
                    icon: <ChefHat className="h-4 w-4" />,
                    text: 'Cooks',
                    isActive: false,
                    onClick: () => handleItemClick({ text: 'Cooks' }),
                },
                {
                    icon: <Truck className="h-4 w-4" />,
                    text: 'Deliverers',
                    isActive: false,
                    onClick: () => handleItemClick({ text: 'Deliverers' }),
                },
            ],
            isActive: activeItem === 'User Petitions',
            onClick: () => handleItemClick({ text: 'User Petitions' }),
        },
        {
            icon: <BarChartIcon className="h-5 w-5" />,
            text: 'Analytics',
            isActive: activeItem === 'Analytics',
            onClick: () => handleItemClick({ text: 'Analytics' }),
        },
        {
            icon: <SettingsIcon className="h-5 w-5" />,
            text: 'Settings',
            isActive: activeItem === 'Settings',
            onClick: () => handleItemClick({ text: 'Settings' }),
        },
    ];

    const router = useRouter();
    const { email, error: emailError } = useOwnEmail();

    return (
        <aside className="hidden md:flex flex-col w-64 bg-[#d1c4a1] overflow-y-auto">
            <div className="p-4">
                <h1 className="text-2xl font-bold text-[#2c3e50]">Admin Panel</h1>
            </div>
            <div className="flex flex-col p-4">
                <div className="mb-4">
                    <p>Welcome,</p>
                    <p className="font-semibold italic text-blue-500">{email}</p>
                </div>
                <button
                    className="flex items-center space-x-2 text-red-600 hover:text-red"
                    onClick={() => router.push('/logout')}
                >
                    <LogOutIcon className="h-5 w-5" />
                    <p>Log out</p>
                </button>
            </div>
            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
            <nav className="flex-1">
                <ul className="space-y-2 py-4">
                    {menuItems.map((item) => (
                        <MenuItem
                            key={item.text}
                            icon={item.icon}
                            text={item.text}
                            isActive={item.isActive}
                            onClick={item.onClick}
                            subItems={item.subItems}
                            isExpanded={expandedItems.includes(item.text)}
                        />
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default AdminMenu;
