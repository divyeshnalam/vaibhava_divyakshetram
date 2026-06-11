import styles from "./DividerOrnament.module.css";

interface DividerOrnamentProps {
  symbol?: string;
  className?: string;
}

export function DividerOrnament({
  symbol = "✦",
  className = "",
}: DividerOrnamentProps) {
  return (
    <div
      className={`${styles.wrapper} ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      <span className={styles.line} />
      <span className={styles.symbol}>{symbol}</span>
      <span className={styles.symbolCenter}>✦</span>
      <span className={styles.symbol}>{symbol}</span>
      <span className={styles.line} />
    </div>
  );
}