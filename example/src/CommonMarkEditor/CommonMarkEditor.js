import React, { Component } from "react";
import { Editor, EditorState, Preview } from "react-mdex";
import Octicon from "./OcitconByName.js";
import CommonMarkToolbar from "./CommonMarkToolbar.js";
import MarkdownIt from "markdown-it";
import emoji from "markdown-it-emoji";
import {
  Card,
  CardHeader,
  CardBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

export default class CommonMarkEditor extends Component {
  constructor(props) {
    super(props);

    this.markdownIt = new MarkdownIt({
      breaks: true,
      typographer: true
    });
    this.markdownIt.use(emoji);
    this.renderFn = this.markdownIt.render.bind(this.markdownIt);

    this.hotkeyMap = new Map(
      toolbarState
        .filter(tool => tool.hotkey)
        .map(tool => [tool.hotkey, tool.handler])
    );

    this.state = {
      activeTab: "1",
      editorState: EditorState.create()
    };

    this.updateEditorState = editorState => {
      this.setState({
        editorState
      });
    };

    this.handleKeyCommand = (hotkey, e) => {
      if (this.hotkeyMap.has(hotkey)) {
        e.preventDefault();
        setTimeout(() => {
          const handler = this.hotkeyMap.get(hotkey);
          const newState = handler(this.state.editorState);
          this.updateEditorState(newState);
        }, 0);
      }
    };

    this.onTabClick = tab => {
      if (this.state.activeTab !== tab) {
        this.setState({ activeTab: tab });
      }
    };
  }

  render() {
    return (
      <Card>
        <CardHeader className="px-0 pt-2 pb-0 border-bottom-0 bg-light2">
          <Nav tabs>
            <NavItem className="ml-3">
              <NavLink
                className="btn radius-override"
                active={this.state.activeTab === "1"}
                onClick={() => {
                  this.onTabClick("1");
                }}
              >
                <small>Write</small>
              </NavLink>
            </NavItem>
            <NavItem className="mr-auto">
              <NavLink
                className="btn radius-override"
                disabled={EditorState.isContentEmpty(this.state.editorState)}
                active={this.state.activeTab === "2"}
                onClick={() => {
                  this.onTabClick("2");
                }}
              >
                <small>Preview</small>
              </NavLink>
            </NavItem>
            <NavItem className="order-first order-md-last mx-3">
              <CommonMarkToolbar
                className="flex-wrap"
                toolbarState={toolbarState}
                editorState={this.state.editorState}
                onClick={this.updateEditorState}
              />
            </NavItem>
            <div className="w-100 order-first order-md-last" />
          </Nav>
        </CardHeader>
        <CardBody className="p-2">
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Editor
                editorState={this.state.editorState}
                onChange={this.updateEditorState}
                handleKeyCommand={this.handleKeyCommand}
                className="form-control"
              />
            </TabPane>
            <TabPane tabId="2">
              <Preview
                editorState={this.state.editorState}
                renderFn={this.renderFn}
                className="border-bottom"
              />
            </TabPane>
          </TabContent>
        </CardBody>
        <CardBody className="px-2 pt-0 pb-2">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://commonmark.org/help/"
            className="text-muted"
          >
            <Octicon
              name="markdown"
              size="small"
              verticalAlign="middle"
              ariaLabel="CommonMark help"
              className="mr-1"
            />
            <small>CommonMark Enabled</small>
          </a>
        </CardBody>
      </Card>
    );
  }
}

const toolbarState = [
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
      if (EditorState.isSelectionMultiline(editorState)) {
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
