import React from "react";
import Octicon, { getIconByName } from "@githubprimer/octicons-react";

// SOURCE:
// https://github.com/primer/octicons/tree/master/lib/octicons_react
export default function OcticonByName({ name, ...props }) {
  return <Octicon {...props} icon={getIconByName(name)} />;
}
