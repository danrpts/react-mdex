import React, { Component } from "react";
import { EditorState } from "react-mdex";
import { ListGroup, ListGroupItem } from "reactstrap";

const MAX_LIST_LENGTH = 5;

const clamp = (value, min, max) => {
  return value < min ? min : value > max ? max : value;
};

export default class EmojiSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      select: 0
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

    this.onKeydown = e => {
      if (this.state.list.length === 0) {
        return;
      }
      switch (e.key) {
        case "Enter":
        case "Tab":
          this.replaceWordAndPropogate(
            `:${this.state.list[this.state.select]}:`
          )(e);
          break;
        case "ArrowUp":
          e.preventDefault();
          this.setState(state => {
            return {
              select: clamp(state.select - 1, 0, this.state.list.length - 1)
            };
          });
          break;
        case "ArrowDown":
          e.preventDefault();
          this.setState(state => {
            return {
              select: clamp(state.select + 1, 0, this.state.list.length - 1)
            };
          });
          break;
        default:
          break;
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    let { word } = nextProps.editorState.getCurrentWord();
    let filtered = [];
    if (word.startsWith(":")) {
      word = word.slice(1);
      for (let name of this.emojiKeys) {
        if (filtered.length >= MAX_LIST_LENGTH) {
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
      list: filtered,
      select: 0
    });
  }

  // TODO:
  // fetch and loader?
  componentDidMount() {
    this.emojiObjs = require("./emojis.json");
    this.emojiKeys = Object.keys(this.emojiObjs);
    this.props.inputRef.current.addEventListener("keydown", this.onKeydown);
  }

  componentWillUnmount() {
    this.props.inputRef.current.removeEventListener("keydown", this.onKeydown);
  }

  render() {
    const top =
      this.props.editorState.caret.top + this.props.editorState.caret.height;
    const left = this.props.editorState.caret.left;
    return (
      <div
        className={`emoji-selector ${this.props.className || ""}`}
        style={{
          top,
          left
        }}
      >
        <ListGroup>
          {this.state.list.map((name, i) => {
            const emoji = this.emojiObjs[name];
            return (
              <ListGroupItem
                active={i === this.state.select}
                action
                key={name}
                className="emoji-selector-list-item px-3 py-1"
                onClick={this.replaceWordAndPropogate(`:${name}:`)}
              >
                {emoji.char} {name}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}
