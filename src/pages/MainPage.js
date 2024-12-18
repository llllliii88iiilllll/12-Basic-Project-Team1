import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./MainPage.module.css";
import InputField from "../public_components/InputField";
import ButtonDark from "../public_components/ButtonDark";
import ButtonLightAnswer from "../public_components/ButtonLightAnswer";
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

      // 로컬 스토리지 활용 답변하러 가기 버튼 경로 지정
      localStorage.setItem("createId", data.feedId);

      // 피드 id 활용하여 답변하기 페이지 이동
      navigate(`/post/${data.feedId}/answer`);
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
          <ButtonLightAnswer>
            <span className={styles.button_light_custom}>질문하러 가기</span>
          </ButtonLightAnswer>
        </Link>
      </div>
      <main className={styles.main_body}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <InputField value={name} onChange={(e) => setName(e.target.value)} />
          <Link to="/post/${name}/answer">
            <ButtonDark>질문 받기</ButtonDark>
          </Link>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </main>
    </div>
  );
}

export default MainPage;
