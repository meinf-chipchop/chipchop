// components/AdminPanel/ContentRenderer.tsx
import UserTable from './UserTable';
// import Analytics from './Analytics';

const ContentRenderer = ({ activeItem }) => {
  if (activeItem === 'Cooks' || activeItem === 'Deliverers') {
    return <UserTable type={activeItem.toLowerCase()} />;
  } else if (activeItem === 'Analytics') {
    return <Analytics />;
  }
  return <p>Bem-vindo ao painel administrativo.</p>;
};

export default ContentRenderer;
