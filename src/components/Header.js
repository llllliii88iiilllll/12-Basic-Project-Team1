import { Link } from "react-router-dom";
import ButtonShare from "../public_components/ButtonShare";
import LogoImg from "../assets/Images/logo.svg";
import styles from "./Header.module.css";

function Header({ userData }) {
  return (
    <div className={styles.header}>
      <div className={styles.header_box}>
        <Link to="/">
          <img
            className={styles.logo_img}
            src={LogoImg}
            alt="오픈마인드 로고"
          />
        </Link>
        <img
          className={styles.profile_img}
          src={userData.imageSource}
          alt="프로필 이미지"
        />
        <h1 className={styles.name}>{userData.name}</h1>
        <ButtonShare />
      </div>
    </div>
  );
}

export default Header;
