import styles from "./Input.module.css";

function InputTextArea() {
  return (
    <>
      <textarea
        name=""
        placeholder="답변을 입력해주세요"
        className={styles.input_textarea}
      />
    </>
  );
}

export default InputTextArea;
