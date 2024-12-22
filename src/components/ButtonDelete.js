import styles from "./ButtonDelete.module.css";

function ButtonDelete({ handleDeleteAll }) {
  return (
    <button onClick={handleDeleteAll} className={styles.button_delete}>
      삭제하기
    </button>
  );
}

export default ButtonDelete;
