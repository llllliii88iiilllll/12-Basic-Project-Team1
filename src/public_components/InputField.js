import styles from "./InputField.module.css";
import { ReactComponent as IcPerson } from "../assets/Icon/person.svg";

function InputField({ value, onChange }) {
  return (
    <div className={styles.input_wrap}>
      <input
        type="text"
        name=""
        value={value}
        onChange={onChange}
        className={styles.input_field}
        placeholder="이름을 입력하세요"
      />
      <IcPerson className={styles.ic_person} fill="var(--gray-scale-40)" />
    </div>
  );
}

export default InputField;
