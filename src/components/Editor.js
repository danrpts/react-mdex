import React, { Component } from "react";
import PropTypes from "prop-types";
import EditorState from "../models/EditorState.js";

class Editor extends Component {
  static propTypes = {
    editorState: PropTypes.instanceOf(EditorState).isRequired,
    onEditorStateChange: PropTypes.func.isRequired,
    onCommandKeyDown: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.ref = props.forwardRef || React.createRef();
    this.handleEditorStateChange = this.handleEditorStateChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleEditorStateChange = e => {
    const newEditorState = new EditorState(
      e.target.value,
      e.target.selectionStart,
      e.target.selectionEnd
    );
    this.props.onEditorStateChange(newEditorState);
  };

  handleKeyDown = e => {
    if ((e.ctrlKey || e.metaKey) && this.props.onCommandKeyDown) {
      this.props.onCommandKeyDown(e);
    }
  };

  componentDidMount() {
    this.ref.current.selectionStart = this.props.editorState.selection.start;
    this.ref.current.selectionEnd = this.props.editorState.selection.end;
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
        onChange={this.handleEditorStateChange}
        onSelect={this.handleEditorStateChange}
        onKeyDown={this.handleKeyDown}
        style={this.props.style}
        className={this.props.className}
      />
    );
  }
}

export default React.forwardRef((props, ref) => {
  return <Editor {...props} forwardRef={ref} />;
});
