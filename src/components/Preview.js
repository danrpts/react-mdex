import React from "react";

import styles from "./styles.css";

export default function Preview(props) {
  return (
    <div
      className={`${styles.preview} ${props.className}`}
      dangerouslySetInnerHTML={{
        __html: props.renderFn(props.editorState.content)
      }}
    />
  );
}
