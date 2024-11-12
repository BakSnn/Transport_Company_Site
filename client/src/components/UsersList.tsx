import React, { useEffect, useState } from "react";
import Header from "./Header/Header";

interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
}
interface User {
  id: number; // Предположим, у вас есть поле id
  name: string;
  email: string;
  posts: Post[];
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
      const response = await fetch(
        `http://150.241.65.37:5001/api/users/${id}`,
        {
          method: "DELETE",
        }
      );
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
            <h3>Посты</h3>
            <ol>
              {user.posts.map((post) => (
                <li key={post.id}>
                  <h4>{post.title}</h4>
                  <h5>{post.content}</h5>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default UserList;
