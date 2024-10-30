// components/AdminPanel/AdminDashboard.tsx
import AdminMenu from './AdminMenu';
import ContentRenderer from './ContentRenderer';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { MenuItemProps } from './MenuItem'; 

const AdminDashboard = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
 const handleItemClick = (item: { text: string }) => {  // Altere aqui para aceitar apenas { text: string }
    const menuText = item.text;

    if (expandedItems.includes(menuText)) {
      setExpandedItems((prev) => prev.filter((i) => i !== menuText));
    } else {
      setExpandedItems((prev) => [...prev, menuText]);
    }

    setActiveItem(menuText);
  };

  return (
    <div className="flex h-screen bg-[#f0f0f0] text-[#2c3e50]">
      <AdminMenu
        activeItem={activeItem}
        expandedItems={expandedItems}
        handleItemClick={handleItemClick}
      />
      <main className="flex-1 p-6 overflow-auto">
        <h2 className="text-3xl font-semibold mb-4 text-[#2c3e50]">{activeItem}</h2>
        <ContentRenderer activeItem={activeItem} />
      </main>
    </div>
  );
};

export default AdminDashboard;
