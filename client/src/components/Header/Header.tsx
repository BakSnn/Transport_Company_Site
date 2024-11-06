import { Link } from "react-router-dom";
import style from "./Header.module.scss";
const Header = () => {
  return (
    <div className={style.header}>
      <Link to="/list">
        <button>Список пользователей</button>
      </Link>
      <Link to="/add">
        <button>Добавить пользователей</button>
      </Link>
    </div>
  );
};

export default Header;
