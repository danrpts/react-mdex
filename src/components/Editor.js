import React, { Component } from "react";
import EditorState from "../models/EditorState.js";

import styles from "./styles.css";

export default class Editor extends Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();

    this.createStateAndPropogate = e => {
      const newEditorState = EditorState.create(
        e.target.value,
        e.target.selectionStart,
        e.target.selectionEnd
      );
      this.props.onChange(newEditorState);
    };

    this.propogateKeyDown = e => {
      if (e.ctrlKey || e.metaKey) {
        this.props.handleKeyCommand(e.key, e);
      }
    };
  }

  componentDidUpdate() {
    // NOTE:
    // 1) Allows us to set DOM selection state from the editorState prop.
    // 2) Avoid setSelectionRange as this sets the selection direction to
    //    "forward" by default, which prevents us from selecting with the
    //    keyboard in reverse direction.
    this.ref.current.selectionStart = this.props.editorState.selection.start;
    this.ref.current.selectionEnd = this.props.editorState.selection.end;
    this.ref.current.focus();
  }

  render() {
    return (
      <textarea
        ref={this.ref}
        placeholder={this.props.placeholder}
        value={this.props.editorState.content}
        onChange={this.createStateAndPropogate}
        onSelect={this.createStateAndPropogate}
        onKeyDown={this.propogateKeyDown}
        className={`${styles.editor} ${this.props.className}`}
      />
    );
  }
}
