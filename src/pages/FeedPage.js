import ButtonShare from "../public_components/ButtonShare";
import LogoImg from "../assets/Images/logo.png";
import ProfileImg from "../assets/Images/profile.png";
import styles from "./FeedPage.module.css";

function FeedPage() {
  return (
    <div className={styles.feedpage}>
      <header>
        <div className={styles.header_box}>
          <img
            className={styles.logo_img}
            src={LogoImg}
            alt="오픈마인드 로고"
          />
          <img
            className={styles.profile_img}
            src={ProfileImg}
            alt="프로필 이미지"
          />
          <p className={styles.name}>아초는고양이</p>
          <ButtonShare />
        </div>
      </header>
      <div className={styles.questions_box}></div>
    </div>
  );
}

export default FeedPage;
