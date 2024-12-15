import styles from "./ButtonFloating.module.css";

const ButtonFloating = ({ onClick }) => {
  return (
    <>
      {/*  <Link to=""> */}
      <button className={styles.button_floating} onClick={onClick}>
        질문 작성하기
      </button>
      <button className={styles.button_floating_mobile} onClick={onClick}>
        질문 작성
      </button>
      {/* </Link> */}
    </>
  );
};

export default ButtonFloating;
