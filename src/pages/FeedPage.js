import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../apis/GetUserById";
import Header from "../components/Header";
import ButtonFloating from "../public_components/ButtonFloating";
import Modal from "../components/Modal";
import MessageImg from "../assets/Icon/messages.svg";
import EmptyImg from "../assets/Images/empty.png";
import styles from "./FeedPage.module.css";

function FeedPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async (id) => {
      try {
        const response = await getUserById(id);
        if (!response) {
          console.error("응답 데이터가 없습니다.");
          return;
        }
        setUserData(response);
      } catch (error) {
        console.error("사용자 정보를 불러오는 데 실패했습니다:", error);
      }
    };
    fetchUserData(id);
  }, [id]);

  // 모달 핸들러
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* 헤더(로고 및 프로필 정보) 컴포넌트 */}
      <Header userData={userData} />

      {/* 질문영역 */}
      <div className={styles.container}>
        <div className={styles.questions_box}>
          <div className={styles.questions_box__title}>
            <img src={MessageImg} alt="메세지 이미지" />
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
