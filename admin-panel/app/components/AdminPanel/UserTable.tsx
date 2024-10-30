// components/AdminPanel/UserTable.tsx
import { useEffect, useState } from 'react';

const UserTable = ({ type }) => {
  const [visibleUsers, setVisibleUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    // Filtrando e configurando usuários visíveis
    const filteredUsers = approvals[type].filter(/* lógica de filtragem aqui */);
    const startIndex = (currentPage - 1) * usersPerPage;
    setVisibleUsers(filteredUsers.slice(startIndex, startIndex + usersPerPage));
  }, [type, currentPage]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-[#2c3e50]">{type} List</h3>
      {/* Filtros de pesquisa */}
      <table className="min-w-full divide-y divide-[#e0e0e0]">
        {/* Cabeçalho e corpo da tabela */}
      </table>
      {/* Paginação */}
    </div>
  );
};

export default UserTable;
