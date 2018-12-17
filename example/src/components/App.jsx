import "bootstrap/dist/css/bootstrap.css";

import { Col, Container, Row } from "reactstrap";
import React from "react";

import CommonMarkEditor from "./CommonMarkEditor";

const App = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col sm="12" md="10" lg="8">
          <div className="text-center mb-5">
            <h1 className="display-4">react-mdex</h1>
            <p className="lead">
              An ultralight library for building Markdown editors in React.
            </p>
            <p>
              <a
                className="github-button"
                href="https://github.com/danrpts/react-mdex"
                data-icon="octicon-star"
                data-size="large"
                aria-label="Star danrpts/react-mdex on GitHub"
              >
                Star
              </a>
              <span className="ml-2">
                <a
                  className="github-button"
                  href="https://github.com/danrpts/react-mdex/fork"
                  data-icon="octicon-repo-forked"
                  data-size="large"
                  aria-label="Fork danrpts/react-mdex on GitHub"
                >
                  Fork
                </a>
              </span>
            </p>
          </div>
          <CommonMarkEditor />
          <p className="mt-3 text-center">
            <span className="d-block lead">Get Started</span>
            <small className="text-muted">
              Start drafting a CommonMark document in the demo Editor above.
              View the rendered document by clicking on the Preview tab.
              Highlight some text and use the toolbar to auto insert tags around
              your selection.
            </small>
          </p>
          <hr />
          <p className="text-center">
            <small className="text-muted">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/danrpts/react-mdex/blob/master/src/components/Editor.js"
              >
                Editor
              </a>
              ,{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/danrpts/react-mdex/blob/master/src/components/Preview.js"
              >
                Preview
              </a>
              ,{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/danrpts/react-mdex/blob/master/src/models/EditorState.js"
              >
                EditorState
              </a>
            </small>
          </p>
          <hr />
          <p className="text-center">
            <span className="d-block lead">Want Dropdowns?</span>
            <small className="text-muted">
              Type a colon to show an emoji dropdown{" "}
              <span role="img" aria-label="emoji_ok_hand">
                👌
              </span>
              . Keep typing to filter the emoji list, use the up/down arrows to
              move the highlight, and enter/tab to select. See{" "}
              <a href="https://superdan.io/react-cursor-dropdown/">
                react-cursor-dropdown
              </a>{" "}
              to enable this on any input.
            </small>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
