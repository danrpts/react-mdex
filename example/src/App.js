import React, { Component } from "react";
import CommonMarkEditor from "./CommonMarkEditor/CommonMarkEditor.js";
import { Container, Row, Col } from "reactstrap";

import "bootstrap/dist/css/bootstrap.css";

export default class App extends Component {
  render() {
    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col sm="12" md="10" lg="8">
            <div className="text-center mb-5">
              <h1 className="display-4">MDEx</h1>
              <p className="lead">
                An ultralight React library for building Markdown editors.
              </p>
              <p>
                <a href="https://github.com/danrpts/react-mdex">react-mdex</a>
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
            <CommonMarkEditor>
              <h1>Hello World</h1>
            </CommonMarkEditor>
          </Col>
        </Row>
      </Container>
    );
  }
}
