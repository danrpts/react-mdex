import {
  default as OcticonsReact,
  getIconByName
} from "@githubprimer/octicons-react";
import React from "react";

const Octicon = ({ name, ...rest }) => (
  <OcticonsReact {...rest} icon={getIconByName(name)} />
);

export default Octicon;
