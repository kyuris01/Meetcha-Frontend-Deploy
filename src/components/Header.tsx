import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import MainLogo from "@assets/MeetchaLogo.svg";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <img
        className={styles.header__mainlogo}
        src={MainLogo}
        alt="Meetcha 로고 이미지"
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default Header;
