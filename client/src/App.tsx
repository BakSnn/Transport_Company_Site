import React, { useEffect, useState } from "react";
import UsersList from "./components/UsersList";
import AddUser from "./components/AddUser";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]); // Состояние для хранения пользователей
  const [list, setList] = useState<any[]>([]);

  // Функция для получения пользователей
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      if (!response.ok) {
        throw new Error("Ошибка при получении пользователей");
      }
      const data = await response.json(); // Получаем данные в формате JSON
      setUsers(data); // Сохраняем пользователей в состоянии
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const fetchLists = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/list");
      if (!response.ok) {
        throw new Error("Ошибка при получении списка постов");
      }
      setList(data);
    } catch (error) {
      console.log("ошибка:", error);
    }
  };

  const handleUserAdded = () => {
    fetchUsers(); // Обновляем пользователей после добавления
  };

  // Загружаем пользователей при первом рендере
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header></Header>}></Route>
          <Route
            path="/add"
            element={<AddUser onUserAdded={handleUserAdded}></AddUser>}
          ></Route>

          <Route
            path="/list"
            element={<UsersList users={users}></UsersList>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;