import RandomColor from "@/components/current/colors";
import styles from "./page.module.css";
import ColorCount from "@/components/color-count";

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className={styles.heading}>
          Can we generate all 16,777,216 colors? One click at a time.
        </h1>
        <ColorCount />
        <RandomColor />
      </div>
    </>
  );
}
