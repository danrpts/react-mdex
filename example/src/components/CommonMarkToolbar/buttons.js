import { EditorState } from "react-mdex";

const buttons = [
  {
    title: "Add header text",
    octicon: "text-size",
    handler: editorState => {
      return EditorState.toggleInlineStyle(editorState, "### ", "");
    }
  },
  {
    hotkey: "b",
    title: "Add bold text",
    octicon: "bold",
    handler: editorState => {
      return EditorState.toggleInlineStyle(editorState, "**", "**");
    }
  },
  {
    hotkey: "i",
    title: "Add italic text",
    octicon: "italic",
    handler: editorState => {
      return EditorState.toggleInlineStyle(editorState, "_", "_");
    }
  },
  {
    title: "Insert quote",
    octicon: "quote",
    handler: editorState => {
      return EditorState.toggleMultilineStyle(editorState, "> ", "");
    }
  },
  {
    title: "Insert code",
    octicon: "code",
    handler: editorState => {
      if (editorState.isSelectionMultiline()) {
        return EditorState.toggleBlockStyle(editorState, "```", "```");
      }
      return EditorState.toggleInlineStyle(editorState, "`", "`");
    }
  },
  {
    hotkey: "k",
    title: "Add a link",
    octicon: "link",
    handler: editorState => {
      const newEditorState = EditorState.toggleInlineStyle(
        editorState,
        "[",
        "](url)"
      );
      newEditorState.selection.start = newEditorState.selection.end + 2;
      newEditorState.selection.end += 5;
      return newEditorState;
    }
  },
  {
    title: "Add an image",
    octicon: "file-media",
    handler: editorState => {
      const newEditorState = EditorState.toggleInlineStyle(
        editorState,
        "![",
        "](url)"
      );
      newEditorState.selection.start = newEditorState.selection.end + 2;
      newEditorState.selection.end += 5;
      return newEditorState;
    }
  },
  {
    title: "Add a bulleted list",
    octicon: "list-unordered",
    handler: editorState => {
      return EditorState.toggleMultilineStyle(editorState, "- ", "");
    }
  },
  {
    title: "Add a numbered list",
    octicon: "list-ordered",
    handler: editorState => {
      return EditorState.toggleNumberedStyle(editorState);
    }
  }
];

export default buttons;
