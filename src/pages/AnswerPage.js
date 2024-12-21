import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./AnswerPage.module.css";
import Header from "../components/Header";
import QuestionBox from "../components/QuestionBox";
import ButtonDark from "../public_components/ButtonDark";
import InputTextArea from "../public_components/InputTextArea";
import { getUserById } from "../apis/GetUserById";
import { getQuestionsBySubjectId } from "../apis/GetQuestions";

function AnswerPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
      // API call to submit answer (not defined in current scope)
      setIsAnswered(true);
      alert("답변이 성공적으로 제출되었습니다.");
    } catch (err) {
      setError("답변 제출에 실패했습니다.");
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    try {
      // API call to delete (not defined in current scope)
      navigate("/list");
    } catch (err) {
      setError("삭제에 실패했습니다.");
    }
  };

  return (
    <div className={styles.wrap}>
      <Header userData={userData} />
      <div className={styles.content}>
        <section className={styles.question_section}>
          <QuestionBox
            questions={questions}
            userData={userData}
            updateQuestions={setQuestions}
          />
          {isEditing && (
            <InputTextArea
              placeholder="질문을 수정하세요"
              value={questions[0]?.content || ""}
              onChange={(e) =>
                setQuestions((prev) =>
                  prev.map((q, index) =>
                    index === 0 ? { ...q, content: e.target.value } : q
                  )
                )
              }
            />
          )}
          {isEditing ? (
            <ButtonDark
              onClick={handleEditToggle}
              disabled={!questions[0]?.content?.trim()}
            >
              수정 완료
            </ButtonDark>
          ) : (
            <ButtonDark onClick={handleEditToggle}>질문 수정</ButtonDark>
          )}
        </section>
        <section className={styles.answer_section}>
          <InputTextArea
            placeholder="답변을 입력해주세요"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isAnswered && !isEditing}
          />
          <ButtonDark
            onClick={handleAnswerSubmit}
            disabled={!answer.trim()}
          >
            {isAnswered ? "답변 수정" : "답변 완료"}
          </ButtonDark>
        </section>
        <button className={styles.delete_btn} onClick={handleDelete}>
          질문 삭제
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

export default AnswerPage;