import styles from "./Badge.module.css";

function Badge({ isActive }) {
  return (
    <button className={styles.badge} isActive={isActive}>
      답변 완료
    </button>
  );
}

export default Badge;
