# react-mdex

> An ultralight React library for building Markdown editors.

[![NPM](https://img.shields.io/npm/v/react-mdex.svg)](https://www.npmjs.com/package/react-mdex) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-mdex
```

## Usage

```jsx
import React, { Component } from "react";
import MarkdownIt from "markdown-it";
import { Editor, EditorState, Preview } from "react-mdex";

class BasicEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.create()
    };

    this.onChange = editorState => {
      this.setState({
        editorState
      });
    };

    const md = MarkdownIt();
    this.renderFn = md.render.bind(md);
  }
  render() {
    return (
      <div>
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
        <Preview
          editorState={this.state.editorState}
          renderFn={this.renderFn}
        />
      </div>
    );
  }
}
```

## License

MIT © [danrpts](https://github.com/danrpts)
