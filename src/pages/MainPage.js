import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MainPage.module.css";
import InputField from "../public_components/InputField";
import ButtonDark from "../public_components/ButtonDark";
import LogoImage from "../assets/Images/logo.svg";

function MainPage() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("이름을 입력해주세요.");
      return;
    }

    try {
      // 피드 생성을 위해 POST 요청 전송
      const response = await fetch("/api/feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("피드 생성에 실패했습니다. 다시 시도해주세요.");
      }

      const data = await response.json();

      // 피드 id 활용하여 답변하기 페이지 이동
      navigate(`/post/${data.feedId}/answer`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.main_wrap}>
      <header className={styles.header}>
        <img src={LogoImage} alt="로고 이미지" className={styles.logo} />
      </header>
      <main className={styles.main_body}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <InputField
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <ButtonDark disabled={!name.trim()}>질문 받기</ButtonDark>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </main>
    </div>
  );
}

export default MainPage;