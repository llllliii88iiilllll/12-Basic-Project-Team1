import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { createSubject } from "../apis/CreateSubjects";
import { loadSubjects, checkDuplicateNameLocally } from "../apis/GetSubjects";
import styles from "./MainPage.module.css";
import InputField from "../public_components/InputField";
import ButtonDark from "../public_components/ButtonDark";
import ButtonLight from "../public_components/ButtonLight";
import LogoImage from "../assets/Images/logo.svg";
import MainVisual from "../assets/Images/main_visual.png";

function MainPage() {
  const [name, setName] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const navigate = useNavigate();

  // 컴포넌트가 처음 렌더링될 때 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      await loadSubjects();
      setIsDataLoaded(true);
    };
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("이름을 입력해주세요.");
      setName("");
      return;
    }

    // 데이터 로딩이 완료되고 중복 체크가 가능할 때만 실행
    if (isDataLoaded) {
      if (checkDuplicateNameLocally(name)) {
        alert("이미 존재하는 이름입니다. 다른 이름을 입력해주세요.");
        setName("");
        return;
      }
    }

    try {
      const data = await createSubject(name);
      navigate(`/post/${data.id}/answer`);
      localStorage.setItem("createdId", data.id);
    } catch (err) {
      console.log(err.message);
      setName("");
    }
  };

  return (
    <div className={styles.main_wrap}>
      <div className={styles.ask_button_wrapper}>
        <Link to="/list">
          <ButtonLight>질문하러 가기</ButtonLight>
        </Link>
      </div>
      <header className={styles.header}>
        <img src={LogoImage} alt="로고 이미지" className={styles.logo} />
      </header>
      <main className={styles.main_body}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <InputField value={name} onChange={(e) => setName(e.target.value)} />
          <ButtonDark disabled={!name.trim()} type="submit">
            질문 받기
          </ButtonDark>
        </form>
      </main>
      <div className={styles.background_image}>
        <img src={MainVisual} alt="메인 배경이미지" />
      </div>
    </div>
  );
}

export default MainPage;
