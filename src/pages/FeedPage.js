import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../apis/GetUserById";
import { getQuestionsBySubjectId } from "../apis/GetQuestions";
import Header from "../components/Header";
import ButtonFloating from "../public_components/ButtonFloating";
import Modal from "../components/Modal";
import QuestionBox from "../components/QuestionBox";

function FeedPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [questions, setQuestions] = useState([]);
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
    fetchQuestions(id);
  }, [id]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Header userData={userData} />
      {/* 질문 박스 사용 */}
      <QuestionBox userData={userData} questions={questions} />
      {/* 질문 작성하기 버튼 */}
      <ButtonFloating onClick={openModal} />
      {isModalOpen && <Modal onClose={closeModal} userData={userData} />}
    </>
  );
}

export default FeedPage;
