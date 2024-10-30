// components/AdminPanel/MenuItem.tsx
import { ReactNode } from 'react';

export interface MenuItemProps {
    icon: ReactNode;
    text: string;
    isActive: boolean;
    onClick: () => void;
    subItems?: MenuItemProps[];
    isExpanded?: boolean;
  }

const MenuItem = ({ icon, text, isActive, onClick, subItems, isExpanded }: MenuItemProps) => (
  <li>
    <div
      className={`flex items-center p-2 cursor-pointer ${isActive ? 'bg-blue-100' : ''}`}
      onClick={onClick}
    >
      {icon}
      <span className="ml-3">{text}</span>
    </div>
    {isExpanded && subItems && (
      <ul className="pl-4">
        {subItems.map((subItem) => (
          <li
            key={subItem.text}
            className={`flex items-center p-2 cursor-pointer ${
              subItem.isActive ? 'bg-blue-50' : ''
            }`}
            onClick={subItem.onClick}
          >
            {subItem.icon}
            <span className="ml-3">{subItem.text}</span>
          </li>
        ))}
      </ul>
    )}
  </li>
);

export default MenuItem;
