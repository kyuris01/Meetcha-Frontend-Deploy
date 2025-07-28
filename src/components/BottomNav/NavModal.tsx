import { useNavigate } from "react-router-dom";
import styles from "./NavModal.module.scss";

const NavModal = () => {
  const navigate = useNavigate();

  const modalMenu = [
    {
      id: 0,
      label: "미팅 생성",
      clickRoute: "/meeting-creation",
    },
    {
      id: 1,
      label: "미팅 참가",
    },
  ];
  return (
    <div className={styles.navModal}>
      {modalMenu.map((item, _) => (
        <div
          key={item.id}
          className={styles.navModal__row}
          onClick={() => navigate(item.clickRoute)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default NavModal;
