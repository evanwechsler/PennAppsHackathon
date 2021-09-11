import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";

export default function NewUserForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <TextField
        label="Full Name"
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        style={{ margin: "0.5rem" }}
      />
      <TextField
        label="Username"
        onChange={(e) => setUsername(e.target.value)}
        variant="outlined"
        style={{ margin: "0.5rem" }}
      />
      <TextField
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        style={{ margin: "0.5rem" }}
      />
      <TextField
        label="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        variant="outlined"
        style={{ margin: "0.5rem" }}
      />
      <Button variant="contained" color="primary">
        Create User
      </Button>
    </form>
  );
}
