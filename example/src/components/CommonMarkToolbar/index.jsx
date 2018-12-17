import { Button, ButtonGroup, UncontrolledTooltip } from "reactstrap";
import { EditorState } from "react-mdex";
import PropTypes from "prop-types";
import React from "react";

import Octicon from "../Octicon";

const CommonMarkToolbar = props => {
  const handleClick = handler => e => {
    e.preventDefault();
    const newEditorState = handler(props.editorState);
    props.onClick(newEditorState);
  };

  return (
    <ButtonGroup className={props.className}>
      {props.buttons.map(button => {
        return (
          <Button
            key={button.octicon}
            id={button.octicon}
            color="link"
            className="text-muted"
            onClick={handleClick(button.handler)}
          >
            <Octicon
              name={button.octicon}
              size="small"
              verticalAlign="middle"
              ariaLabel={button.title}
            />
            <UncontrolledTooltip
              placement="top"
              target={button.octicon}
              delay={{ hide: 0 }}
            >
              <small>
                {button.title}
                {button.hotkey ? ` <cmd-${button.hotkey}>` : ""}
              </small>
            </UncontrolledTooltip>
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

CommonMarkToolbar.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onClick: PropTypes.func.isRequired
};

export default CommonMarkToolbar;
