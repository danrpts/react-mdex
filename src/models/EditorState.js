function create(content = "", start = 0, end = 0) {
  // TODO:
  // use immutable.js
  return Object.assign(
    {},
    {
      content,
      selection: {
        start,
        end
      }
    }
  );
}

function isContentEmpty(editorState) {
  return editorState.content.length <= 0;
}

function isSelectionMultiline(editorState) {
  const { start, end } = editorState.selection;
  return editorState.content
    .substring(start, end)
    .trim()
    .includes("\n");
}

function toggleBlockStyle(editorState, leftTag, rightTag) {
  return toggleInlineStyle(editorState, `${leftTag}\n`, `\n${rightTag}`);
}

function toggleInlineStyle(editorState, leftTag, rightTag) {
  let { start, end } = editorState.selection;
  let prefix = editorState.content.substring(0, start);
  let inner = editorState.content.substring(start, end);
  let suffix = editorState.content.substring(end);

  const isTaggedOutside =
    prefix.endsWith(leftTag) && suffix.startsWith(rightTag);

  const isTaggedInside = inner.startsWith(leftTag) && inner.endsWith(rightTag);

  if (isTaggedOutside) {
    prefix = prefix.substring(0, prefix.length - leftTag.length);
    suffix = suffix.substring(rightTag.length);
    start -= leftTag.length;
    end -= leftTag.length;
  } else if (isTaggedInside) {
    inner = inner.substring(leftTag.length, inner.length - rightTag.length);
    end -= leftTag.length;
  } else {
    inner = leftTag + inner + rightTag;
    start += leftTag.length;
    end += leftTag.length;
  }

  return create(prefix + inner + suffix, start, end);
}

function toggleMultilineStyle(editorState, leftTag, rightTag) {
  let { start, end } = editorState.selection;
  let prefix = editorState.content.substring(0, start);
  let inner = editorState.content.substring(start, end);
  let suffix = editorState.content.substring(end);

  if (!isSelectionMultiline(editorState)) {
    // single line version also handles affixes inside the selection
    return toggleInlineStyle(editorState, leftTag, rightTag);
  }

  let lines = inner.split("\n");

  const areTagged = lines.reduce((state, line) => {
    return state && line.startsWith(leftTag) && line.endsWith(rightTag);
  }, true);

  lines = lines.map(line => {
    if (areTagged) {
      end -= leftTag.length;
      return line.substring(leftTag.length, line.length - rightTag.length);
    }

    end += leftTag.length;
    return leftTag + line + rightTag;
  });

  return create(prefix + lines.join("\n") + suffix, start, end);
}

function toggleNumberedStyle(editorState) {
  let { start, end } = editorState.selection;
  let prefix = editorState.content.substring(0, start);
  let inner = editorState.content.substring(start, end);
  let suffix = editorState.content.substring(end);

  if (!isSelectionMultiline(editorState)) {
    // TODO:
    // check that selection is in a numebred list,
    // and call the single line version with correct prefix
    // on each lines (1., 2., 3., etc.)
    return toggleInlineStyle(editorState, "1. ", "");
  }

  let lines = inner.split("\n");

  // check lines are prefixed incrementally
  let tagNumber = 1;
  const areTagged = lines.reduce((state, line) => {
    let tagStr = tagNumber + ". ";
    ++tagNumber;
    return state && line.startsWith(tagStr);
  }, true);
  tagNumber = 1;

  lines = lines.map(line => {
    let tagStr = tagNumber + ". ";
    ++tagNumber;
    if (areTagged) {
      end -= tagStr.length;
      return line.substring(tagStr.length, line.length);
    }
    end += tagStr.length;
    return tagStr + line;
  });

  return create(prefix + lines.join("\n") + suffix, start, end);
}

const EditorStateUtils = {
  create,
  isContentEmpty,
  isSelectionMultiline,
  toggleMultilineStyle,
  toggleNumberedStyle,
  toggleBlockStyle,
  toggleInlineStyle
};

export default EditorStateUtils;
