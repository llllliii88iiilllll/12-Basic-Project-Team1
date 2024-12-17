import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../apis/GetUserById";
import { getQuestionsBySubjectId } from "../apis/GetQuestions"; // 새로 추가된 API 호출 함수
import Header from "../components/Header";
import ButtonFloating from "../public_components/ButtonFloating";
import Modal from "../components/Modal";
import MessageImg from "../assets/Icon/messages.svg";
import ThumbsUpImg from "../assets/Icon/thumbs-up.svg";
import ThumbsDownImg from "../assets/Icon/thumbs-down.svg";
import EmptyImg from "../assets/Images/empty.png";
import styles from "./FeedPage.module.css";

// 시간 계산 함수
const getRelativeTime = (dateString) => {
  const now = new Date();
  const targetDate = new Date(dateString);
  const diff = now - targetDate; // 차이를 밀리초로 계산

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (seconds < 60) return `${seconds}초 전`;
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;
  return `${weeks}주 전`;
};

function FeedPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [questions, setQuestions] = useState([]); // 질문 목록 상태 추가
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

    // 질문목록 핸들러
    const fetchQuestions = async (subjectId) => {
      try {
        const response = await getQuestionsBySubjectId(subjectId);
        if (!response || !response.results) {
          console.error("질문 데이터를 불러오는 데 실패했습니다.");
          return;
        }
        setQuestions(response.results);
      } catch (error) {
        console.error("질문 목록을 불러오는 데 실패했습니다:", error);
      }
    };

    fetchUserData(id);
    fetchQuestions(id); // 질문 데이터를 가져옴
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
          {userData.questionCount > 0 ? (
            questions.map((question) => (
              <div key={question.id} className={styles.section}>
                <div className={styles.section_badge}>미답변</div>
                <div className={styles.section_title}>
                  <p className={styles.section_title__date}>
                    질문•{getRelativeTime(question.createdAt)}
                  </p>
                  <p className={styles.section_title__content}>
                    {question.content}
                  </p>
                </div>
                <div className={styles.section_reactions}>
                  <div>
                    <img src={ThumbsUpImg} alt="좋아요 아이콘" />
                    좋아요 {question.like}
                  </div>
                  <div>
                    <img src={ThumbsDownImg} alt="싫어요 아이콘" />
                    싫어요 {question.dislike}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <img className={styles.empty_img} src={EmptyImg} alt="빈페이지" />
          )}
        </div>
      </div>

      {/* 질문작성 버튼 */}
      <ButtonFloating onClick={openModal} />
      {isModalOpen && <Modal onClose={closeModal} />}
    </>
  );
}

export default FeedPage;
