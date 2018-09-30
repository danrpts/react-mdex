import React, { Component } from "react";
import EditorState from "../models/EditorState.js";

import styles from "./styles.css";

export default class Editor extends Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();

    this.createStateAndPropogate = e => {
      // NOTE:
      // Create a new editorState object from the current DOM state.
      // Then, pass it back to the parent component.
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
    // Allows us to update the DOM selection from the parent state, and keep
    // the textarea ref encapuslated in the editor child.
    this.ref.current.setSelectionRange(
      this.props.editorState.selection.start,
      this.props.editorState.selection.end
    );
    // NOTE:
    // focus will only be called when typing and selecting in the textarea, or
    // clicking a button in the toolbar (via selection state change).
    // shouldComponentUpdate will cancel a render caused by a state change in
    // the parent that is unrelated to the editorState.
    this.ref.current.focus();
  }

  shouldComponentUpdate(nextProps) {
    // NOTE:
    // Prevents a double render when:
    // 1) typing in the textarea triggering change and select events
    // 2) clicking in the toolbar triggering a state change and selection event
    // 3) parent state changed that doesn't include editorState
    if (
      nextProps.editorState.selection.start ===
        this.props.editorState.selection.start &&
      nextProps.editorState.selection.end ===
        this.props.editorState.selection.end
    ) {
      return false;
    }
    return true;
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
