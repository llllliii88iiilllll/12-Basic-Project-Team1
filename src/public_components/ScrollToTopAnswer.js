import { useState, useEffect } from "react";
import { ReactComponent as IconArrowRight } from "../assets/Icon/arrow_line_right.svg";
import styles from "./ScrollToTopAnswer.module.css";

const ScrollToTopButton = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // 스크롤 위치 감지하여 버튼 표시 여부 설정
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        // 300px 이상 스크롤 내리면 버튼을 보이도록
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // 상단으로 부드럽게 스크롤 이동
  };

  // if (!showScrollToTop) return null; // 버튼을 보이지 않게 설정할 경우

  return (
    <button
      onClick={scrollToTop}
      className={`${styles.button_scroll_top} ${
        showScrollToTop ? styles.show : ""
      }`}
    >
      <IconArrowRight fill="#ffffff" />
    </button>
  );
};

export default ScrollToTopButton;
