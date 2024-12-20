import React, { useState, useEffect } from "react";
import styles from "./Counter.module.css";

const Counter = ({ count }) => {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (count > 0) {
      let start = 0;
      const end = count;
      const duration = 2000;
      const increment = Math.ceil(end / (duration / 50));

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(counter);
          start = end;
        }
        setDisplayedCount(start);
      }, 50);

      setIsVisible(true);
    }
  }, [count]);

  return (
    <div className={styles.counter}>
      <span className={isVisible ? "visible" : ""}>{displayedCount}</span>
      개의 질문이 있습니다.
    </div>
  );
};

export default Counter;
