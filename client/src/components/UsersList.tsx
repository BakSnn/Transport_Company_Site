import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
interface User {
  id: number; // Предположим, у вас есть поле id
  name: string;
  email: string;
}

interface UserListProps {
  users: User[]; // Получаем пользователей через props
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [newUsers, setNewUsers] = useState<User[]>(users);

  useEffect(() => {
    setNewUsers(users);
  }, [users]);

  async function deleteUserById(id: number): Promise<void> {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Успешное удаление — обновляем список пользователей
        setNewUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } else {
        console.error("Ошибка при удалении пользователя");
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  }

  return (
    <div>
      <Header />
      <h2>Список пользователей</h2>
      <ol>
        {newUsers.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => deleteUserById(user.id)}>x</button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default UserList;
