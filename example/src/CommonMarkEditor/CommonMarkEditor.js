import React, { Component } from "react";
import { Editor, EditorState, Preview } from "react-mdex";
import { WithCursorDropdown, CursorDropdown } from "react-cursor-dropdown";
import Octicon from "./OcitconByName.js";
import CommonMarkToolbar from "./CommonMarkToolbar.js";
import toolbarState from "./toolbarState.js";
import EmojiList from "./EmojiList.js";
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

const EditorWithCursorDropdown = WithCursorDropdown(Editor);

const hotkeyMap = new Map(
  toolbarState
    .filter(tool => tool.hotkey)
    .map(tool => [tool.hotkey, tool.handler])
);

export default class CommonMarkEditor extends Component {
  constructor(props) {
    super(props);

    this.handleEditorStateChange = this.handleEditorStateChange.bind(this);
    this.handleCommandKeyDown = this.handleCommandKeyDown.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleEditorTabClick = this.handleEditorTabClick.bind(this);
    this.handlePreviewTabClick = this.handlePreviewTabClick.bind(this);

    this.markdownIt = new MarkdownIt({
      breaks: true,
      typographer: true
    });
    this.markdownIt.use(emoji);
    this.markdownRenderFn = this.markdownIt.render.bind(this.markdownIt);

    this.state = {
      activeTab: "editor",
      editorState: new EditorState()
    };
  }

  handleEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  handleCommandKeyDown = e => {
    const { key: hotkey } = e;
    if (hotkeyMap.has(hotkey)) {
      e.preventDefault();
      setTimeout(() => {
        const hotKeyHandler = hotkeyMap.get(hotkey);
        const editorState = hotKeyHandler(this.state.editorState);
        this.setState({
          editorState
        });
      }, 0);
    }
  };

  handleCursorDropdownChange = ({ value, cursor }) => {
    const { start, end } = cursor;
    const content =
      this.state.editorState.content.substring(0, start) +
      value +
      this.state.editorState.content.substring(end);
    const editorState = new EditorState(content, content.length);
    this.setState({
      editorState
    });
  };

  handleTabClick = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  handleEditorTabClick = e => {
    this.handleTabClick("editor");
  };

  handlePreviewTabClick = e => {
    this.handleTabClick("preview");
  };

  render() {
    return (
      <Card>
        <CardHeader className="px-0 pt-2 pb-0 border-bottom-0 bg-light2">
          <Nav tabs>
            <NavItem className="ml-3">
              <NavLink
                className="btn tab-btn"
                active={this.state.activeTab === "editor"}
                onClick={this.handleEditorTabClick}
              >
                <small>Write</small>
              </NavLink>
            </NavItem>
            <NavItem className="mr-auto">
              <NavLink
                className="btn tab-btn"
                disabled={this.state.editorState.isContentEmpty()}
                active={this.state.activeTab === "preview"}
                onClick={this.handlePreviewTabClick}
              >
                <small>Preview</small>
              </NavLink>
            </NavItem>
            <NavItem className="order-first order-md-last mx-3">
              <CommonMarkToolbar
                className="flex-wrap"
                toolbarState={toolbarState}
                editorState={this.state.editorState}
                onClick={this.handleEditorStateChange}
              />
            </NavItem>
            <div className="w-100 order-first order-md-last" />
          </Nav>
        </CardHeader>
        <CardBody className="p-2">
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="editor">
              <EditorWithCursorDropdown
                editorState={this.state.editorState}
                onEditorStateChange={this.handleEditorStateChange}
                onCommandKeyDown={this.handleCommandKeyDown}
                onCursorDropdownChange={this.handleCursorDropdownChange}
                className="form-control"
              >
                <CursorDropdown
                  pattern={/^:([\w+-]*)$/}
                  component={EmojiList}
                />
              </EditorWithCursorDropdown>
            </TabPane>
            <TabPane tabId="preview">
              <Preview
                editorState={this.state.editorState}
                markdownRenderFn={this.markdownRenderFn}
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
