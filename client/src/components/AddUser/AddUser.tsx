import React, { useState } from "react";
import styles from "./AddUser.module.scss";

interface AddUserProps {
  onUserAdded: () => void; 
}

const AddUser: React.FC<AddUserProps> = ({ onUserAdded }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    alert("Пользователь добавлен");

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
      const response = await fetch("http://150.241.65.37:5001/api/users", {
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
    <>
      <div className={styles.container}>
        <h2 className={styles.addUserLabel}>Добавить пользователя</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.labelInput}>
            <label className={styles.label}>Имя</label>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.labelInput}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.labelInput}>
            <label className={styles.label}>Название поста</label>
            <input
              className={styles.input}
              type="text"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.labelInput}>
            <label className={styles.label}>Контент поста</label>
            <input
              className={styles.input}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              required
            ></input>
          </div>
          <button type="submit">Добавить пользователя</button>
        </form>
      </div>
    </>
  );
};

export default AddUser;
