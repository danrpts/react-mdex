import React from "react";
import Octicon from "./OcitconByName.js";
import { Button, ButtonGroup, UncontrolledTooltip } from "reactstrap";

export default function CommonMarkToolbar(props) {
  const handleClick = handler => e => {
    e.preventDefault();
    const newEditorState = handler(props.editorState);
    props.onClick(newEditorState);
  };
  return (
    <ButtonGroup className={props.className}>
      {props.toolbarState.map((tool, i) => {
        const id = tool.octiconName + i;
        return (
          <Button
            key={id}
            id={id}
            color="link"
            className="text-muted"
            onClick={handleClick(tool.handler)}
          >
            <Octicon
              name={tool.octiconName}
              size="small"
              verticalAlign="middle"
              ariaLabel={tool.title}
            />
            <UncontrolledTooltip
              placement="top"
              target={id}
              delay={{ hide: 0 }}
            >
              <small>
                {tool.title}
                {tool.hotkey ? ` <cmd-${tool.hotkey}>` : ""}
              </small>
            </UncontrolledTooltip>
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
