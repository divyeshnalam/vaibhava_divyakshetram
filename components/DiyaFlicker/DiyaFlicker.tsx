import styles from "./DiyaFlicker.module.css";

interface DiyaFlickerProps {
  size?: "sm" | "md" | "lg";
  count?: number;
}

export function DiyaFlicker({ size = "md", count = 1 }: DiyaFlickerProps) {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`${styles.diya} ${styles[size]}`}
          style={{ animationDelay: `${i * 0.4}s` }}
        >
          🪔
        </span>
      ))}
    </div>
  );
}