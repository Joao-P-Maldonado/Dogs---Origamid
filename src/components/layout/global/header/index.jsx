import Dogs from "@Assets/images/dogs.svg?react";
import { UserContext } from "@Context/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const { data, userLogout } = useContext(UserContext);

  return (
    <div className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <Dogs />
        </Link>
        {data ? (
          <>
            <Link className={styles.login} to="/account">
              {data.username}
            </Link>
            <button onClick={userLogout}>Sair</button>
          </>
        ) : (
          <Link className={styles.login} to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
