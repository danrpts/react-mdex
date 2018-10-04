import { EditorState } from "react-mdex";

export default [
  {
    title: "Add header text",
    octiconName: "text-size",
    handler: editorState => {
      return EditorState.toggleInlineStyle(editorState, "### ", "");
    }
  },
  {
    hotkey: "b",
    title: "Add bold text",
    octiconName: "bold",
    handler: editorState => {
      return EditorState.toggleInlineStyle(editorState, "**", "**");
    }
  },
  {
    hotkey: "i",
    title: "Add italic text",
    octiconName: "italic",
    handler: editorState => {
      return EditorState.toggleInlineStyle(editorState, "_", "_");
    }
  },
  {
    title: "Insert quote",
    octiconName: "quote",
    handler: editorState => {
      return EditorState.toggleMultilineStyle(editorState, "> ", "");
    }
  },
  {
    title: "Insert code",
    octiconName: "code",
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
    octiconName: "link",
    handler: editorState => {
      return EditorState.toggleInlineStyle(editorState, "[", "](url)");
    }
  },
  {
    title: "Add an image",
    octiconName: "file-media",
    handler: editorState => {
      return EditorState.toggleInlineStyle(editorState, "![", "](url)");
    }
  },
  {
    title: "Add a bulleted list",
    octiconName: "list-unordered",
    handler: editorState => {
      return EditorState.toggleMultilineStyle(editorState, "- ", "");
    }
  },
  {
    title: "Add a numbered list",
    octiconName: "list-ordered",
    handler: editorState => {
      return EditorState.toggleNumberedStyle(editorState);
    }
  }
];
