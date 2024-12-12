import ButtonShare from "../public_components/ButtonShare";
import LogoImg from "../assets/Images/logo.png";
import ProfileImg from "../assets/Images/profile.png";
import EmptyImg from "../assets/Images/empty.png";
import MessageImg from "../assets/Icon/messages.svg";
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
          <h1 className={styles.name}>아초는고양이</h1>
          <ButtonShare />
        </div>
      </header>

      {/* 질문영역 */}
      <div className={styles.container}>
        <div className={styles.questions_box}>
          <div className={styles.questions_box__title}>
            <img src={MessageImg} alt="메세지 이미지" />
            <p>아직 질문이 없습니다</p>
          </div>
          <img className={styles.empty_img} src={EmptyImg} alt="빈페이지" />
        </div>
      </div>
    </div>
  );
}

export default FeedPage;
