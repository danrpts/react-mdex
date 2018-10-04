import React, { Component } from "react";
import { Editor, EditorState, Preview } from "react-mdex";
import Octicon from "./OcitconByName.js";
import CommonMarkToolbar from "./CommonMarkToolbar.js";
import EmojiSelector from "./EmojiSelector.js";
import MarkdownIt from "markdown-it";
import emoji from "markdown-it-emoji";
import toolbarState from "./toolbarState.js";

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
      editorState: new EditorState()
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
                className="btn tab-btn"
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
                className="btn tab-btn"
                disabled={this.state.editorState.isContentEmpty()}
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
              <EmojiSelector
                editorState={this.state.editorState}
                onClick={this.updateEditorState}
              >
                <Editor
                  editorState={this.state.editorState}
                  onChange={this.updateEditorState}
                  handleKeyCommand={this.handleKeyCommand}
                  handleKeyColon={this.handleKeyColon}
                  className="form-control"
                />
              </EmojiSelector>
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
