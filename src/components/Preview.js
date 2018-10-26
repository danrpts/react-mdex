import React, { Component } from "react";
import PropTypes from "prop-types";
import EditorState from "../models/EditorState.js";

export default function Preview(props) {
  return (
    <div
      style={props.style}
      className={props.className}
      dangerouslySetInnerHTML={{
        __html: props.markdownRenderFn(props.editorState.content)
      }}
    />
  );
}

Preview.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  markdownRenderFn: PropTypes.func.isRequired
};
