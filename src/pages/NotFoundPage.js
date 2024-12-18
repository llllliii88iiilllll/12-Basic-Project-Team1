import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import LogoImage from "../assets/Images/logo.svg";
import ButtonDark from "../public_components/ButtonDark";

function NotFoundPage() {
  return (
    <div className={styles.notfound_wrap}>
      <img src={LogoImage} alt="로고 이미지" />
      <div className={styles.notfound_txt}>
        <p>404</p>
        <p>페이지를 찾을 수 없습니다.</p>
        <p>죄송합니다. 더이상 존재하지 않는 페이지입니다.</p>
      </div>
      <Link to="/">
        <ButtonDark>홈으로 이동</ButtonDark>
      </Link>
    </div>
  );
}

export default NotFoundPage;
