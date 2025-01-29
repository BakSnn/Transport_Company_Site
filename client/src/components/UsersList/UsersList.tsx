import React, { useEffect, useState } from "react";
import styles from "./UserList.module.scss";

interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
}
interface User {
  id: number;
  name: string;
  email: string;
  posts: Post[];
}

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [newUsers, setNewUsers] = useState<User[]>(users);
  const [selectedUserPosts, setSelectedUserPosts] = useState<Post[] | null>(
    null
  );

  const handleShowPost = (posts: Post[]) => {
    setSelectedUserPosts(posts);
  };

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
        setNewUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        setSelectedUserPosts(null);
      } else {
        console.error("Ошибка при удалении пользователя");
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Список пользователей</h2>
      <ol>
        {newUsers.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleShowPost(user.posts)}>Посты</button>
            <button onClick={() => deleteUserById(user.id)}>❌</button>
          </li>
        ))}
      </ol>
      {selectedUserPosts && (
        <div>
          <h3>Посты пользователя</h3>

          {selectedUserPosts.map((post) => (
            <>
              <h2>{post.title}</h2>
              <ul>
                <li key={post.id}>{post.content}</li>
              </ul>
            </>
          ))}

          <button onClick={() => setSelectedUserPosts(null)}>Закрыть</button>
        </div>
      )}
    </div>
  );
};

export default UserList;
