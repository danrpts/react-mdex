import PropTypes from 'prop-types'
import React, { Component } from 'react'

import EditorState from '../models/EditorState.js'

class Editor extends Component {
  constructor(props) {
    super(props)
    this.ref = props.forwardRef || React.createRef()
    this.handleEditorStateChange = this.handleEditorStateChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleEditorStateChange = e => {
    const newEditorState = new EditorState(
      e.target.value,
      e.target.selectionStart,
      e.target.selectionEnd
    )
    this.props.onEditorStateChange(newEditorState)
  }

  handleKeyDown = e => {
    if ((e.ctrlKey || e.metaKey) && this.props.onCommandKeyDown) {
      this.props.onCommandKeyDown(e)
    }
  }

  componentDidMount() {
    this.ref.current.selectionStart = this.props.editorState.selection.start
    this.ref.current.selectionEnd = this.props.editorState.selection.end
    !!this.props.autofocus && this.ref.current.focus()
  }

  componentDidUpdate() {
    // NOTE:
    // 1) Allows us to set DOM selection state from the editorState prop.
    // 2) Avoid setSelectionRange as this sets the selection direction to
    //    "forward" by default, which prevents us from selecting with the
    //    keyboard in reverse direction.
    this.ref.current.selectionStart = this.props.editorState.selection.start
    this.ref.current.selectionEnd = this.props.editorState.selection.end
    this.ref.current.focus()
  }

  // We need to prevent renders when the editor state is not changing as
  // the textarea will focus every update, and that is not desired behavior.
  shouldComponentUpdate(nextProps) {
    return !EditorState.equals(this.props.editorState, nextProps.editorState)
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
    )
  }
}

Editor.propTypes = {
  autofocus: PropTypes.bool,
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onCommandKeyDown: PropTypes.func,
  onEditorStateChange: PropTypes.func.isRequired,
  forwardRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
}

export default React.forwardRef((props, ref) => {
  return <Editor {...props} forwardRef={ref} />
})
