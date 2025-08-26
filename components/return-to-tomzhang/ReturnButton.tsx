import React from "react";
import styles from "./AppButton.module.css";

const AppButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};

const tomZhangGames = "https://www.tomzhang.info/games";

const ReturnToGamesButton = () => {
  return (
    <div style={{ margin: "20px 0" }}>
      <AppButton
        text="Back to games"
        onClick={() => (window.location.href = tomZhangGames)}
      />
    </div>
  );
};

export default ReturnToGamesButton;
