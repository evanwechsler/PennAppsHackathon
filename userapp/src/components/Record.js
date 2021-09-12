import React from "react";
import _ from "lodash";
import { Card, CardContent, Paper } from "@material-ui/core";

export default function Record({ record }) {
  return (
    <Paper style={{ padding: "1rem", width:"100%"}}>
      {Object.entries(record).map(([key, value]) => (
        <div>
          <strong>{_.startCase(key)}</strong>: {value}
        </div>
      ))}
    </Paper>
  );
}