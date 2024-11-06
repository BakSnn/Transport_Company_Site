import React, { useState } from "react";
import Header from "./Header/Header";
interface AddUserProps {
  onUserAdded: () => void; // Функция для обновления списка пользователей
}

const AddUser: React.FC<AddUserProps> = ({ onUserAdded }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newUser = {
      name,
      email,
      posts: [
        {
          title: postTitle,
          content: postContent,
          published: false,
        },
      ],
    };

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Ошибка при добавлении пользователя");
      }

      // Вызываем функцию обновления списка пользователей
      onUserAdded();

      // Очищаем поля формы
      setName("");
      setEmail("");
      setPostTitle("");
      setPostContent("");
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <div>
      <Header></Header>
      <h2>Добавить пользователя</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя: </label>
          <input
            style={{ borderRadius: "5px" }}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            style={{ borderRadius: "5px" }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Название поста:</label>
          <br></br>
          <input
            type="text"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Контент поста:</label>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button onClick={onUserAdded} type="submit">
          Добавить пользователя
        </button>
      </form>
    </div>
  );
};

export default AddUser;
