import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./AnswerPage.module.css";
import ButtonDark from "../public_components/ButtonDark";
import InputTextArea from "../public_components/InputTextArea";

function AnswerPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const response = await fetch(`/api/questions/${id}`);
        const data = await response.json();
        setQuestion(data.question || "Sample Question");
      } catch (err) {
        setError("질문을 가져오는 데 실패했습니다.");
      }
    }
    fetchQuestion();
  }, [id]);

  const handleAnswerSubmit = async () => {
    try {
      const response = await fetch(`/api/questions/${id}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      });
      if (!response.ok) throw new Error("답변 제출 실패");
      setIsAnswered(true);
      alert("답변이 성공적으로 제출되었습니다.");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) setAnswer("");
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/questions/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("삭제 실패");
      navigate("/list");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.answer_page}>
      <header className={styles.header}>
        <h1>Answer Page</h1>
        <button className={styles.delete_btn} onClick={handleDelete}>
          삭제하기
        </button>
      </header>
      <main className={styles.main_content}>
        <section className={styles.question_section}>
          <h2>{question}</h2>
        </section>
        <section className={styles.answer_section}>
          <InputTextArea
            placeholder="답변을 입력해주세요"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isAnswered && !isEditing}
          />
          <ButtonDark
            onClick={isEditing ? handleEditToggle : handleAnswerSubmit}
            disabled={!answer.trim()}
          >
            {isEditing ? "수정 완료" : "답변 완료"}
          </ButtonDark>
        </section>
        {error && <p className={styles.error}>{error}</p>}
      </main>
    </div>
  );
}

export default AnswerPage;