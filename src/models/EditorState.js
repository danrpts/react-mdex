export default class EditorState {
  // TODO: use immutable.js
  constructor(content = '', selectionStart = 0, selectionEnd = selectionStart) {
    this.content = content
    this.selection = { start: selectionStart, end: selectionEnd }
  }

  isContentEmpty() {
    return this.content.length <= 0
  }

  getSelection() {
    const { start, end } = this.selection
    const word = this.content.substring(start, end)
    return { word, start, end }
  }

  isSelectionMultiline(editorState) {
    const { word } = this.getSelection()
    return word.trim().includes('\n')
  }

  static equals(e1, e2) {
    return (
      e1.content.localeCompare(e2.content) === 0 &&
      e1.selection.start === e2.selection.start &&
      e1.selection.end === e2.selection.end
    )
  }

  static insertAt(
    editorState,
    text = '',
    start = 0,
    end = 0,
    selectAfterInsert = false
  ) {
    const content =
      editorState.content.substring(0, start) +
      text +
      editorState.content.substring(end)
    if (selectAfterInsert) {
      end = start + text.length
    } else {
      start = end = content.length
    }
    return new EditorState(content, start, end)
  }

  static toggleBlockStyle(editorState, leftTag, rightTag) {
    return EditorState.toggleInlineStyle(
      editorState,
      `${leftTag}\n`,
      `\n${rightTag}`
    )
  }

  static toggleInlineStyle(editorState, leftTag, rightTag) {
    let { start, end } = editorState.selection
    let prefix = editorState.content.substring(0, start)
    let inner = editorState.content.substring(start, end)
    let suffix = editorState.content.substring(end)

    const isTaggedOutside =
      prefix.endsWith(leftTag) && suffix.startsWith(rightTag)

    const isTaggedInside = inner.startsWith(leftTag) && inner.endsWith(rightTag)

    if (isTaggedOutside) {
      prefix = prefix.substring(0, prefix.length - leftTag.length)
      suffix = suffix.substring(rightTag.length)
      start -= leftTag.length
      end -= leftTag.length
    } else if (isTaggedInside) {
      inner = inner.substring(leftTag.length, inner.length - rightTag.length)
      end -= leftTag.length
    } else {
      inner = leftTag + inner + rightTag
      start += leftTag.length
      end += leftTag.length
    }

    return new EditorState(prefix + inner + suffix, start, end)
  }

  static toggleMultilineStyle(editorState, leftTag, rightTag) {
    let { start, end } = editorState.selection
    let prefix = editorState.content.substring(0, start)
    let inner = editorState.content.substring(start, end)
    let suffix = editorState.content.substring(end)

    if (!editorState.isSelectionMultiline()) {
      // single line version also handles affixes inside the selection
      return EditorState.toggleInlineStyle(editorState, leftTag, rightTag)
    }

    let lines = inner.split('\n')

    const areTagged = lines.reduce((state, line) => {
      return state && line.startsWith(leftTag) && line.endsWith(rightTag)
    }, true)

    lines = lines.map(line => {
      if (areTagged) {
        end -= leftTag.length
        return line.substring(leftTag.length, line.length - rightTag.length)
      }

      end += leftTag.length
      return leftTag + line + rightTag
    })

    return new EditorState(prefix + lines.join('\n') + suffix, start, end)
  }

  static toggleNumberedStyle(editorState) {
    let { start, end } = editorState.selection
    let prefix = editorState.content.substring(0, start)
    let inner = editorState.content.substring(start, end)
    let suffix = editorState.content.substring(end)

    if (!editorState.isSelectionMultiline()) {
      // TODO:
      // check that selection is in a numebred list,
      // and call the single line version with correct prefix
      // on each lines (1., 2., 3., etc.)
      return EditorState.toggleInlineStyle(editorState, '1. ', '')
    }

    let lines = inner.split('\n')

    // check lines are prefixed incrementally
    let tagNumber = 1
    const areTagged = lines.reduce((state, line) => {
      let tagStr = tagNumber + '. '
      ++tagNumber
      return state && line.startsWith(tagStr)
    }, true)
    tagNumber = 1

    lines = lines.map(line => {
      let tagStr = tagNumber + '. '
      ++tagNumber
      if (areTagged) {
        end -= tagStr.length
        return line.substring(tagStr.length, line.length)
      }
      end += tagStr.length
      return tagStr + line
    })

    return new EditorState(prefix + lines.join('\n') + suffix, start, end)
  }
}
