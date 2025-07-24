import styles from "./NavModal.module.scss";

const NavModal = () => {
  const modalMenu = [
    {
      id: 0,
      label: "미팅 생성",
    },
    {
      id: 1,
      label: "미팅 참가",
    },
  ];
  return (
    <div className={styles.navModal}>
      {modalMenu.map((item, _) => (
        <div key={item.id} className={styles.navModal__row}>
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default NavModal;
