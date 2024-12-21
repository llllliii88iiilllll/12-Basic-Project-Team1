import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../apis/GetUserById";
import { getQuestionsBySubjectId } from "../apis/GetQuestions";
// import { postAnswer } from "../apis/PostAnswer";
import styles from "./AnswerPage.module.css";
import Header from "../components/Header";
import QuestionBox from "../components/QuestionBox";
import ButtonDark from "../public_components/ButtonDark";
import InputTextArea from "../public_components/InputTextArea";

function AnswerPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserAndQuestions() {
      try {
        const userResponse = await getUserById(id);
        setUserData(userResponse);

        const questionsResponse = await getQuestionsBySubjectId(id);
        setQuestions(questionsResponse.results || []);
      } catch (err) {
        setError("데이터를 불러오는 데 실패했습니다.");
      }
    }
    fetchUserAndQuestions();
  }, [id]);

  const handleAnswerSubmit = async () => {
    try {
      setIsAnswered(true);
      alert("답변이 성공적으로 제출되었습니다.");
    } catch (err) {
      setError("답변 제출에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    try {
      navigate("/list");
    } catch (err) {
      setError("삭제에 실패했습니다.");
    }
  };

  return (
    <div className={styles.wrap}>
      <Header userData={userData} />
      <div className={styles.content}>
        <QuestionBox
          questions={questions}
          userData={userData}
          updateQuestions={setQuestions}
        />
        <InputTextArea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={isAnswered}
        />
        <ButtonDark onClick={handleAnswerSubmit} disabled={!answer.trim()}>
          {isAnswered ? "답변 수정" : "답변 완료"}
        </ButtonDark>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

export default AnswerPage;