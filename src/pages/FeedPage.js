import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "../apis/GetUserById"; // getUserById API import
import ButtonShare from "../public_components/ButtonShare";
import ButtonFloating from "../public_components/ButtonFloating";
import Modal from "../components/Modal";
import LogoImg from "../assets/Images/logo.svg";
import EmptyImg from "../assets/Images/empty.png";
import MessageImg from "../assets/Icon/messages.svg";
import styles from "./FeedPage.module.css";

function FeedPage() {
  const { id } = useParams(); // URL에서 id 파라미터 받기
  const [userData, setUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  useEffect(() => {
    const fetchUserData = async (id) => {
      if (!id || isNaN(id)) {
        console.error("유효하지 않은 ID");
        return;
      }

      try {
        const response = await getUserById(id);
        if (!response) {
          console.error("응답 데이터가 없습니다.");
          return;
        }
        setUserData(response); // 사용자 데이터 상태 업데이트
      } catch (error) {
        console.error("사용자 정보를 불러오는 데 실패했습니다:", error);
      }
    };
    fetchUserData(id); // ID에 맞는 데이터 가져오기
  }, [id]);

  if (!userData) {
    return <p>사용자 데이터를 불러오는 중...</p>;
  }

  // 모달 열기 핸들러
  const openModal = () => {
    setIsModalOpen(true);
  };
  // 모달 닫기 핸들러
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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

      {/* 질문영역 */}
      <div className={styles.container}>
        <div className={styles.questions_box}>
          <div className={styles.questions_box__title}>
            <img src={MessageImg} alt="메세지 이미지" />
            {/* 질문이 없으면 메시지 표시 */}
            <p>
              {userData.questionCount > 0
                ? `${userData.questionCount}개의 질문이 있습니다.`
                : "아직 질문이 없습니다"}
            </p>
          </div>
          <img className={styles.empty_img} src={EmptyImg} alt="빈페이지" />
        </div>
      </div>
      {/* 질문작성 버튼 */}
      <ButtonFloating onClick={openModal} />
      {isModalOpen && <Modal onClose={closeModal} />}
    </>
  );
}

export default FeedPage;
