import RandomColor from "@/components/current/colors";
import styles from "./page.module.css"

export default function Home() {
  return (
    <>
      <h1 className={styles.heading}>Click to generate a new color</h1>
      <RandomColor />
    </>
  );
}
