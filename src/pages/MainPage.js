import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MainPage.module.css";
import InputField from "../public_components/InputField";
import ButtonDark from "../public_components/ButtonDark";
import ButtonLight from "../public_components/ButtonLight";
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
      try {
        // POST 요청 전송
        const response = await fetch(
          "https://openmind-api.vercel.app/12-1/subjects/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }), // 요청 데이터는 그대로 유지
          }
        );

        if (!response.ok) {
          throw new Error("주제 생성에 실패했습니다. 다시 시도해주세요.");
        }

        const data = await response.json();

        navigate(`/post/${data.id}/answer`);

        localStorage.setItem("createdId", data.id);
      } catch (err) {
        setError(err.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.main_wrap}>
      <div className={styles.background_image}></div>
      <header className={styles.header}>
        <img src={LogoImage} alt="로고 이미지" className={styles.logo} />
      </header>
      <div className={styles.ask_button_wrapper}>
        <Link to="/list">
          <ButtonLight>질문하러 가기</ButtonLight>
        </Link>
      </div>
      <main className={styles.main_body}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <InputField
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <ButtonDark disabled={!name.trim()} type="submit">
            질문 받기
          </ButtonDark>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </main>
    </div>
  );
}

export default MainPage;
