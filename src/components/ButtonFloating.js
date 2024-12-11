import styles from "./ButtonFloating.module.css";

function ButtonFloating() {
  return (
    <>
      {/*  <Link to=""> */}
      <button className={styles.button_floating}>질문 작성하기</button>
      <button className={styles.button_floating_mobile}>질문 작성</button>
      {/* </Link> */}
    </>
  );
}

export default ButtonFloating;
