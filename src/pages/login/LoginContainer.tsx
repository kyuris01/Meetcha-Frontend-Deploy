import Meetcha_banner from "../../components/common/Meetcha_banner";
import Continue_Google from "../../components/domain/login/Continue_Google";
import Continue_des from "../../components/domain/login/Continue_des";

import styles from "./LoginContainer.module.scss";

const LoginContainer = () => {
  return (
    <div className={styles.login_container}>
      <div className={styles.flex_container1}>
        <Meetcha_banner />
        <div className={styles.flex_container2}>
          <Continue_Google />
          <Continue_des />
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
