import React, { Component } from "react";
import { EditorState } from "react-mdex";
import { UncontrolledDropdown, DropdownToggle } from "reactstrap";

export default class EmojiSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "",
      list: []
    };

    this.replaceWordAndPropogate = colonName => e => {
      e.preventDefault();
      const { start, end } = this.props.editorState.getCurrentWord();
      const newEditorState = EditorState.insertAt(
        this.props.editorState,
        colonName,
        start,
        end
      );
      this.props.onClick(newEditorState);
    };
  }

  componentWillReceiveProps(nextProps) {
    let { word } = nextProps.editorState.getCurrentWord();
    let filtered = [];
    const max = 5;
    if (word.startsWith(":")) {
      word = word.slice(1);
      for (let name of this.emojiKeys) {
        if (filtered.length >= max) {
          break;
        }
        if (
          name.startsWith(word) ||
          this.emojiObjs[name].keywords.some(keyword =>
            keyword.startsWith(word)
          )
        ) {
          filtered.push(name);
          continue;
        }
      }
    }
    this.setState({
      word,
      list: filtered
    });
  }

  // TODO:
  // fetch and loader?
  componentDidMount() {
    this.emojiObjs = require("./emojis.json");
    this.emojiKeys = Object.keys(this.emojiObjs);
  }

  render() {
    return (
      <div className="emoji-selector-container">
        {this.props.children}
        <div
          className={`emoji-selector-dropdown ${this.props.className}`}
          style={{
            top:
              this.props.editorState.carot.top +
              this.props.editorState.carot.height,
            left: this.props.editorState.carot.left
          }}
        >
          <UncontrolledDropdown
            direction="down"
            isOpen={this.state.list.length > 0}
          >
            <DropdownToggle className="d-none" />
            <div className="list-group">
              {this.state.list.map(name => {
                const emoji = this.emojiObjs[name];
                const colonName = `:${name}:`;
                return (
                  <button
                    type="button"
                    className="emoji-selector-list-item list-group-item list-group-item-action px-3 py-1"
                    key={name}
                    onClick={this.replaceWordAndPropogate(colonName)}
                  >
                    <span>
                      {emoji.char} {colonName}
                    </span>
                  </button>
                );
              })}
            </div>
          </UncontrolledDropdown>
        </div>
      </div>
    );
  }
}
