import React from "react";
import { ReactComponent as ThumbsUpImg } from "../assets/Icon/thumbs-up.svg";
import { ReactComponent as ThumbsDownImg } from "../assets/Icon/thumbs-down.svg";
import styles from "./ReactionButton.module.css";

const ReactionButtons = ({ question, activeReactions, onReact }) => {
  return (
    <div className={styles.section_reactions}>
      <button
        onClick={() => onReact(question.id, "like")}
        className={
          activeReactions[question.id]?.like || question.like > 0
            ? styles.active
            : ""
        }
      >
        <ThumbsUpImg alt="좋아요 아이콘" />
        좋아요 {question.like > 999 ? "+999" : question.like}
      </button>
      <button
        onClick={() => onReact(question.id, "dislike")}
        className={
          activeReactions[question.id]?.dislike || question.dislike > 0
            ? styles.active
            : ""
        }
      >
        <ThumbsDownImg alt="싫어요 아이콘" />
        싫어요 {question.dislike > 999 ? "+999" : question.dislike}
      </button>
    </div>
  );
};

export default ReactionButtons;
