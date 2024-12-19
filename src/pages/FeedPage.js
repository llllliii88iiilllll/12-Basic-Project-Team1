import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../apis/GetUserById";
import { getQuestionsBySubjectId } from "../apis/GetQuestions";
import { getAnswerById } from "../apis/GetAnswerById";
import Header from "../components/Header";
import ButtonFloating from "../public_components/ButtonFloating";
import Modal from "../components/Modal";
import QuestionBox from "../components/QuestionBox";

function FeedPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // fetchAnswers 함수 정의
  const fetchAnswers = async (questions) => {
    const updatedQuestions = await Promise.all(
      questions.map(async (question) => {
        if (question.answer) {
          try {
            const answerResponse = await getAnswerById(question.answer.id);
            return {
              ...question,
              answerContent: answerResponse.content,
              answerCreatedAt: answerResponse.createdAt,
            };
          } catch (error) {
            console.error(
              `Answer ID ${question.answer.id} 데이터를 불러오지 못했습니다.`,
              error
            );
          }
        }
        return question;
      })
    );
    return updatedQuestions;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionsResponse = await getQuestionsBySubjectId(id);
        if (!questionsResponse || !questionsResponse.results) {
          console.error("질문 데이터를 불러오는 데 실패했습니다.");
          return;
        }
        // like와 dislike의 초기값을 설정
        const questionsWithDefaults = questionsResponse.results.map(
          (question) => ({
            ...question,
            like: question.like ?? 0,
            dislike: question.dislike ?? 0,
          })
        );

        const questionsWithAnswers = await fetchAnswers(questionsWithDefaults);
        setQuestions(questionsWithAnswers);

        const userResponse = await getUserById(id);
        if (!userResponse) {
          console.error("사용자 데이터를 불러오는 데 실패했습니다.");
          return;
        }
        setUserData(userResponse);
      } catch (error) {
        console.error("데이터 로드 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <>
      <Header userData={userData} />
      <QuestionBox userData={userData} questions={questions} />
      <ButtonFloating onClick={openModal} />
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          userData={userData}
          subjectId={id}
          setQuestions={setQuestions}
        />
      )}
    </>
  );
}

export default FeedPage;
