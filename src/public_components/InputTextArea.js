import styles from "./InputTextArea.module.css";

function InputTextArea({ value, onChange, placeholder = "답변을 입력해주세요." }) {
  return (
      <textarea
        name=""
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input_textarea}
      />
  );
}

export default InputTextArea;
